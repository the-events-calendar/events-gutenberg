import React from 'react';
import renderer from 'react-test-renderer';
import ExceptionAddField from '../element';

describe( 'ExceptionAddField', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<ExceptionAddField onClick={ jest.fn() } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
