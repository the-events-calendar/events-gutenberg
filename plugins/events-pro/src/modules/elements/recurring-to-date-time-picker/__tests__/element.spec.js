import React from 'react';
import renderer from 'react-test-renderer';
import DayOfMonthPicker from '../element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'DayOfMonthPicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<DayOfMonthPicker
				className="test-class"
				endMonthDay={ options.MONTH_DAYS_OPTIONS[0] }
				endWeekDay={ options.DAYS_OF_THE_WEEK[0] }
				endTime="14:20"
				onEndMonthDayChange={ jest.fn() }
				onEndTimeChange={ jest.fn() }
				onEndTimeClick={ jest.fn() }
				onEndWeekDayChange={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
