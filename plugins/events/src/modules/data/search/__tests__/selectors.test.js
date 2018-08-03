/**
 * Internal dependencies
 */
import { selectors } from 'data/search';
import { DEFAULT_STATE } from 'data/search/reducers/search';

const state = {
	search: {
		test: DEFAULT_STATE,
	},
};

const props = {
	name: 'test',
};

describe( '[STORE] - Search selectors', () => {
	it( 'Should return search block', () => {
		expect( selectors.blockSelector( state, props ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should return the type of the block', () => {
		expect( selectors.getSearchType( state, props ) ).toEqual( DEFAULT_STATE.type );
	} );

	it( 'Should return the search term', () => {
		expect( selectors.getSearchTerm( state, props ) ).toEqual( DEFAULT_STATE.term );
	} );

	it( 'Should return the loading state', () => {
		expect( selectors.getLoading( state, props ) ).toEqual( DEFAULT_STATE.loading );
	} );

	it( 'Should return the search results', () => {
		expect( selectors.getResults( state, props ) ).toEqual( DEFAULT_STATE.results );
	} );

	it( 'Should return the search page', () => {
		expect( selectors.getPage( state, props ) ).toEqual( DEFAULT_STATE.page );
	} );

	it( 'Should return the total results page', () => {
		expect( selectors.getTotal( state, props ) ).toEqual( DEFAULT_STATE.totalPages );
	} );
} );
