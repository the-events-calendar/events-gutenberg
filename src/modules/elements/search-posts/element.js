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
}

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
} );

export default connect( mapStateToProps, mapDispatchToProps )( SearchPosts );
