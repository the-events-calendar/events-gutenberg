import React from 'react';
import renderer from 'react-test-renderer';
import DayOfMonthPicker from '../element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'DayOfMonthPicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<DayOfMonthPicker
				dayOfMonth={ options.MONTH_DAYS_OPTIONS[0]}
				onDayChange={ jest.fn() }
				onDayOfMonthChange={ jest.fn() }
				weekDay={ options.DAYS_OF_THE_WEEK_OPTIONS[0] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should display a different weekday', () => {
		const component = renderer.create(
			<DayOfMonthPicker
				dayOfMonth={ options.MONTH_DAYS_OPTIONS[0]}
				onDayChange={ jest.fn() }
				onDayOfMonthChange={ jest.fn() }
				weekDay={ options.DAYS_OF_THE_WEEK_OPTIONS[5] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should display a date of the month', () => {
		const component = renderer.create(
			<DayOfMonthPicker
				dayOfMonth={ options.MONTH_DAYS_OPTIONS[10]}
				onDayChange={ jest.fn() }
				onDayOfMonthChange={ jest.fn() }
				weekDay={ options.DAYS_OF_THE_WEEK_OPTIONS[0] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
