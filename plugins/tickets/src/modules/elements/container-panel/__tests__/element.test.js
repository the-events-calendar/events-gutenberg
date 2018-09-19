/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { ContainerPanel } from '@moderntribe/tickets/elements';

describe( 'Container Panel Element', () => {
	it( 'renders container panel', () => {
		const component = renderer.create( <ContainerPanel /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel with left and right sections', () => {
		const props = {
			leftSection: 'left section',
			rightSectionHeader: 'right section header',
			rightSectionContent: 'right section content',
		};
		const component = renderer.create( <ContainerPanel { ...props } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel with classes', () => {
		const props = {
			className: 'test-class-name',
			leftSection: 'left section',
			rightSectionHeader: 'right section header',
			rightSectionContent: 'right section content',
		};
		const component = renderer.create( <ContainerPanel { ...props } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders container panel with right section content', () => {
		const props = {
			leftSection: 'left section',
			rightSectionHeader: 'right section header',
			rightSectionContent: 'right section content',
			showContent: true,
		};
		const component = renderer.create( <ContainerPanel { ...props } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
