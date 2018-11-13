/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Template from './template';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/ticket';
import { withStore } from '@moderntribe/common/hoc';

const getIsCancelDisabled = ( state, ownProps ) => (
	! selectors.getTicketHasChanges( state, ownProps )
		|| selectors.getTicketIsLoading( state, ownProps )
);

const getIsConfirmDisabled = ( state, ownProps ) => (
	! selectors.getTicketTempTitle( state, ownProps )
		|| ! selectors.getTicketHasChanges( state, ownProps )
		|| selectors.getTicketIsLoading( state, ownProps )
);

const onCancelClick = ( state, dispatch, ownProps ) => () => {
	/**
	 * @todo: set ticket temp details to details, set has changes to false
	 */
};

const onConfirmClick = ( state, dispatch, ownProps ) => () => {
	/**
	 * @todo: set ticket details to temp details, set has changes to false
	 */

	/**
	 * @todo: if ticket is not created, dispatch create ticket with current post id
	 * postId = select( 'core/editor' ).getCurrentPostId()
	 *
	 * else, update ticket using ticket id
	 */
};

const mapStateToProps = ( state, ownProps ) => ( {
	hasBeenCreated: selectors.getTicketHasBeenCreated( state, ownProps ),
	isCancelDisabled: getIsCancelDisabled( state, ownProps ),
	isConfirmDisabled: getIsConfirmDisabled( state, ownProps ),
	state,
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const { state, ...restStateProps } = stateProps;
	const { dispatch } = dispatchProps;

	return {
		...ownProps,
		...restStateProps,
		onCancelClick: onCancelClick( state, dispatch, ownProps ),
		onConfirmClick: onConfirmClick( state, dispatch, ownProps ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, null, mergeProps ),
)( Template );
