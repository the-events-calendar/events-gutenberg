/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { ActionButton } from '@moderntribe/tickets/elements';
import { Button } from '@moderntribe/common/elements';

describe( 'ActionButton', () => {
	test( 'component rendered', () => {
		const component = renderer.create( <ActionButton>Custom Action</ActionButton> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'component has class', () => {
		const component = mount( <ActionButton>Custom Action</ActionButton> );
		const button = component.find( Button );
		expect( button.hasClass( 'tribe-editor__tickets-btn--action' ) ).toBe( true );
	} );
} );
