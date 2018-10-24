/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import FrequencySelect from './template';
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	actions as recurringActions,
	constants as recurringConstants,
	options as recurringOptions,
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import { withStore } from '@moderntribe/common/hoc';

const { RECURRING, KEY_BETWEEN } = constants;
const { DAILY, WEEKLY, MONTHLY, YEARLY } = recurringConstants;
const {
	DAILY_RECURRENCE_FREQUENCY_OPTIONS,
	WEEKLY_RECURRENCE_FREQUENCY_OPTIONS,
	MONTHLY_RECURRENCE_FREQUENCY_OPTIONS,
	YEARLY_RECURRENCE_FREQUENCY_OPTIONS,
} = recurringOptions;

const getFrequency = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const frequency = selectors.getBetween( state, ownProps );

	return {
		label: String( frequency ),
		value: frequency,
	};
};

const getOptions = ( ownProps ) => {
	let options = [];

	switch ( ownProps.selected.value ) {
		case DAILY:
			options = DAILY_RECURRENCE_FREQUENCY_OPTIONS;
			break;
		case WEEKLY:
			options = WEEKLY_RECURRENCE_FREQUENCY_OPTIONS;
			break;
		case MONTHLY:
			options = MONTHLY_RECURRENCE_FREQUENCY_OPTIONS;
			break;
		case YEARLY:
			options = YEARLY_RECURRENCE_FREQUENCY_OPTIONS;
			break;
		default:
			break;
	}

	return options;
};

const mapStateToProps = ( state, ownProps ) => ( {
	frequency: getFrequency( state, ownProps ),
	options: getOptions( ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onChange: ( selectedOption ) => {
			dispatch( edit(
				ownProps.index,
				{ [ KEY_BETWEEN ]: Number( selectedOption.value ) },
			) );
		},
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( FrequencySelect );
