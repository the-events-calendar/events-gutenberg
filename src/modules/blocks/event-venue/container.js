/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import EventVenue from './template';
import { toVenue } from 'elements';
import { withStore, withSaveData, withDetails, withForm } from 'editor/hoc';
import { actions, selectors } from 'data/blocks/venue';
import { VENUE } from 'editor/post-types';

const setVenue = ( dispatch ) => ( id ) => {
	const { setVenue, setShowMap, setShowMapLink } = actions;
	dispatch( setVenue( id ) );
	dispatch( setShowMap( true ) );
	dispatch( setShowMapLink( true ) );
};

const onFormComplete = ( dispatch, ownProps ) => ( body ) => {
	const { setDetails } = ownProps;
	const { id } = body;
	setDetails( id, body );
	setVenue( dispatch )( id );
};

const onFormSubmit = ( dispatch, ownProps ) => ( fields ) => (
	ownProps.sendForm( toVenue( fields ), onFormComplete( dispatch, ownProps ) )
);

const onItemSelect = ( dispatch ) => setVenue( dispatch );

const mapStateToProps = ( state ) => ( {
	venue: selectors.getVenue( state ),
	showMapLink: selectors.getshowMapLink( state ),
	showMap: selectors.getshowMap( state ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	...bindActionCreators( actions, dispatch ),
	onFormSubmit: onFormSubmit( dispatch, ownProps ),
	onItemSelect: onItemSelect( dispatch ),
} );

export default compose(
	withStore( { postType: VENUE } ),
	connect( mapStateToProps ),
	withDetails( 'venue' ),
	withForm( ( props ) => props.name ),
	connect( null, mapDispatchToProps ),
	withSaveData(),
)( EventVenue );
