/**
 * Internal dependencies
 */
import reducer, { actions } from 'data/search';
import { DEFAULT_STATE } from 'data/search/reducer'

describe( '[STORE] - search reducer', () => {
	it( 'Should return default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( {} );
	} );

	it( 'Should add a new block', () => {
		expect( reducer( {}, actions.addBlock( 'events' ) ) ).toEqual( { events: DEFAULT_STATE } );
	} );

	it( 'Should clear the block to the initial state keeping only the post type', () => {
		const mockState = {
			events: {
				...DEFAULT_STATE,
				results: [ 1, 2, 3 ],
				type: 'tribe_events',
				isLoading: true,
			},
		};
		expect( reducer( mockState, actions.clearBlock( 'events' ) ) ).toMatchSnapshot();
	} );

	it( 'Should set the search term', () => {
		const mockState = {
			events: DEFAULT_STATE,
		};
		expect( reducer( mockState, actions.setTerm( 'events', 'Modern Tribe' ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should set the results', () => {
		const mockState = {
			events: DEFAULT_STATE,
		};
		expect( reducer( mockState, actions.setResults( 'events', [ 1, 2, 3 ] ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should add the results', () => {
		const mockState = {
			events: {
				...DEFAULT_STATE,
				results: [ 1, 2, 3 ],
			},
		};
		expect( reducer( mockState, actions.addResults( 'events', [ 4, 5, 6 ] ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should set the page', () => {
		const mockState = {
			events: DEFAULT_STATE,
		};
		expect( reducer( mockState, actions.setPage( 'events', 2 ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should set the total pages', () => {
		const mockState = {
			events: DEFAULT_STATE,
		};
		expect( reducer( mockState, actions.setTotalPages( 'events', 10 ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should enable loading', () => {
		const mockState = {
			events: DEFAULT_STATE,
		};
		expect( reducer( mockState, actions.enableSearchIsLoading( 'events' ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should disable loading', () => {
		const mockState = {
			events: DEFAULT_STATE,
			isLoading: true,
		};
		expect( reducer( mockState, actions.disableSearchIsLoading( 'events' ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should set the post type', () => {
		const mockState = {
			events: DEFAULT_STATE,
		};
		expect( reducer( mockState, actions.setSearchPostType( 'events', 'tribe_organizer' ) ) )
			.toMatchSnapshot();
	} );
} );
