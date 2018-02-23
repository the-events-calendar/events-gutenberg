/**
 * External dependencies
 */
import { unescape, union, uniqueId } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
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
		this.nodes = {};
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

	renderList() {
		const { items, focus, addOrganizer } = this.props;
		const instanceId = uniqueId( 'search-' );
		const isLoading = true;

		if ( isLoading ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<ul>
				{ items.map( this.renderItem, this ) }
			</ul>
		);
	}

	renderItem( item ) {
		const { current } = this.state;
		const { onSelectItem } = this.props;

		const isCurrent = current && current.id === item.id;

		return (
			<li>
				<button
					role="menuitem"
					key={ item.id }
					className="editor-inserter__block"
					onClick={ () => onSelectItem( item ) }
					tabIndex={ isCurrent || item.isDisabled ? null : '-1' }
					disabled={ item.isDisabled }
					onMouseEnter={ this.createToggleBlockHover( item ) }
					onMouseLeave={ this.createToggleBlockHover( null ) }
				>
					{ item.title }
				</button>
			</li>
		);
	}

	renderDropdown() {
		const instanceId = uniqueId( 'search-' );

		return (
			<div className={ classNames( 'tribe-editor-organizer__search' ) }>
				<label htmlFor={ `editor-inserter__${ instanceId }` } className="screen-reader-text">
					{ __( 'Search for an organizer', 'the-events-calendar' ) }
				</label>
				<input
					id={ `editor-inserter__${ instanceId }` }
					type='search'
					placeholder={ __( 'Search for an organizer', 'the-events-calendar' ) }
					className='editor-inserter__search'
					onChange={ ( event ) => console.log( event.target.value ) }
				/>
				<div role="menu" className={ classNames( 'tribe-editor-organizer__search-results' ) }>
					{ this.renderList() }
				</div>
			</div>
		);
	}

	renderToggle( { onToggle, isOpen } ) {
		const icon = (
			<Dashicon icon='search' />
		)

		return (
			<IconButton
				className='tribe-editor-button'
				label={ __( 'Add existing Organizer' ) }
				onClick={ onToggle }
				icon={ icon }
				aria-expanded={ isOpen }
			/>
		)
	}

	render() {
		const { items, focus, addOrganizer } = this.props;

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

export default SearchPosts