/**
 * External dependencies
 */
import renderer from 'react-test-renderer';
import React from 'react';

/**
 * Internal dependencies
 */
import InactiveBlock from './../element';

describe( 'Disabled Tickets', () => {
	it( 'renders the component', () => {
		const tree = renderer.create( <InactiveBlock /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with classes', () => {
		const tree = renderer.create( <InactiveBlock className="custom-class" /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with title', () => {
		const tree = renderer.create( <InactiveBlock title="Custom Title" /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with description', () => {
		const tree = renderer.create( <InactiveBlock description="Custom Description" /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with a custom icon', () => {
		const Icon = () => <span>Icon Placeholder</span>;
		const tree = renderer.create( <InactiveBlock icon={ <Icon /> } /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );
} );
