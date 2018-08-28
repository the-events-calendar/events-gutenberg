/**
 * External dependencies
 */
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore, withDetails } from '@moderntribe/common/hoc';
import EventDetailsOrganizer from './template';

/**
 * Module Code
 */

export default compose(
	withStore(),
	withDetails( 'organizerId' )
)( EventDetailsOrganizer );
