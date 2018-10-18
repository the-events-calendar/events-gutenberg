/**
 * External Dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';
import FrequencySelect from '../element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'FrequencySelect', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<FrequencySelect
				className="test-class"
				onFrequencyChange={ jest.fn() }
				frequencyOptions={ options.DAILY_RECURRENCE_FREQUENCY_OPTIONS[ 0 ] }
				selected={ options.RECURRENCE_TYPE_RULES_OPTIONS[ 0 ] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
