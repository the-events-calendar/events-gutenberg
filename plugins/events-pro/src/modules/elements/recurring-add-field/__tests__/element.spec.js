import React from 'react';
import renderer from 'react-test-renderer';
import RecurringAddField from '../element';

describe( 'RecurringAddField', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<RecurringAddField onClick={ jest.fn() } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
