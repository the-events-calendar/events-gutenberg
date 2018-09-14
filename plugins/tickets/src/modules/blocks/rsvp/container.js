/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVP from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/rsvp';

const mapStateToProps = ( state ) => ( {
	created: selectors.getRSVPCreated( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( RSVP );
