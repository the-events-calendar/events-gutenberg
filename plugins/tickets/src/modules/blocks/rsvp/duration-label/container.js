/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVPDurationLabel from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => ( {
	isDisabled: selectors.getRSVPSettingsOpen( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( RSVPDurationLabel );
