/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId, noop, isEqual } from 'lodash';
import classNames from 'classnames';
import { decode } from 'he';

/**
 * WordPress dependencies
 */
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

class SearchPosts extends Component {
	static defaultProps = {
		onHover: noop,
		store: {},
		storeName: '',
		results: [],
	};

	static propTypes = {
		registerBlock: PropTypes.func,
		search: PropTypes.func,
		exclude: PropTypes.array,
		isLoading: PropTypes.bool,
		name: PropTypes.string,
		postType: PropTypes.string,
	};

	componentDidMount() {
		const { addBlock, setSearchPostType, name, postType } = this.props;
		addBlock( name );
		setSearchPostType( name, postType );
		this.initialFetch();
	}

	componentDidUpdate() {

	}

	initialFetch() {
		const { name, exclude, search } = this.props;
		search( name, {
			term: '',
			exclude,
		} );
	}

	onChange = ( event ) => {
		const { value } = event.target;
		const { name, setTerm, search, exclude } = this.props;

		setTerm( name, value );
		search( name, {
			term: value,
			exclude,
		} );
	}

	onScroll = ( event ) => {
		const { target } = event;
		const { scrollHeight, scrollTop } = target;
		const percentage = scrollTop > 0 ? scrollTop / scrollHeight : 0;

		if ( percentage > 0.75 ) {
			const { page, term, name, search, exclude } = this.props;
			search( name, {
				term,
				exclude,
				populated: true,
				page: page + 1,
			} );
		}
	}

	onItemClick = ( item ) => {
		const { name, setTerm, onSelectItem } = this.props;
		setTerm( name, '' );
		onSelectItem( item.id, item );
		this.onClose();
	};

	onDropdownToggle = ( isOpen ) => {
		const { name, term, setTerm } = this.props;

		if ( ! isOpen && term !== '' ) {
			setTerm( name, '' );
		}
	}

	renderToggle = ( { onToggle } ) => {
		return (
			<IconButton
				className="tribe-editor__btn"
				label={ this.props.iconLabel }
				onClick={ onToggle }
				icon={ <Dashicon icon="search" /> }
			/>
		);
	}

	renderItem = ( item ) => (
		<li
			key={ `post-${ item.id }` }
			className="tribe-editor__search-posts__results-list-item"
		>
			<button
				className="tribe-editor__search-posts__results-list-item-button"
				onClick={ () => this.onItemClick( item ) }
			>
				{ decode( item.title.rendered ) }
			</button>
		</li>
	);

	renderList = () => {
		const { results, isLoading } = this.props;

		if ( isLoading ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<ul className="tribe-editor__search-posts__results-list">
				{ results.map( this.renderItem, this ) }
			</ul>
		);
	}

	renderSearchInput() {
		const { term, searchLabel } = this.props;
		const instanceId = uniqueId( 'search-' );

		return ( <div>
			<label htmlFor={ `editor-inserter__${ instanceId }` } className="screen-reader-text">
				{ searchLabel }
			</label>
			<input
				id={ `editor-inserter__${ instanceId }` }
				type="search"
				placeholder={ searchLabel }
				value={ term }
				className="editor-inserter__search"
				onChange={ this.onChange }
			/>
		</div> );
	}

	renderDropdown = ( { isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );

		return (
			<div
				className={ classNames( 'tribe-editor__search-posts' ) }
				onScroll={ this.onScroll }
				aria-expanded={ isOpen }
			>
				{ this.renderSearchInput() }
				<div
					className={ classNames( 'tribe-editor__search-posts__results' ) }
				>
					{ this.renderList() }
				</div>
			</div>
		);
	}

	render() {
		return (
			<Dropdown
				className="tribe-editor__dropdown"
				position="bottom center"
				contentClassName="tribe-editor__dropdown-dialog"
				onToggle={ this.onDropdownToggle }
				renderToggle={ this.renderToggle }
				renderContent={ this.renderDropdown }
			/>
		);
	}
}

export default SearchPosts;
