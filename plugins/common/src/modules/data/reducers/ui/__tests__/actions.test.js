/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/common/data/reducers/ui';

describe( 'Accordion actions', () => {
	test( 'Add Accordion', () => {
		expect( actions.addAccordion( 'accordion-id' ) ).toMatchSnapshot();
	} );

	test( 'Remove Accordion', () => {
		expect( actions.removeAccordion( 'accordion-id' ) ).toMatchSnapshot();
	} );

	test( 'Remove Accordion', () => {
		expect( actions.toggleAccordion( 'accordion-id' ) ).toMatchSnapshot();
	} );
} );
