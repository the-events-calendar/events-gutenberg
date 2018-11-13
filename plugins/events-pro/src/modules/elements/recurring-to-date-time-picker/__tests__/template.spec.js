import React from 'react';
import renderer from 'react-test-renderer';
import RecurringToDateTimePicker from '../template';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'RecurringToDateTimePicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<RecurringToDateTimePicker
				className="test-class"
				endTime="12:34"
				isAllDay={ false }
				onEndTimeChange={ jest.fn() }
				onEndTimeClick={ jest.fn() }
				onRecurringMultiDayChange={ jest.fn() }
				recurringMultiDay={ options.RECURRING_MULTI_DAY_OPTIONS[ 0 ] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
