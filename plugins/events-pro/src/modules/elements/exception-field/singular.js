/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Select } from '@moderntribe/common/components/form';
import { DatePicker } from '@moderntribe/events/elements';
import { Row, Label } from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const SingularField = ( props ) => {
	return (
		<Fragment>
			<Row>
				<Label>
					{ __( 'A', 'events-gutenberg' ) }
				</Label>
				<div>
					<Select
						options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
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
					<div>
						<ToggleControl
							label={ __( 'Multi-Day', 'events-gutenberg' ) }
							checked={ false }
							onChange={ () => {} }
						/>
					</div>
				</div>
			</Row>
		</Fragment>
	);
};

SingularField.propTypes = {};

export default SingularField;
