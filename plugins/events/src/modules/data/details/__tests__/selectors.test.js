/**
 * Internal dependencies
 */
import { selectors } from '@@tribe/events/data/details';
import { DEFAULT_STATE } from '@@tribe/events/data/details/reducers/details';

const state = {
	details: {
		20: {
			...DEFAULT_STATE,
			details: {
				id: 20,
				title: 'Modern Tribe',
			},
		},
	},
	forms: {
		byID: {},
		volatile: [ 20 ],
	},
};

describe( '[STORE] - Details selectors', () => {
	const props = { name: 20 };

	it( 'Should return the details blocks', () => {
		expect( selectors.blockSelector( state, { name: 10 } ) ).toEqual( undefined );
		expect( selectors.blockSelector( state, props ) )
			.toEqual( state.details[ '20' ] );
	} );

	it( 'Should return the post type', () => {
		expect( selectors.getPostType( state, props ) ).toEqual( 'tribe_events' );
	} );

	it( 'Should get the loading', () => {
		expect( selectors.getLoading( state, props ) ).toEqual( false );
	} );

	it( 'Should return the details', () => {
		expect( selectors.getDetails( state, props ) ).toEqual( { id: 20, title: 'Modern Tribe' } );
	} );

	it( 'Should return if volatile', () => {
		expect( selectors.getVolatile( state, { name: 10 } ) ).toEqual( false );
		expect( selectors.getVolatile( state, props ) ).toEqual( true );
	} );
} );
