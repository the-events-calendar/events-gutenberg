import React from 'react';
import renderer from 'react-test-renderer';
import Label from '../element';

describe( 'Label', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<Label className="test-class">
				Test label
			</Label>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
