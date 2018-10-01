/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import RSVPHeaderImage from './template';
import { selectors, thunks } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapSelectToProps = ( select ) => ( {
	postId: select( 'core/editor' ).getCurrentPostId(),
} );

/**
 * Full payload from gutenberg media upload is not used,
 * only id, alt, and src are used for this specific case.
 */
const mapStateToProps = ( state ) => ( {
	image: {
		id: selectors.getRSVPHeaderImageId( state ),
		alt: selectors.getRSVPHeaderImageAlt( state ),
		src: selectors.getRSVPHeaderImageSrc( state ),
	},
	isSettingsLoading: selectors.getRSVPIsSettingsLoading( state ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onRemove: () => dispatch( thunks.deleteRSVPHeaderImage( ownProps.postId ) ),
	/**
	 * Full payload from gutenberg media upload is not used,
	 * only id, alt, and medium src are used for this specific case.
	 */
	onSelect: ( image ) => dispatch(
		thunks.updateRSVPHeaderImage( ownProps.postId, image )
	),
} );

export default compose(
	withStore(),
	withSelect( mapSelectToProps ),
	connect( mapStateToProps, mapDispatchToProps ),
)( RSVPHeaderImage );
