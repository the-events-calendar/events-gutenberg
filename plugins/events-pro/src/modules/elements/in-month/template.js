/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import MonthPicker from '@moderntribe/events-pro/elements/month-picker/element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const InMonth = ( {
	className,
	months,
	onMonthClick,
	onSelectChange,
} ) => (
	<LabeledRow
		className={ classNames( 'tribe-editor__in-month', className ) }
		label={ __( 'In', 'events-gutenberg' ) }
	>
		<MonthPicker
			className="tribe-editor__in-month__month-picker"
			months={ months }
			onMonthClick={ onMonthClick }
			onSelectChange={ onSelectChange }
		/>
	</LabeledRow>
);

InMonth.propTypes = {
	className: PropTypes.string,
	months: PropTypes.arrayOf(
		PropTypes.oneOf( options.MONTHS_OF_THE_YEAR_OPTIONS )
	),
	onMonthClick: PropTypes.func,
	onSelectChange: PropTypes.func,
};

export default InMonth;
