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
import { hasClass, searchParent } from '@moderntribe/events/editor/utils/dom';
import { withStore, withSaveData } from '@moderntribe/common/hoc';
import EventDateTime from './template';

/**
 * Module Code
 */

const ESCAPE_KEY = 27;

const isTargetInBlock = ( target ) => (
	searchParent( target, ( testNode ) => {
		if ( testNode.classList.contains( 'editor-block-list__block' ) ) {
			return Boolean( testNode.querySelector( '.tribe-editor__date-time' ) );
		}
		return false;
	} )
);

const isTargetInParents = ( target, parents ) => (
	searchParent( target, ( testNode ) => hasClass( testNode, parents ) )
);

const onKeyDown = ( dispatchProps ) => ( e ) => {
	const { setDateInputVisibility, closeDashboardDateTime } = dispatchProps;

	if ( e.keyCode === ESCAPE_KEY ) {
		setDateInputVisibility( false );
		closeDashboardDateTime();
	}
};

const onClick = ( dispatchProps ) => ( e ) => {
	const { setDateInputVisibility, closeDashboardDateTime } = dispatchProps;
	const { target } = e;
	const parents = [
		'tribe-editor__timepicker__dialog',
		'edit-post-sidebar',
		'trigger-dashboard-datetime',
		'tribe-editor__btn--label',
	];

	if (
		! isTargetInBlock( target ) &&
		! isTargetInParents( target, parents )
	) {
		setDateInputVisibility( false );
		closeDashboardDateTime();
	}
};

const onSelectDay = ( stateProps, dispatchProps ) => ( { from, to } ) => {
	const { start, end } = stateProps;
	const { setDates } = dispatchProps;
	setDates( { start, end, from, to } );
};

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
	setInitialState: ( props ) => {
		dispatch( priceActions.setInitialState( props ) );
		dispatch( dateTimeThunks.setInitialState( props ) );
		dispatch( UIActions.setInitialState( props ) );
	},
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	...dispatchProps,
	onKeyDown: onKeyDown( dispatchProps ),
	onClick: onClick( dispatchProps ),
	onSelectDay: onSelectDay( stateProps, dispatchProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
	withSaveData(),
)( EventDateTime );
