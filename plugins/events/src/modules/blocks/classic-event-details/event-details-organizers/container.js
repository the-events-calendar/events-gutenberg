/**
 * External dependencies
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { actions, selectors } from '@moderntribe/events/data/blocks/organizers';
import { actions as detailsActions } from '@moderntribe/events/data/details';
import EventDetailsOrganizers from './template';

/**
 * Module Code
 */

const mapStateToProps = ( state ) => ( {
	organizers: selectors.getMappedOrganizers( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( actions, dispatch ),
	...bindActionCreators( detailsActions, dispatch ),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( EventDetailsOrganizers );
