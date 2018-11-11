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
import AttendeeRegistration from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/ticket';
import { withStore } from '@moderntribe/common/hoc';
import { adminUrl } from '@moderntribe/common/src/modules/utils/globals';

const getAttendeeRegistrationUrl = ( state, ownProps ) => {
	const adminURL = adminUrl();
	const postType = select( 'core/editor' ).getCurrentPostType();
	const ticketId = selectors.getTicketId( state, ownProps );

	return `${ adminURL }edit.php?post_type=${ postType }&page=attendee-registration&ticket_id=${ ticketId }`;
};

const mapStateToProps = ( state, ownProps ) => ( {
	attendeeRegistrationURL: getAttendeeRegistrationUrl( state, ownProps ),
	isCreated: selectors.getTicketHasBeenCreated( state, ownProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( AttendeeRegistration );
