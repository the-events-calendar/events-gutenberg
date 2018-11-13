import React from 'react';
import renderer from 'react-test-renderer';
import OnDayOfMonthPicker from '../template';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'OnDayOfMonthPicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<OnDayOfMonthPicker
				className="test-class"
				dayOfMonth={ options.MONTH_DAYS_OPTIONS[ 0 ] }
				onDayOfMonthChange={ jest.fn() }
				onWeekDayChange={ jest.fn() }
				weekDay={ options.DAYS_OF_THE_WEEK_OPTIONS[ 0 ] }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
