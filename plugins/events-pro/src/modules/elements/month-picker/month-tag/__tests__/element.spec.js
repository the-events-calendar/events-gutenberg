import React from 'react';
import renderer from 'react-test-renderer';
import MonthTag from '../element';

describe( 'MonthTag', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<MonthTag
				className="test-class"
				onClick={ jest.fn() }
			>
				Modern Tribe
			</MonthTag>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
