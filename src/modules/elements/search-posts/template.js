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
		name: PropTypes.string,
		postType: PropTypes.string,
		exclude: PropTypes.array,
		searchLabel: PropTypes.string,
		iconLabel: PropTypes.string,
		term: PropTypes.string,
		isLoading: PropTypes.bool,
		results: PropTypes.array,
		page: PropTypes.number,
		onMount: PropTypes.func,
		onInputChange: PropTypes.func,
		onDropdownScroll: PropTypes.func,
		search: PropTypes.func,
	};

	componentDidMount() {
		this.props.onMount();
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
		const { term, searchLabel, onInputChange } = this.props;
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
				onChange={ onInputChange }
			/>
		</div> );
	}

	renderDropdown = ( { isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );

		return (
			<div
				className={ classNames( 'tribe-editor__search-posts' ) }
				aria-expanded={ isOpen }
			>
				{ this.renderSearchInput() }
				<div
					className={ classNames( 'tribe-editor__search-posts__results' ) }
					onScroll={ this.props.onDropdownScroll }
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
