/**
 * External Dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';
import FrequencySelect from '../template';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'FrequencySelect', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<FrequencySelect
				className="test-class"
				onChange={ jest.fn() }
				frequency={ options.DAILY_RECURRENCE_FREQUENCY_OPTIONS[ 0 ] }
				options={ options.DAILY_RECURRENCE_FREQUENCY_OPTIONS }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
