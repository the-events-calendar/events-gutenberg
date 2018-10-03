/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { config } from '@moderntribe/common/utils/globals';

/**
 * Wordpress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import AttendeesActionButton from './template';

import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = () => {
	const adminURL = config().admin_url || '';
	const postType = select( 'core/editor' ).getCurrentPostType();
	const postId = select( 'core/editor' ).getCurrentPostId();

	/**
	 * @todo revise page= for other providers
	 */
	return {
		href: `${ adminURL }edit.php?post_type=${ postType }&page=tpp-orders&event_id=${ postId }`,
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( AttendeesActionButton );

