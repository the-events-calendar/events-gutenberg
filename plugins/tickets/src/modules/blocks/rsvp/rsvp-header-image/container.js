/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVPHeaderImage from './template';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { DEFAULT_STATE } from '@moderntribe/tickets/data/blocks/rsvp/reducer';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => ( {
	headerImageAlt: selectors.getRSVPHeaderImageAlt( state ),
	headerImageSrc: selectors.getRSVPHeaderImageSrc( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	onRemove: () => dispatch( actions.setRSVPHeaderImage( {
		headerImageAlt: DEFAULT_STATE.headerImageAlt,
		headerImageSrc: DEFAULT_STATE.headerImageSrc,
	} ) ),
	onSelect: ( image ) => dispatch( actions.setRSVPHeaderImage( {
		headerImageAlt: image.alt,
		headerImageSrc: image.sizes.medium.url,
	} ) ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RSVPHeaderImage );
