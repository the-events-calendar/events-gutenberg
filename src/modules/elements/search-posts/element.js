/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import SearchPosts from './template';
import { actions, thunks, selectors } from 'data/search';

/**
 * Module Code
 */

const onMount = ( dispatch, ownProps ) => () => {
	const { name, postType, exclude } = ownProps;

	dispatch( actions.addBlock( name ) );
	dispatch( actions.setSearchPostType( name, postType ) );
	dispatch( thunks.search( name, {
		term: '',
		exclude,
	} ) );
};

const onInputChange = ( dispatch, ownProps ) => ( event ) => {
	const { name, exclude } = ownProps;
	const { value } = event.target;

	dispatch( actions.setTerm( name, value ) );
	dispatch( thunks.search( name, {
		term: value,
		exclude,
	} ) );
};

const onItemClick = ( dispatch, ownProps ) => ( onClose ) => ( item ) => {
	const { name, onItemSelect } = ownProps;
	dispatch( actions.setTerm( name, '' ) );

	if ( onItemSelect ) {
		onItemSelect( item.id, item );
	}

	onClose();
}

const onDropdownScroll = ( stateProps, dispatchProps, ownProps ) => ( event ) => {
	const { target } = event;
	const { scrollHeight, scrollTop } = target;
	const scrollPercentage = ( scrollTop / ( scrollHeight - target.offsetHeight ) ) * 100;

	if ( scrollPercentage > 75 ) {
		const { term, page } = stateProps;
		const { name, exclude } = ownProps;
		dispatchProps.dispatch( thunks.search( name, {
			term,
			exclude,
			populated: true,
			page: page + 1,
		} ) );
	}
};

const mapStateToProps = ( state, props ) => ( {
	term: selectors.getSearchTerm( state, props ),
	isLoading: selectors.getIsLoading( state, props ),
	results: selectors.getResults( state, props ),
	page: selectors.getPage( state, props ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	...bindActionCreators( actions, dispatch ),
	...bindActionCreators( thunks, dispatch ),
	onMount: onMount( dispatch, ownProps ),
	onInputChange: onInputChange( dispatch, ownProps ),
	onItemClick: onItemClick( dispatch, ownProps ),
	dispatch,
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	...dispatchProps,
	onDropdownScroll: onDropdownScroll( stateProps, dispatchProps, ownProps ),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SearchPosts );
