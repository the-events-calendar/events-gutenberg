/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import { isEmpty, noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import './style.pcss';

export default class SearchOrCreate extends Component {

	static defaultProps = {
		placeholder: __( 'Add or Find', 'events-gutenberg' ),
		icon: null,
		store: null,
		selected: false,
		onSelection: noop,
	}

	constructor( props ) {
		super( ...arguments );
		this.state = {
			search: '',
			posts: [],
			fetching: false,
			idle: false,
		};
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		const { store } = this.props;
		this.unsubscribe = store.subscribe( this.saveState );
	}

	saveState = () => {
		const { store } = this.props;
		const { posts, fetching } = store.getState();
		this.setState( { posts, fetching } );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const { selected } = this.props;
		const { idle } = this.state;
		const containerClass = classNames( 'tribe-soc__input-container', {
			'tribe-soc__input-container--active': selected,
		} );


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
				className="tribe-soc__input"
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
		const { store } = this.props;
		const { search } = this.state;
		const storeState = store.getState();

		if ( search === '' ) {
			store.dispatch({
				type: 'CLEAR',
				posts: [],
			});
		}

		if ( search.trim() === storeState.search.trim() ) {
			return;
		}

		store.dispatch( {
			type: 'SEARCH',
			search,
			params: {
				orderBy: 'relevance',
				per_page: 5,
			},
		} );
	}

	renderResults() {
		const { search, fetching } = this.state;
		const { selected } = this.props;

		if ( ! selected ) {
			return null;
		}

		if ( isEmpty( search ) ) {
			return null;
		}

		if ( fetching ) {
			return (
				<div className="tribe-soc__results--loading">
					<Spinner />
				</div>
			);
		}

		return (
			<nav className="tribe-soc__results">
				{ this.renderItems() }
			</nav>
		)
	}

	renderItems() {
		const { posts, search } = this.state;

		if ( posts.length === 0 ) {
			return (
				<li onClick={ this.setCreation }><strong>Create</strong>: { search } </li>
			);
		}

		return ( posts.map( this.renderItem ) );
	}

	setCreation = () => {
		const { search } = this.state;
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
