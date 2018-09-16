/**
 * External dependencies
 */
import renderer from 'react-test-renderer';
import React from 'react';

/**
 * Internal dependencies
 */
import DisabledTickets from './../element';

// Mock to overwrite the default SVG icons mock
jest.mock( '@moderntribe/tickets/icons', () => ( {
	TicketInactive: () => <span>Ticket Inactive - Icon Placeholder</span>,
} ) );

describe( 'Disabled Tickets', () => {
	it( 'render the component', () => {
		const tree = renderer.create( <DisabledTickets /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'render the component with title', () => {
		const tree = renderer.create( <DisabledTickets title={ 'Custom Title' }/> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'render the component with description', () => {
		const tree = renderer.create( <DisabledTickets>Custom Description</DisabledTickets> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );

	it( 'uses a custom icon', () => {
		const Icon = () => <span>Icon Placeholder</span>;
		const tree = renderer.create( <DisabledTickets icon={ <Icon /> } /> );
		expect( tree.toJSON() ).toMatchSnapshot();
	} );
} );
