import React from 'react';
import renderer from 'react-test-renderer';
import RemoveField from '../element';

describe( 'RemoveField', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<RemoveField onClick={ jest.fn() } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
