/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Wordpress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import AttendeesActionButton from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/ticket';
import { TICKET_ORDERS_PAGE_SLUG } from '@moderntribe/tickets/data/utils';
import { adminUrl } from '@moderntribe/common/utils/globals';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => {
	const adminURL = adminUrl();
	const postType = select( 'core/editor' ).getCurrentPostType();
	const postId = select( 'core/editor' ).getCurrentPostId();
	const provider = selectors.getSelectedProvider( state );
	const page = TICKET_ORDERS_PAGE_SLUG[ provider ];

	return {
		href: page
			? `${ adminURL }edit.php?post_type=${ postType }&page=${ page }&event_id=${ postId }`
			: '',
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( AttendeesActionButton );

