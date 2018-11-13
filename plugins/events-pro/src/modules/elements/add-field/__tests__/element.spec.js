import React from 'react';
import renderer from 'react-test-renderer';
import AddField from '../element';

describe( 'AddField', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<AddField onClick={ jest.fn() } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
