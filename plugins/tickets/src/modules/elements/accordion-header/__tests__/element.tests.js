/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { AccordionHeader } from '@moderntribe/tickets/elements';

describe( '<AccordionHeader />', () => {
	test( 'Inactive with title', () => {
		const component = renderer.create(
			<AccordionHeader title="Modern Tribe" active={ false } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'Active with title', () => {
		const component = renderer.create(
			<AccordionHeader title="Modern Tribe" active={ true } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
