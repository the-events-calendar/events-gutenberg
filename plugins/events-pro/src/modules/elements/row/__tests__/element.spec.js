import React from 'react';
import renderer from 'react-test-renderer';
import Row from '../element';

describe( 'Row', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<Row className="test-class">
				<span>Test children</span>
			</Row>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
