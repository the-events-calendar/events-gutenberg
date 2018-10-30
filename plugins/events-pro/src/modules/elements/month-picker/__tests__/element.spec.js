import React from 'react';
import renderer from 'react-test-renderer';
import MonthPicker from '../element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'MonthPicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<MonthPicker
				className="test-class"
				months={ [] }
				onMonthClick={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render month tags', () => {
		const component = renderer.create(
			<MonthPicker
				className="test-class"
				months={ [
					options.MONTHS_OF_THE_YEAR_OPTIONS[6],
					options.MONTHS_OF_THE_YEAR_OPTIONS[8],
				] }
				onMonthClick={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
