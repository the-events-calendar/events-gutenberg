/**
 * Internal dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import AdvancedOptions from '../template';

describe( 'AdvancedOptions', () => {
	test( 'default props of and state of <AdvancedOptions />', () => {
		const component = renderer.create( <AdvancedOptions /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
