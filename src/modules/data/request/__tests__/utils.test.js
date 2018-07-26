/**
 * Internal dependencies
 */
import { utils } from 'data/request';

const wpParamsExpected = {
	orderby: 'title',
	status: [ 'draft', 'publish' ],
	order: 'asc',
	page: 1,
};

describe( 'Request utils', () => {
	it( 'Should generate the WP params', () => {
		expect( utils.toWpParams( {} ) ).toEqual( wpParamsExpected );
	} );

	it( 'Should order by relevance if has search', () => {
		expect( utils.toWpParams( { search: 'tribe' } ) )
			.toEqual( {
				...wpParamsExpected,
				search: 'tribe',
				orderby: 'relevance',
			} );
	} );

	it( 'Should update the exclude parameter', () => {
		expect( utils.toWpParams( { exclude: [] } ) ).toEqual( wpParamsExpected );
		expect( utils.toWpParams( { exclude: [ 1, 2 ] } ) )
			.toEqual( {
				...wpParamsExpected,
				exclude: [ 1, 2 ],
			} );
	} );

	it( 'Should generate a WP Query', () => {
		expect( utils.toWPQuery() ).toBe( 'orderby=title&status=draft%2Cpublish&order=asc&page=1' );
		expect( utils.toWPQuery( { search: 'Modern Tribe' } ) )
			.toBe( 'orderby=relevance&status=draft%2Cpublish&order=asc&page=1&search=Modern%20Tribe' );
	} );

	it( 'Should return the total of pages', () => {
		expect( utils.getTotalPages( { 'x-wp-totalpages': 5 } ) ).toBe( 5 );
		expect( utils.getTotalPages( { 'x-wp-totalpages': '5' } ) ).toBe( 5 );
		expect( utils.getTotalPages( { 'x-wp-totalpages': '5.3' } ) ).toBe( 5 );
		expect( utils.getTotalPages( { 'x-wp': 5 } ) ).toBe( 0 );
		expect( utils.getTotalPages( {} ) ).toBe( 0 );
	} );
} );
