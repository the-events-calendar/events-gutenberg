/**
 * External dependencies
 */
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { isEmpty, noop } from 'lodash';
import { decode } from 'he';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.pcss';

class SearchOrCreate extends Component {
	static defaultProps = {
		store: {},
		isSelected: false,
		term: '',
		placeholder: __( 'Add or Find', 'events-gutenberg' ),
		name: '',
		resultsPerPage: 5,
		icon: null,
		posts: [],
		exclude: [],
		loading: false,
		onItemSelect: noop,
		onCreateNew: noop,
		registerBlock: noop,
		search: noop,
		clearBlock: noop,
		setFocus: noop,
	};

	static propTypes = {
		store: PropTypes.object,
		isSelected: PropTypes.bool,
		term: PropTypes.string,
		placeholder: PropTypes.string,
		name: PropTypes.string,
		resultsPerPage: PropTypes.number,
		icon: PropTypes.object,
		posts: PropTypes.array,
		exclude: PropTypes.array,
		loading: PropTypes.bool,
		onItemSelect: PropTypes.func,
		onCreateNew: PropTypes.func,
		registerBlock: PropTypes.func,
		search: PropTypes.func,
		clearBlock: PropTypes.func,
		setFocus: PropTypes.func,
	};

	constructor( props ) {
		super( props );
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		const { addBlock, setPostType, name, postType, setFocus } = this.props;
		addBlock( name );
		setPostType( name, postType );
		setFocus( this.inputRef );
	}

	componentDidUpdate() {
		this.props.setFocus( this.inputRef );
	}

	componentWillUnmount() {
		const { clearBlock, name } = this.props;
		clearBlock( name );
	}

	onInputChange = ( event ) => {
		const { value } = event.target;
		const { name, setTerm, search, exclude, resultsPerPage } = this.props;
		setTerm( name, value );
		search( name, {
			term: value,
			exclude,
			perPage: resultsPerPage,
		} );
	};

	createNew = () => {
		const { term, onCreateNew } = this.props;
		onCreateNew( term );
	};

	onItemClick = ( item ) => () => {
		const { name, clearBlock, onItemSelect } = this.props;
		const { id } = item;
		onItemSelect( id, item );
		clearBlock( name );
	};

	renderItem = ( item ) => {
		const { title = {}, id } = item;
		const { rendered = '' } = title;

		return (
			<li
				key={ id }
				onClick={ this.onItemClick( item ) }
			>
				{ decode( rendered ) }
			</li>
		);
	};

	renderResults() {
		const { isSelected, term, loading, posts } = this.props;

		if ( ! isSelected || isEmpty( term ) ) {
			return null;
		}

		if ( loading ) {
			return (
				<div className="tribe-editor__soc__results--loading">
					<Spinner />
				</div>
			);
		}

		return (
			<ul className="tribe-editor__soc__results">
				<li onClick={ this.createNew }><strong>Create</strong>: { this.props.term }</li>
				{ posts.map( this.renderItem ) }
			</ul>
		);
	}

	render() {
		const { isSelected, icon, term, placeholder } = this.props;
		const containerClass = classNames( 'tribe-editor__soc__input__container', {
			'tribe-editor__soc__input__container--active': isSelected,
		} );

		return (
			<section className="tribe-soc__container">
				<div className={ containerClass }>
					{ icon }
					<input
						className="tribe-editor__soc__input"
						ref={ this.inputRef }
						value={ term }
						placeholder={ placeholder }
						onChange={ this.onInputChange }
					/>
				</div>
				{ this.renderResults() }
			</section>
		);
	}
}

export default SearchOrCreate;
