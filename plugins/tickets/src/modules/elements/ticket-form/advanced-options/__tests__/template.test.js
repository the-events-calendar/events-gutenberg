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
		const onClick = jest.fn();
		const component = renderer.create(
			<AdvancedOptions
				accordionId="ticketsPlaceholder"
				contentId="ticketsPlaceholder"
				headerId="ticketsPlaceholder"
				isActive={ false }
				onClick={ onClick }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
