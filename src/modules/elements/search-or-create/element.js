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
import { Component } from '@wordpress/element';
import { select } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import './style.pcss';

export default class SearchOrCreate extends Component {
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
	}

	static propTypes = {
		store: PropTypes.object.isRequired,
		storeName: PropTypes.string,
		id: PropTypes.string,
		placeholder: PropTypes.string,
		results: PropTypes.number,
	}

	constructor( props ) {
		super( ...arguments );
		this.state = {
			search: '',
			results: [],
			loading: false,
		};
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		const { store } = this.props;
		this.unsubscribe = store.subscribe( this.saveState );
	}

	saveState = () => {
		const { storeName, id } = this.props;
		this.setState( select( storeName ).getPosts( id ) );
	}

	componentWillUnmount() {
		this.unsubscribe();
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
	}

	renderInput() {
		const { search } = this.state;
		const { placeholder } = this.props;

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
		this.setState( {
			search: target.value,
		}, this.search );
	}

	search = () => {
		const { store, results, id, storeName } = this.props;
		const { search } = this.state;

		if ( search === '' ) {
			store.dispatch( {
				type: 'CLEAR',
				results: [],
				id,
			} );
		}

		const current = select( storeName ).getSearch( id );
		if ( search.trim() === current.trim() ) {
			return;
		}

		store.dispatch( {
			type: 'SEARCH',
			id,
			payload: {
				search,
				params: {
					orderby: 'relevance',
					per_page: results,
				},
			},
		} );
	}

	renderResults() {
		const { search, loading } = this.state;
		const { selected } = this.props;

		if ( ! selected ) {
			return null;
		}

		if ( isEmpty( search ) ) {
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
			<nav className="tribe-editor__soc__results">
				{ this.renderItems() }
			</nav>
		);
	}

	renderItems() {
		const { results, search } = this.state;

		if ( results.length === 0 ) {
			return (
				<li onClick={ this.setCreation }><strong>Create</strong>: { search } </li>
			);
		}

		return ( results.map( this.renderItem ) );
	}

	setCreation = () => {
		const { search } = this.state;
		this.props.onSetCreation( search );
	}

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
	}

	setSelection = ( item ) => {
		return () => {
			this.setState( { idle: true }, () => this.props.onSelection( item ) );
		};
	};
}
