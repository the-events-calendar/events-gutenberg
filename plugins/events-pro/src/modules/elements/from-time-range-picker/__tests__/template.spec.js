import React from 'react';
import renderer from 'react-test-renderer';
import FromTimeRangePicker from '../template';

describe( 'FromDateTimePicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<FromTimeRangePicker
				className="test-class"
				endTime="07:34"
				isAllDay={ false }
				isMultiDay={ false }
				onEndTimeChange={ jest.fn() }
				onEndTimeClick={ jest.fn() }
				onMultiDayChange={ jest.fn() }
				onStartTimeChange={ jest.fn() }
				onStartTimeClick={ jest.fn() }
				startTime="15:40"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render component with multi day', () => {
		const component = renderer.create(
			<FromTimeRangePicker
				className="test-class"
				endTime="07:34"
				isAllDay={ false }
				isMultiDay={ true }
				onEndTimeChange={ jest.fn() }
				onEndTimeClick={ jest.fn() }
				onMultiDayChange={ jest.fn() }
				onStartTimeChange={ jest.fn() }
				onStartTimeClick={ jest.fn() }
				startTime="15:40"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render component with all day', () => {
		const component = renderer.create(
			<FromTimeRangePicker
				className="test-class"
				endTime="07:34"
				isAllDay={ true }
				isMultiDay={ false }
				onEndTimeChange={ jest.fn() }
				onEndTimeClick={ jest.fn() }
				onMultiDayChange={ jest.fn() }
				onStartTimeChange={ jest.fn() }
				onStartTimeClick={ jest.fn() }
				startTime="15:40"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
