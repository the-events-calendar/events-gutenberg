import React from 'react';
import renderer from 'react-test-renderer';
import RecurrenceTypePicker from '../element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'RecurrenceTypePicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<RecurrenceTypePicker
				className="test-class"
				onRecurrenceTypeChange={ jest.fn() }
				recurrenceType={ options.RECURRENCE_TYPE_RULES_OPTIONS[ 4 ] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
