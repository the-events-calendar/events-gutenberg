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
import { DEFAULT_STATE } from '@moderntribe/tickets/data/blocks/rsvp/reducers/header-image';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => ( {
	image: {
		id: selectors.getRSVPHeaderImageId( state ),
		alt: selectors.getRSVPHeaderImageAlt( state ),
		src: selectors.getRSVPHeaderImageSrc( state ),
	},
} );

const mapDispatchToProps = ( dispatch ) => ( {
	onRemove: () => dispatch( actions.setRSVPHeaderImage( {
		id: DEFAULT_STATE.id,
		alt: DEFAULT_STATE.alt,
		src: DEFAULT_STATE.src,
	} ) ),
	onSelect: ( image ) => dispatch( actions.setRSVPHeaderImage( {
		id: image.id,
		alt: image.alt,
		src: image.sizes.medium.url,
	} ) ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RSVPHeaderImage );
