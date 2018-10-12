import React from 'react';
import renderer from 'react-test-renderer';
import OnDatePicker from '../element';

describe( 'OnDatePicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<OnDatePicker
				className="test-class"
				date="September 21, 2019"
				onDateChange={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
