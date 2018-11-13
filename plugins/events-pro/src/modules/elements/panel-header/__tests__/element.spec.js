import React from 'react';
import renderer from 'react-test-renderer';
import PanelHeader from '../element';

describe( 'PanelHeader', () => {
	test( 'should render component with count', () => {
		const component = renderer.create(
			<PanelHeader
				count={ 2 }
				isExpanded={ false }
				onClick={ jest.fn() }
			>
				<span>Test children</span>
			</PanelHeader>
			);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render component without count', () => {
		const component = renderer.create(
			<PanelHeader
				count={ 2 }
				isExpanded={ true }
				onClick={ jest.fn() }
			>
				<span>Test children</span>
			</PanelHeader>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render component without count when count is 0', () => {
		const component = renderer.create(
			<PanelHeader
				count={ 0 }
				isExpanded={ false }
				onClick={ jest.fn() }
			>
				<span>Test children</span>
			</PanelHeader>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
