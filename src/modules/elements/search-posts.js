/**
 * External dependencies
 */
import { unescape, union, uniqueId } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { query } from '@wordpress/data'
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
	withAPIData
} from '@wordpress/components';

/**
 * Internal dependencies
 */


/**
 * Module Code
 */
class SearchPosts extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			filterValue: '',
			selectedItem: null,
		};

		// this.searchItems = this.searchItems.bind( this );

		this.renderList = this.renderList.bind( this );
		this.renderItem = this.renderItem.bind( this );
		this.renderDropdown = this.renderDropdown.bind( this );
		this.renderToggle = this.renderToggle.bind( this );
	}

	/**
	 * Returns an event handler triggered when hovering a block.
	 *
	 * @param   {Object} block Block object.
	 * @return  {Func}         Event Handler.
	 */
	createToggleBlockHover( block ) {
		if ( ! this.props.onHover ) {
			return null;
		}
		return () => this.props.onHover( block );
	}

	getItems() {
		if ( ! this.props.items ) {
			return [];
		}

		const items = this.props.items.data;
		if ( ! items || ! items.length ) {
			return [];
		}

		return items;
	}

	renderList() {
		const { items, focus, addOrganizer } = this.props;
		const isLoading = items.isLoading;

		if ( isLoading ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		return this.getItems().map( this.renderItem, this );
	}

	renderItem( item ) {
		const { current } = this.state;
		const { onSelectItem } = this.props;

		const isCurrent = current && current.id === item.id;

		return (
			<button
				key={ `post-${ item.id }` }
				role="menuitem"
				className="tribe-editor__search-item"
				onClick={ () => {
					onSelectItem( item.id )
					this.onClose()
				} }
				tabIndex={ isCurrent || item.isDisabled ? null : '-1' }
				disabled={ item.isDisabled }
				onMouseEnter={ this.createToggleBlockHover( item ) }
				onMouseLeave={ this.createToggleBlockHover( null ) }
			>
				{ item.title.rendered }
			</button>
		);
	}

	renderDropdown( { onToggle, isOpen, onClose } ) {
		const instanceId = uniqueId( 'search-' );
		const { searchLabel } = this.props;
		this.onClose = onClose.bind( this );

		return (
			<div className={ classNames( 'tribe-editor__search' ) }>
				<label htmlFor={ `editor-inserter__${ instanceId }` } className="screen-reader-text">
					{ searchLabel }
				</label>
				<input
					id={ `editor-inserter__${ instanceId }` }
					type='search'
					placeholder={ searchLabel }
					className='editor-inserter__search'
					onChange={ ( event ) => console.log( event.target.value ) }
				/>
				<div role="menu" className={ classNames( 'tribe-editor__search-results' ) }>
					{ this.renderList() }
				</div>
			</div>
		);
	}

	renderToggle( { onToggle, isOpen } ) {
		const { iconLabel } = this.props;
		const icon = (
			<Dashicon icon='search' />
		)

		return (
			<IconButton
				className='tribe-editor-button'
				label={ iconLabel }
				onClick={ onToggle }
				icon={ icon }
				aria-expanded={ isOpen }
			/>
		)
	}

	render() {
		const { items, focus } = this.props;

		if ( ! focus ) {
			return null;
		}

		return (
			<Dropdown
				className="tribe-editor-organizer-dropdown"
				position="bottom center"
				contentClassName="tribe-editor-dropdown__dialog"
				renderToggle={ this.renderToggle }
				renderContent={ this.renderDropdown }
			/>
		);
	}
}

const applyQuery = query( ( select, props ) => {
	const { metaKey } = props;
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' )
	const items = meta[ metaKey ] ? meta[ metaKey ] : []
	return {
		items: items,
	}
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { items, postType } = props
	let query = {
		per_page: 100,
		orderby: 'modified',
		status: [ 'draft', 'publish' ],
		order: 'desc',
	};

	if ( items && 0 !== items.length ) {
		query.exclude = items;
	}

	return {
		items: `/wp/v2/${ postType }?${ stringify( query ) }`,
	};
} );

export default compose(
	applyQuery,
	applyWithAPIData,
)( SearchPosts );