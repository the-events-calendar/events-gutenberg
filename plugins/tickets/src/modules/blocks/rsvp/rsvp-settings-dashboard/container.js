/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVPSettingsDashboard from './template';
import { actions } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapDispatchToProps = ( dispatch ) => ( {
	onCloseClick: () => {},
} );

export default compose(
	withStore(),
	connect( null, mapDispatchToProps ),
)( RSVPSettingsDashboard );
