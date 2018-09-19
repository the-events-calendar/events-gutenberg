/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import InactiveBlock, { RSVP, TICKET } from './../element';

describe( 'Disabled Tickets', () => {
	it( 'renders the component as rsvp layout', () => {
		const tree = renderer.create( <InactiveBlock layout={ RSVP } /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component as ticket layout', () => {
		const tree = renderer.create( <InactiveBlock layout={ TICKET } /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with classes', () => {
		const tree = renderer.create( <InactiveBlock layout={ RSVP } className="custom-class" /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with title', () => {
		const tree = renderer.create( <InactiveBlock layout={ RSVP } title="Custom Title" /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with description', () => {
		const tree = renderer.create( <InactiveBlock layout={ RSVP } description="Custom Description" /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders the component with a custom icon', () => {
		const Icon = () => <span>Icon Placeholder</span>;
		const tree = renderer.create( <InactiveBlock layout={ RSVP } icon={ <Icon /> } /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );
} );
