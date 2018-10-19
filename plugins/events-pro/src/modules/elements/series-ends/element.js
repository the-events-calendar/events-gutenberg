/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	NumberInput,
	Select,
	DayPickerInput,
} from '@moderntribe/common/elements';
import { LabeledRow } from '@moderntribe/events-pro/elements';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const SeriesEnds = ( {
	className,
	onSeriesEndsAfterTimesChange,
	onSeriesEndsChange,
	onSeriesEndsOnDateChange,
	rowLabel,
	seriesEnds,
	seriesEndsAfterTimes,
	seriesEndsOnDate,
	seriesEndsOnDateFormat,
} ) => {
	const getPostfix = () => {
		let postfix = null;

		if ( seriesEnds && seriesEnds.value === constants.ON ) {
			const seriesEndsOnDateObj = new Date( seriesEndsOnDate )
			postfix = (
				<DayPickerInput
					value={ seriesEndsOnDate }
					format={ seriesEndsOnDateFormat }
					formatDate={ formatDate }
					parseDate={ parseDate }
					dayPickerProps={ {
						modifiers: {
							start: seriesEndsOnDateObj,
							end: seriesEndsOnDateObj,
						},
					} }
					onDayChange={ onSeriesEndsOnDateChange }
				/>
			);
		} else if ( seriesEnds && seriesEnds.value === constants.AFTER ) {
			postfix = (
				<Fragment>
					<NumberInput
						className="tribe-editor__series-ends__number-input"
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
		<LabeledRow
			className={ classNames( 'tribe-editor__series-ends', className ) }
			label={ rowLabel }
		>
			<Select
				className="tribe-editor__series-ends__select"
				backspaceRemovesValue={ false }
				value={ seriesEnds }
				isSearchable={ false }
				options={ options.SERIES_ENDS_OPTIONS }
				onChange={ onSeriesEndsChange }
			/>
			{ getPostfix() }
		</LabeledRow>
	);
};

SeriesEnds.propTypes = {
	className: PropTypes.string,
	onSeriesEndsAfterTimesChange: PropTypes.func,
	onSeriesEndsChange: PropTypes.func,
	onSeriesEndsOnDateChange: PropTypes.func,
	rowLabel: PropTypes.string,
	seriesEnds: PropTypes.oneOf( options.SERIES_ENDS_OPTIONS ),
	seriesEndsAfterTimes: PropTypes.number,
	seriesEndsOnDate: PropTypes.string,
	seriesEndsOnDateFormat: PropTypes.string,
};

SeriesEnds.defaultProps = {
	seriesEndsOnDateFormat: 'LL',
	rowLabel: __( 'Series ends', 'events-gutenberg' ),
};

export default SeriesEnds;
