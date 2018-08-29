/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Select } from '@moderntribe/common/components/form';
import { DatePicker, TimePicker } from '@moderntribe/events/elements';
import { Row, Fieldset, Label } from '@moderntribe/events-pro/elements';
import { RECURRENCE_TYPE_RULES_OPTIONS } from '@moderntribe/events-pro/data/blocks/options';

export default class ExceptionForm extends PureComponent {
	static propTypes = {}

	render() {
		return (
			<section className="tribe-events-pro-recurring-block">
				<Fieldset>
					<Row>
						<Label>
							{ __( 'A', 'events-gutenberg' ) }
						</Label>
						<div>
							<Select
								options={ RECURRENCE_TYPE_RULES_OPTIONS }
								value="single"
							/>
						</div>
					</Row>
					<Row>
						<Label>
							{ __( 'On', 'events-gutenberg' ) }
						</Label>
						<div>
							<DatePicker datetime="1999-01-01 12:00:00" />
						</div>
					</Row>
					<Row>
						<Label>
							{ __( 'From', 'events-gutenberg' ) }
						</Label>
						<div className="tribe-events-pro-recurring-block__row__time">
							<TimePicker />
							<span>{ __( 'to', 'events-gutenberg' ) }</span>
							<TimePicker />
							<div>
								<ToggleControl
									label={ __( 'Multi-Day', 'events-gutenberg' ) }
									checked={ false }
									onChange={ () => {} }
								/>
							</div>
						</div>
					</Row>
				</Fieldset>
			</section>
		);
	}
}
