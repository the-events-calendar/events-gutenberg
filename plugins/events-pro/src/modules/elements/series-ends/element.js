/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

/**
 * Internal dependencies
 */
import { Select } from '@moderntribe/common/components/form';
import { NumberInput } from '@moderntribe/common/elements';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';

const SeriesEnds = ( {
	className,
	onChange,
	onSeriesEndsAfterTimesChange,
	onSeriesEndsOnDateChange,
	seriesEndsAfterTimes,
	seriesEnds,
	seriesEndsOnDate,
	seriesEndsOnDateFormat,
} ) => {
	const getSeriesEndsPostfix = () => {
		let postfix = null;

		if ( seriesEnds === constants.ON ) {
			postfix = (
				<DayPickerInput
					value={ seriesEndsOnDate }
					format={ seriesEndsOnDateFormat }
					formatDate={ formatDate }
					parseDate={ parseDate }
					onDayChange={ onSeriesEndsOnDateChange }
				/>
			);
		} else if ( seriesEnds === constants.AFTER ) {
			postfix = (
				<Fragment>
					<NumberInput
						min={ 1 }
						value={ seriesEndsAfterTimes }
						onChange={ onSeriesEndsAfterTimesChange }
					/>
					<span>{ __( 'event', 'events-gutenberg' ) }</span>
				</Fragment>
			)
		}

		return postfix;
	};

	return (
		<div className={ classNames( 'tribe-editor__series-ends', className ) }>
			<Select
				options={ options.SERIES_ENDS_OPTIONS }
				value={ seriesEnds }
				onOptionClick={ onChange }
			/>
			{ getSeriesEndsPostfix() }
		</div>
	);
}

SeriesEnds.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	onSeriesEndsAfterTimesChange: PropTypes.func,
	onSeriesEndsOnDateChange: PropTypes.func,
	seriesEndsAfterTimes: PropTypes.func,
	seriesEnds: PropTypes.oneOf( constants.SERIES_END_TYPES ),
	seriesEndsOnDate: PropTypes.string,
	seriesEndsOnDateFormat: PropTypes.string,
};

SeriesEnds.defaultProps = {
	seriesEndsOnDateFormat: 'LL',
};

export default SeriesEnds;
