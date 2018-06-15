/**
 * External dependencies
 */
import React from 'react';
import { uniqueId, noop } from 'lodash';
import classNames from 'classnames';
import { decode } from 'he';

/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.pcss';

/**
 * Module Code
 */

export default class SearchPosts extends Component {
	static defaultProps = {
		onHover: noop,
		store: {},
		storeName: '',
	};

	constructor() {
		super( ...arguments );
		this.state = {
			filterValue: '',
			selectedItem: null,
			posts: [],
			loading: false,
			search: '',
		};
		this.unsubscribe = noop;
		this.scrollPosition = 0;
		this.dropdownEl = React.createRef();
	}

	componentDidMount() {
		const { store, storeName } = this.props;

		dispatch( storeName ).fetch( {
			exclude: this.props.exclude,
		} );

		this.saveState();
		this.unsubscribe = store.subscribe( this.saveState );
	}

	componentDidUpdate() {
		const { fetching } = this.state;
		if ( ! fetching && this.scrollPosition && this.dropdownEl.current ) {
				this.dropdownEl.current.scrollTop = this.scrollPosition;
				this.scrollPosition = 0;
		}
	}

	saveState = () => {
		const { store } = this.props;
		const { search, posts, fetching } = store.getState();
		this.setState( { posts, search, fetching } );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	searchPosts = ( event ) => {
		const { storeName } = this.props;

		this.scrollPosition = 0;
		dispatch( storeName ).search( event.target.value, {
			exclude: this.props.exclude,
		} );
	}

	onScroll = ( event ) => {
		const { target } = event;
		const { scrollHeight, scrollTop } = target;
		const percentage = scrollTop > 0 ? scrollTop / scrollHeight : 0;
		const { fetching } = this.state;
		if ( ! fetching ) {
			this.scrollPosition = scrollTop;
		}
		if ( percentage > 0.75 ) {
			const { store, storeName } = this.props;
			const { page } = store.getState();
			dispatch( storeName ).fetch( {
				page: page + 1,
				exclude: this.props.exclude,
			} );
		}
	}

	renderList = () => {
		const { posts, fetching } = this.state;

		if ( fetching ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}
		return posts.map( this.renderItem, this );
	}

	renderItem = ( item = {} ) => {
		const { current } = this.state;
		const { onSelectItem, onHover } = this.props;

		const isCurrent = current && current.id === item.id;
		const { title = {} } = item;
		const { rendered = '' } = title;

		return (
			<button
				key={ `post-${ item.id }` }
				role="menuitem"
				className="tribe-editor__search-posts__item"
				onClick={ () => {
					onSelectItem( item.id );
					this.onClose();
				} }
				tabIndex={ isCurrent || item.isDisabled ? null : '-1' }
				disabled={ item.isDisabled }
				onMouseEnter={ onHover( item ) }
				onMouseLeave={ onHover( null ) }
			>
				{ decode( rendered ) }
			</button>
		);
	}

	renderDropdown = ( { onToggle, isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );

		return (
			<div
				className={ classNames( 'tribe-editor__search-posts' ) }
				onScroll={ this.onScroll }>
				{ this.renderSearchInput() }
				<div
					role="menu"
					className={ classNames( 'tribe-editor__search-posts__results' ) }
				     ref={ this.dropdownEl }>
					{ this.renderList() }
				</div>
			</div>
		);
	}

	renderSearchInput() {
		const { searchable, searchLabel } = this.props;
		const instanceId = uniqueId( 'search-' );

		if ( ! searchable ) {
			return null;
		}

		return ( <div>
			<label htmlFor={ `editor-inserter__${ instanceId }` } className="screen-reader-text">
				{ searchLabel }
			</label>
			<input
				id={ `editor-inserter__${ instanceId }` }
				type="search"
				placeholder={ searchLabel }
				value={ this.state.search }
				className="editor-inserter__search"
				onChange={ this.searchPosts }
			/>
		</div> );
	}

	renderToggle = ( { onToggle, isOpen } ) => {
		const { iconLabel } = this.props;
		const icon = (
			<Dashicon icon="search" />
		);

		return (
			<IconButton
				className="tribe-editor__btn"
				label={ iconLabel }
				onClick={ onToggle }
				icon={ icon }
				aria-expanded={ isOpen }
			/>
		);
	}

	render() {
		const { focus } = this.props;

		if ( ! focus ) {
			return null;
		}

		return (
			<Dropdown
				className="tribe-editor__dropdown"
				position="bottom center"
				contentClassName="tribe-editor__dropdown-dialog"
				renderToggle={ this.renderToggle }
				renderContent={ this.renderDropdown }
			/>
		);
	}
}
