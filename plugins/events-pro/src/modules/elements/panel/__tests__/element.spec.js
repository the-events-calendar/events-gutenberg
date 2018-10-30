import React from 'react';
import renderer from 'react-test-renderer';
import Panel from '../element';

describe( 'Panel', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<Panel
				count={ 2 }
				isExpanded={ false }
				onHeaderClick={ jest.fn() }
				panelTitle="Panel title"
			>
				<span>Test children</span>
			</Panel>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should display children', () => {
		const component = renderer.create(
			<Panel
				count={ 2 }
				isExpanded={ true }
				onHeaderClick={ jest.fn() }
				panelTitle="Panel title"
			>
				<span>Test children</span>
			</Panel>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
