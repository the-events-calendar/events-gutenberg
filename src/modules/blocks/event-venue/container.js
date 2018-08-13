/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import EventVenue from './template';
import { withStore, withSaveData, withDetails, withForm } from 'editor/hoc';
import { actions, selectors } from 'data/blocks/venue';
import { VENUE } from 'editor/post-types';

const mapStateToProps = ( state ) => ( {
	venue: selectors.getVenue( state ),
	showMapLink: selectors.getshowMapLink( state ),
	showMap: selectors.getshowMap( state ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	withStore( { postType: VENUE } ),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
	withDetails( 'venue' ),
	withForm( ( props ) => props.name ),
)( EventVenue );
