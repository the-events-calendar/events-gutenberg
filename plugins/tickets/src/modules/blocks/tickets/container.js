/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import Template from './template';
import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/ticket';

const getHasOverlay = ( state, ownProps ) => (
	selectors.getTicketsIsSettingsOpen( state )
		|| (
			! selectors.getTicketsIsSettingsOpen( state )
				&& ! selectors.hasATicketSelected( state )
				&& ! ownProps.isSelected
		)
);

const mapStateToProps = ( state, ownProps ) => ( {
	hasOverlay: getHasOverlay( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	setInitialState: ( props ) => {
		dispatch( actions.setTicketsInitialState( props ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
	withSaveData(),
)( Template );
