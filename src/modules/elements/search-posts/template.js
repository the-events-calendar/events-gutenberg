/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId, noop } from 'lodash';
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
		onItemClick: PropTypes.func,
		onDropdownScroll: PropTypes.func,
		search: PropTypes.func,
	};

	componentDidMount() {
		this.props.onMount();
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

	renderItem = ( item, onClick ) => (
		<li
			key={ `post-${ item.id }` }
			className="tribe-editor__search-posts__results-list-item"
		>
			<button
				className="tribe-editor__search-posts__results-list-item-button"
				onClick={ () => onClick( item ) }
			>
				{ decode( item.title.rendered ) }
			</button>
		</li>
	);

	renderList = ( onClose ) => {
		const { results, isLoading, onItemClick } = this.props;

		if ( isLoading ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<ul className="tribe-editor__search-posts__results-list">
				{ results.map( ( item ) => (
					this.renderItem( item, onItemClick( onClose ) ) )
				) }
			</ul>
		);
	}

	renderSearchInput() {
		const { term, searchLabel, onInputChange } = this.props;
		const instanceId = uniqueId( 'search-' );

		return (
			<div>
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
			</div>
		);
	}

	renderDropdown = ( { isOpen, onClose } ) => (
		<div
			className={ classNames( 'tribe-editor__search-posts' ) }
			aria-expanded={ isOpen }
		>
			{ this.renderSearchInput() }
			<div
				className={ classNames( 'tribe-editor__search-posts__results' ) }
				onScroll={ this.props.onDropdownScroll }
			>
				{ this.renderList( onClose ) }
			</div>
		</div>
	);

	render() {
		return (
			<Dropdown
				className="tribe-editor__dropdown"
				position="bottom center"
				contentClassName="tribe-editor__dropdown-dialog"
				onToggle={ this.props.onDropdownToggle }
				renderToggle={ this.renderToggle }
				renderContent={ this.renderDropdown }
			/>
		);
	}
}

export default SearchPosts;
