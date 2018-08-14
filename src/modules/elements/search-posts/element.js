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
