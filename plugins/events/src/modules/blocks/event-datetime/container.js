/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import {
	actions as dateTimeActions,
	thunks as dateTimeThunks,
	selectors as dateTimeSelectors,
} from '@moderntribe/events/data/blocks/datetime';
import {
	actions as UIActions,
	selectors as UISelectors,
} from '@moderntribe/events/data/ui';
import {
	selectors as priceSelectors,
	actions as priceActions,
} from '@moderntribe/events/data/blocks/price';
import { withStore, withSaveData } from '@moderntribe/common/hoc';
import EventDateTime from './template';

/**
 * Module Code
 */

const mapStateToProps = ( state ) => {
	return {
		dashboardOpen: UISelectors.getDashboardDateTimeOpen( state ),
		visibleMonth: UISelectors.getVisibleMonth( state ),
		start: dateTimeSelectors.getStart( state ),
		end: dateTimeSelectors.getEnd( state ),
		naturalLanguageLabel: dateTimeSelectors.getNaturalLanguageLabel( state ),
		multiDay: dateTimeSelectors.getMultiDay( state ),
		allDay: dateTimeSelectors.getAllDay( state ),
		separatorDate: dateTimeSelectors.getDateSeparator( state ),
		separatorTime: dateTimeSelectors.getTimeSeparator( state ),
		showTimeZone: dateTimeSelectors.getTimeZoneVisibility( state ),
		timeZone: dateTimeSelectors.getTimeZone( state ),
		timeZoneLabel: dateTimeSelectors.getTimeZoneLabel( state ),
		showDateInput: dateTimeSelectors.getDateInputVisibility( state ),
		cost: priceSelectors.getPrice( state ),
		currencySymbol: priceSelectors.getSymbol( state ),
		currencyPosition: priceSelectors.getPosition( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( dateTimeActions, dispatch ),
	...bindActionCreators( dateTimeThunks, dispatch ),
	...bindActionCreators( UIActions, dispatch ),
	...bindActionCreators( priceActions, dispatch ),
	setInitialState( props ) {
		dispatch( priceActions.setInitialState( props ) );
		dispatch( dateTimeThunks.setInitialState( props ) );
		dispatch( UIActions.setInitialState( props ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventDateTime );
