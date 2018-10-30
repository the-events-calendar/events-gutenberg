import React from 'react';
import renderer from 'react-test-renderer';
import SingleToDateTimePicker from '../template';

describe( 'SingleToDateTimePicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<SingleToDateTimePicker
				className="test-class"
				endDate="September 21, 2019"
				endTime="12:40"
				isAllDay={ false }
				onEndDateChange={ jest.fn() }
				onEndTimeChange={ jest.fn() }
				onEndTimeClick={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
