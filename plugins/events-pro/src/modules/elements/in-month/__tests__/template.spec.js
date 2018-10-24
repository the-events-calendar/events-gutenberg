import React from 'react';
import renderer from 'react-test-renderer';
import InMonth from '../template';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'InMonth', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<InMonth
				className="test-class"
				months={ [
					options.MONTHS_OF_THE_YEAR_OPTIONS[ 2 ],
					options.MONTHS_OF_THE_YEAR_OPTIONS[ 5 ],
				] }
				onMonthClick={ jest.fn() }
				onSelectChange={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
