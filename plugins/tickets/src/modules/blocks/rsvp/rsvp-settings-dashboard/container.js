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
	onCloseClick: () => dispatch( actions.setRSVPSettingsOpen( false ) ),
	onSelect: ( image ) => dispatch( actions.setRSVPHeaderImage( {
		headerImageSrc: image.sizes.medium.url,
		headerImageAlt: image.alt,
	} ) ),
	onRemove: () => {},
} );

export default compose(
	withStore(),
	connect( null, mapDispatchToProps ),
)( RSVPSettingsDashboard );
