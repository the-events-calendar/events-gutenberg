/**
 * External dependencies
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { isEmpty, noop } from 'lodash';
import { decode } from 'he';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'data/search';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import './style.pcss';
import { EVENT } from 'editor/post-types';

class SearchOrCreate extends Component {
	static defaultProps = {
		placeholder: __( 'Add or Find', 'events-gutenberg' ),
		icon: null,
		store: {},
		storeName: '',
		selected: false,
		results: 5,
		posts: [],
		exclude: [],
		loading: false,
		term: '',
		onSelection: noop,
		onSetCreation: noop,
		registerBlock: noop,
		search: noop,
		clearBlock: noop,
	};

	static propTypes = {
		selected: PropTypes.bool,
		store: PropTypes.object,
		name: PropTypes.string,
		placeholder: PropTypes.string,
		term: PropTypes.string,
		results: PropTypes.number,
		posts: PropTypes.array,
		exclude: PropTypes.array,
		loading: PropTypes.bool,
		onSetCreation: PropTypes.func,
		registerBlock: PropTypes.func,
		search: PropTypes.func,
		clearBlock: PropTypes.func,
		onSelection: PropTypes.func,
	};

	constructor() {
		super( ...arguments );
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		const { registerBlock, name } = this.props;
		registerBlock( name );
	}

	render() {
		const { selected, icon } = this.props;
		const containerClass = classNames( 'tribe-editor__soc__input__container', {
			'tribe-editor__soc__input__container--active': selected,
		} );

		this.maybeFocus();

		return (
			<section className="tribe-soc__container">
				<div className={ containerClass } onClick={ this.maybeFocus }>
					{ icon }
					{ this.renderInput() }
				</div>
				{ this.renderResults() }
			</section>
		);
	}

	maybeFocus = () => {
		const { selected } = this.props;

		if ( selected && this.inputRef.current ) {
			this.inputRef.current.focus();
		}
	};

	renderInput() {
		const { placeholder, term } = this.props;

		return (
			<input
				className="tribe-editor__soc__input"
				ref={ this.inputRef }
				value={ term }
				placeholder={ placeholder }
				onChange={ this.onChange }
			/>
		);
	}

	onChange = ( event ) => {
		const { target = {} } = event;
		const { name, search, postType, exclude, results } = this.props;
		search( name, target.value, postType, exclude, results );
	};

	renderResults() {
		const { selected, term, loading } = this.props;

		if ( ! selected ) {
			return null;
		}

		if ( isEmpty( term ) ) {
			return null;
		}

		if ( loading ) {
			return (
				<div className="tribe-editor__soc__results--loading">
					<Spinner/>
				</div>
			);
		}

		return (
			<nav className="tribe-editor__soc__results">
				{ this.renderCreateItem() }
				{ this.renderItems() }
			</nav>
		);
	}

	setCreation = () => {
		const { term } = this.props;
		this.props.onSetCreation( term );
	};

	renderCreateItem() {
		const { term } = this.props;
		return <li onClick={ this.setCreation }><strong>Create</strong>: { term } </li>;
	}

	renderItems() {
		const { posts } = this.props;
		return posts.map( this.renderItem );
	}

	renderItem = ( item ) => {
		const { title = {}, id } = item;
		const { rendered = '' } = title;
		return (
			<li
				key={ id }
				onClick={ this.setSelection( item ) }
			>
				{ decode( rendered ) }
			</li>
		);
	};

	setSelection = ( item ) => {
		return () => {
			const { name, clearBlock, onSelection } = this.props;
			onSelection( item );
			clearBlock( name );
		};
	};
}

const mapStateToProps = ( state, props ) => ( {
	term: selectors.getSearchTerm( state, props ),
	loading: selectors.getLoading( state, props ),
	posts: selectors.getResults( state, props ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( SearchOrCreate );
