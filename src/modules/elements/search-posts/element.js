/**
 * External dependencies
 */
import { unescape, union, uniqueId, noop, throttle } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { withSelect, dispatch, select } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
	withAPIData,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.pcss';

/**
 * Module Code
 */
class SearchPosts extends Component {
	static defaultProps = {
		onHover: noop,
		store: {},
		storeName: '',
	}

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
	}

	componentDidMount() {
		const { store, storeName } = this.props;

		select( storeName ).fetch();

		this.saveState();
		this.unsubscribe = store.subscribe( this.saveState );
	}

	saveState = () => {
		const { store } = this.props;
		const { search, posts } = store.getState();
		this.setState( { posts, search } );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	searchPosts = ( event ) => {
		const { store, storeName } = this.props;
		const value = event.target.value.trim();
		const { search } = store.getState();

		this.setState( { search: event.target.value } );

		if ( search === value ) {
			return;
		}

		dispatch( storeName ).setPage( 1 );
		dispatch( storeName ).unblock();
		select( storeName ).fetch( {
			search: value,
			orderBy: value ? 'relevance' : 'title',
		} );
	}

	onScroll = ( event ) => {
		const { target } = event;
		const { scrollHeight, scrollTop } = target;
		const percentage = scrollTop > 0 ? scrollTop / scrollHeight : 0;
		if ( percentage > 0.10 ) {
			const { store, storeName } = this.props;
			const { page, search } = store.getState();
			select( storeName ).fetch( {
				search,
				page,
				orderBy: search ? 'relevance' : 'title',
			} );
		}
	}

	renderList = () => {
		const { store } = this.props;
		const { posts } = this.state;
		const { page, fetching, search } = store.getState();

		if ( 1 === page && fetching ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}
		return posts.map( this.renderItem, this );
	}

	renderItem = ( item ) => {
		const { current } = this.state;
		const { onSelectItem, onHover } = this.props;

		const isCurrent = current && current.id === item.id;

		return (
			<button
				key={ `post-${ item.id }` }
				role="menuitem"
				className="tribe-element-search-posts-item"
				onClick={ () => {
					onSelectItem( item );
					this.onClose();
				} }
				tabIndex={ isCurrent || item.isDisabled ? null : '-1' }
				disabled={ item.isDisabled }
				onMouseEnter={ onHover( item ) }
				onMouseLeave={ onHover( null ) }
			>
				{ item.title.rendered }
			</button>
		);
	}

	renderDropdown = ( { onToggle, isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );

		return (
			<div className={ classNames( 'tribe-element-search-posts' ) } onScroll={ this.onScroll }>
				{this.renderSearchInput()}
				<div role="menu" className={ classNames( 'tribe-element-search-posts-results' ) }>
					{this.renderList()}
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
				{searchLabel}
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
				className="tribe-editor-button"
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
				className="tribe-element-search-posts-dropdown"
				position="bottom center"
				contentClassName="tribe-element-search-posts-dropdown-dialog"
				renderToggle={ this.renderToggle }
				renderContent={ this.renderDropdown }
			/>
		);
	}
}

const applySelect = withSelect( ( select, props ) => {
	const { metaKey } = props;
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	const items = meta[ metaKey ] ? meta[ metaKey ] : [];
	return {
		items: items,
	};
} );

export default compose(
	applySelect
)( SearchPosts );
