/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
// import { NumberInput, Select } from '@moderntribe/common/elements';
import NumberInput from '@moderntribe/common/elements/number-input/element';
import Select from '@moderntribe/common/elements/select/element';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';

const SeriesEnds = ( {
	className,
	onSeriesEndsAfterTimesChange,
	onSeriesEndsChange,
	onSeriesEndsOnDateChange,
	seriesEndsAfterTimes,
	seriesEnds,
	seriesEndsOnDate,
	seriesEndsOnDateFormat,
} ) => {
	const getSeriesEndsPostfix = () => {
		let postfix = null;

		if ( seriesEnds.value === constants.ON ) {
			postfix = (
				<DayPickerInput
					value={ seriesEndsOnDate }
					format={ seriesEndsOnDateFormat }
					formatDate={ formatDate }
					parseDate={ parseDate }
					onDayChange={ onSeriesEndsOnDateChange }
				/>
			);
		} else if ( seriesEnds.value === constants.AFTER ) {
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
				backspaceRemovesValue={ false }
				value={ seriesEnds }
				isSearchable={ false }
				options={ options.SERIES_ENDS_OPTIONS }
				onChange={ onSeriesEndsChange }
			/>
			{ getSeriesEndsPostfix() }
		</div>
	);
}

SeriesEnds.propTypes = {
	className: PropTypes.string,
	onSeriesEndsAfterTimesChange: PropTypes.func,
	onSeriesEndsChange: PropTypes.func,
	onSeriesEndsOnDateChange: PropTypes.func,
	seriesEndsAfterTimes: PropTypes.number,
	seriesEnds: PropTypes.oneOf( options.SERIES_ENDS_OPTIONS ),
	seriesEndsOnDate: PropTypes.string,
	seriesEndsOnDateFormat: PropTypes.string,
};

SeriesEnds.defaultProps = {
	seriesEndsOnDateFormat: 'LL',
};

export default SeriesEnds;
