/**
 * External dependencies
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { isEmpty, noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import './style.pcss';

class SearchOrCreate extends Component {
	static defaultProps = {
		placeholder: __( 'Add or Find', 'events-gutenberg' ),
		icon: null,
		store: null,
		storeName: '',
		selected: false,
		onSelection: noop,
		onSetCreation: noop,
		results: 5,
		id: '',
		search: '',
		posts: [],
		loading: false,
	};

	static propTypes = {
		storeName: PropTypes.string,
		id: PropTypes.string,
		placeholder: PropTypes.string,
		results: PropTypes.number,
		search: PropTypes.string,
		posts: PropTypes.array,
		loading: PropTypes.bool,
		onSetCreation: PropTypes.func,
	};

	constructor() {
		super( ...arguments );
		this.inputRef = React.createRef();
	}

	render() {
		const { selected } = this.props;
		const containerClass = classNames( 'tribe-editor__soc__input__container', {
			'tribe-editor__soc__input__container--active': selected,
		} );

		this.maybeFocus();

		return (
			<section className="tribe-soc__container">
				<div className={ containerClass } onClick={ this.maybeFocus }>
					{ this.props.icon }
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
		const { placeholder, search } = this.props;

		return (
			<input
				className="tribe-editor__soc__input"
				ref={ this.inputRef }
				value={ search }
				placeholder={ placeholder }
				onChange={ this.onChange }
			/>
		);
	}

	onChange = ( event ) => {
		const { target } = event;
		const { setTerm } = this.props;
		setTerm( target.value );
	};

	renderResults() {
		const { selected, search, loading } = this.props;

		if ( ! selected ) {
			return null;
		}

		if ( isEmpty( search ) ) {
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
				{ this.renderItems() }
			</nav>
		);
	}

	renderItems() {
		const { posts, search } = this.props;

		if ( posts.length === 0 ) {
			return (
				<li onClick={ this.setCreation }><strong>Create</strong>: { search } </li>
			);
		}

		return ( posts.map( this.renderItem ) );
	}

	setCreation = () => {
		const { search } = this.props;
		this.props.onSetCreation( search );
	};

	renderItem = ( item ) => {
		const { title, id } = item;
		return (
			<li
				key={ id }
				onClick={ this.setSelection( item ) }
				dangerouslySetInnerHTML={
					{
						__html: title.rendered,
					}
				}
			/>
		);
	};

	setSelection = ( item ) => {
		return () => {
			const { id, clearSearch, onSelection } = this.props;
			onSelection( item );
			clearSearch( id );
		};
	};
}

export default compose( [
	withSelect( ( select, props ) => {
		const {
			getSearch,
			getSearchLoading,
			getResults,
		} = select( props.storeName );
		const { id } = props;
		return {
			loading: getSearchLoading( id ),
			posts: getResults( id ),
			search: getSearch( id ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			setTerm,
			clearSearch,
			search,
		} = dispatch( props.storeName );
		return {
			clearSearch,
			setTerm( term ) {
				const { id, results = 5 } = props;
				setTerm( id, term );
				if ( term === '' ) {
					clearSearch( id );
				}

				search( id, {
					search: term,
					params: {
						orderby: 'relevance',
						per_page: results,
					},
				} );
			},
		};
	} ),
] )( SearchOrCreate );
