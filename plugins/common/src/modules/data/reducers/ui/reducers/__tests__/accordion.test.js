/**
 * Internal dependencies
 */
import { accordion as reducer } from '@moderntribe/common/data/reducers/ui/reducers';
import { actions } from '@moderntribe/common/data/reducers/ui';

describe( 'Plugins reducer', () => {
	it( 'Should return the default state', () => {
		expect( reducer( undefined, {} ) ).toMatchSnapshot();
	} );

	it( 'Should add a new accordion id', () => {
		expect( reducer( {}, actions.addAccordion( 'accordion-id' ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should remove an existing accordion id', () => {
		const state = { id: true };
		expect( reducer( state, actions.removeAccordion( 'non-id' ) ) )
			.toMatchSnapshot();
		expect( reducer( state, actions.removeAccordion( 'id' ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should toggle an existing accordion state', () => {
		const state = { id: true };
		expect( reducer( state, actions.toggleAccordion( 'non-id' ) ) )
			.toMatchSnapshot();
		expect( reducer( state, actions.toggleAccordion( 'id' ) ) )
			.toMatchSnapshot();
	} );
} );
