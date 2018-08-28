/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	Dropdown,
	Dashicon,
	ToggleControl,
} from '@wordpress/components';
import { ScrollTo, ScrollArea } from 'react-scroll-to';
import { __ } from '@wordpress/i18n';
import { Select } from '@moderntribe/common/components/form';
import { DatePicker, TimePicker } from '@moderntribe/events/elements';
import './style.pcss';

export default class RecurringForm extends PureComponent {
	static propTypes = {}

	render() {
		return (
			<section className="tribe-events-pro-recurring-block">
				<fieldset className="tribe-events-pro-recurring-block__fieldset">
					<div className="tribe-events-pro-recurring-block__row">
						<div className="tribe-events-pro-recurring-block__row__label">
							<span>{ __( 'A', 'events-gutenberg' ) }</span>
							<span className="tribe-events-pro-recurring-block__row__label__bar">&nbsp;</span>
						</div>
						<div>
							<Select
								options={ [
									{ label: 'Day', value: 'day' },
									{ label: 'Week', value: 'week' },
									{ label: 'Month', value: 'month' },
									{ label: 'Year', value: 'year' },
									{ label: 'Single Occurrence', value: 'single' },
								] }
								value="single"
							/>
						</div>
					</div>
					<div className="tribe-events-pro-recurring-block__row">
						<div className="tribe-events-pro-recurring-block__row__label">
							<span>{ __( 'On', 'events-gutenberg' ) }</span>
							<span className="tribe-events-pro-recurring-block__row__label__bar">&nbsp;</span>
						</div>
						<div>
							<DatePicker datetime="1999-01-01 12:00:00" />
						</div>
					</div>
					<div className="tribe-events-pro-recurring-block__row">
						<div className="tribe-events-pro-recurring-block__row__label">
							<span>{ __( 'From', 'events-gutenberg' ) }</span>
							<span className="tribe-events-pro-recurring-block__row__label__bar">&nbsp;</span>
						</div>
						<div className="tribe-events-pro-recurring-block__row__time">
							<TimePicker />
							<span>{ __( 'to', 'events-gutenberg' ) }</span>
							<TimePicker />
							<div>
								<ToggleControl
									className="bob"
									label={ __( 'Multi-Day', 'events-gutenberg' ) }
									checked={ false }
									onChange={ () => {} }
								/>
							</div>
						</div>
					</div>
				</fieldset>
			</section>
		);
	}
}
