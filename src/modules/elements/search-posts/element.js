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
import { actions, selectors } from 'data/search';
import { setTerm } from '../../data/search/actions';

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
		loading: PropTypes.bool,
		name: PropTypes.string,
		postType: PropTypes.string,
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
		this.scrollPosition = 0;
		this.dropdownEl = React.createRef();
	}

	componentDidMount() {
		const { addBlock, setPostType, name, postType } = this.props;
		addBlock( name );
		setPostType( name, postType );
		this.initialFetch();
	}

	initialFetch() {
		const { name, exclude, search } = this.props;
		search( name, {
			term: '',
			exclude,
			populate: true,
		} );
	}

	componentDidUpdate( prevProps ) {
		if ( ! isEqual( prevProps.exclude, this.props.exclude ) ) {
			this.initialFetch();
			return;
		}

		const { loading } = this.props;
		if ( ! loading && this.scrollPosition && this.dropdownEl.current ) {
			this.dropdownEl.current.scrollTop = this.scrollPosition;
			this.scrollPosition = 0;
		}
	}

	onChange = ( event ) => {
		const { value } = event.target;
		const { name, setTerm, search, exclude } = this.props;
		this.scrollPosition = 0;
		setTerm( name, value );
		search( name, {
			term: value,
			exclude,
			populate: true,
		} );
	}

	onScroll = ( event ) => {
		const { target } = event;
		const { scrollHeight, scrollTop } = target;
		const percentage = scrollTop > 0 ? scrollTop / scrollHeight : 0;
		const { loading } = this.state;
		if ( ! loading ) {
			this.scrollPosition = scrollTop;
		}
		if ( percentage > 0.75 ) {
			const { page, term, name, search, exclude } = this.props;
			search( name, {
				term,
				exclude,
				populate: true,
				page: page + 1,
			} );
		}
	}

	renderList = () => {
		const { results, loading } = this.props;

		if ( loading ) {
			return (
				<Placeholder key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}
		return results.map( this.renderItem, this );
	}

	renderItem = ( item = {} ) => {
		const { current } = this.state;
		const { onSelectItem } = this.props;

		const isCurrent = current && current.id === item.id;
		const { title = {} } = item;
		const { rendered = '' } = title;

		return (
			<button
				key={ `post-${ item.id }` }
				role="menuitem"
				className="tribe-editor__search-posts__item"
				onClick={ () => {
					onSelectItem( item.id, item );
					this.onClose();
				} }
				tabIndex={ isCurrent || item.isDisabled ? null : '-1' }
				disabled={ item.isDisabled }
			>
				{ decode( rendered ) }
			</button>
		);
	};

	renderDropdown = ( { onToggle, isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );

		return (
			<div
				className={ classNames( 'tribe-editor__search-posts' ) }
				onScroll={ this.onScroll }
			>
				{ this.renderSearchInput() }
				<div
					role="menu"
					className={ classNames( 'tribe-editor__search-posts__results' ) }
					ref={ this.dropdownEl }
				>
					{ this.renderList() }
				</div>
			</div>
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

	renderToggle = ( { onToggle, isOpen } ) => {
		const { iconLabel } = this.props;

		return (
			<IconButton
				className="tribe-editor__btn"
				label={ iconLabel }
				onClick={ onToggle }
				icon={ <Dashicon icon="search" /> }
				aria-expanded={ isOpen }
			/>
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
	loading: selectors.getLoading( state, props ),
	results: selectors.getResults( state, props ),
	page: selectors.getPage( state, props ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( SearchPosts );
