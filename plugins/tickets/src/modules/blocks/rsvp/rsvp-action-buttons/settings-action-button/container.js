/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import SettingsActionButton from './template';
import { actions } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapDispatchToProps = ( dispatch ) => ( {
	onClick: () => dispatch( actions.setRSVPSettingsOpen( true ) ),
} );

export default compose(
	withStore(),
	connect( null, mapDispatchToProps ),
)( SettingsActionButton );
