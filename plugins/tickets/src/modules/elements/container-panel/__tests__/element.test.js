/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ContainerPanel, { RSVP, TICKET } from '@moderntribe/tickets/elements/container-panel/element';

describe( 'Container Panel Element', () => {
	it( 'renders container panel', () => {
		const component = renderer.create( <ContainerPanel /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel in rsvp layout', () => {
		const component = renderer.create( <ContainerPanel layout={ RSVP } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel in ticket layout', () => {
		const component = renderer.create( <ContainerPanel layout={ TICKET } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel with icon, header, and content', () => {
		const props = {
			icon: 'icon',
			header: 'header',
			content: 'content',
		};
		const component = renderer.create( <ContainerPanel { ...props } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel with classes', () => {
		const props = {
			className: 'test-class-name',
		};
		const component = renderer.create( <ContainerPanel { ...props } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
