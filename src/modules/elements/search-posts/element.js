/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId, noop, isEqual } from 'lodash';
import classNames from 'classnames';
import { decode } from 'he';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

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
import { actions, thunks, selectors } from 'data/search';

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

	initialFetch() {
		const { name, exclude, search } = this.props;
		search( name, {
			term: '',
			exclude,
		} );
	}

	componentDidUpdate( prevProps ) {
		if ( ! isEqual( prevProps.exclude, this.props.exclude ) ) {
			this.initialFetch();
		}
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

	renderToggle = ( { onToggle } ) => (
		<IconButton
			className="tribe-editor__btn"
			label={ this.props.iconLabel }
			onClick={ onToggle }
			icon={ <Dashicon icon="search" /> }
		/>
	);

	renderItem = ( item ) => (
		<li className="tribe-editor__search-posts__results-list-item">
			<button
				key={ `post-${ item.id }` }
				role="menuitem"
				className="tribe-editor__search-posts__results-list-item-action"
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
				renderToggle={ this.renderToggle }
				renderContent={ this.renderDropdown }
			/>
		);
	}
}

const mapStateToProps = ( state, props ) => ( {
	term: selectors.getSearchTerm( state, props ),
	isLoading: selectors.getIsLoading( state, props ),
	results: selectors.getResults( state, props ),
	page: selectors.getPage( state, props ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( actions, dispatch ),
	...bindActionCreators( thunks, dispatch ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( SearchPosts );
