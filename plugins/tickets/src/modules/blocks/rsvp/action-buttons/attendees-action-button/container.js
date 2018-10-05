/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import AttendeesActionButton from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => ( {
	isDisabled: selectors.getRSVPIsLoading( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( AttendeesActionButton );
