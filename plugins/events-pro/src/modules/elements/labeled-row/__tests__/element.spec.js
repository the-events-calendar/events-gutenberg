import React from 'react';
import renderer from 'react-test-renderer';
import LabeledRow from '../element';

describe( 'LabeledRow', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<LabeledRow
				className="test-class"
				label="hello"
			>
				<div>Test</div>
			</LabeledRow>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
