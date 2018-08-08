/**
 * External dependencies
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'data/search';

/**
 * Internal dependencies
 */
import SearchOrCreate from './template';

const setFocus = ( isSelected ) => ( inputRef ) => {
	if (
		isSelected
		&& inputRef.current
		&& document.activeElement !== inputRef.current
	) {
		inputRef.current.focus();
	}
};

const mapStateToProps = ( state, props ) => ( {
	term: selectors.getSearchTerm( state, props ),
	loading: selectors.getLoading( state, props ),
	posts: selectors.getResults( state, props ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	...dispatchProps,
	setFocus: setFocus( ownProps.isSelected ),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SearchOrCreate );
