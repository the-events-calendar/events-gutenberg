import React from 'react';
import renderer from 'react-test-renderer';
import Fieldset from '../element';

describe( 'Fieldset', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<Fieldset className="test-class">
				<span>Test children</span>
			</Fieldset>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
