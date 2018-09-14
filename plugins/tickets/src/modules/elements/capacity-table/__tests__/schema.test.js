import { getValues } from './../schema';

describe( 'getValues', () => {
	it( 'default values on empty items', () => {
		expect( getValues( [] ) ).toEqual( { names: [], total: 0 } );
	} );

	it( 'name list and total', () => {
		const items = [
			{ name: 'VIP', quantity: 10 },
			{ name: 'Early Bird', quantity: 22 },
			{ name: 'Floor', quantity: 8 },
		];
		const expected = {
			names: [ 'VIP', 'Early Bird', 'Floor' ],
			total: 40,
		};
		expect( getValues( items ) ).toEqual( expected );
	} );

	it( 'items with invalid schema', () => {
		const items = [
			{ name: '', total: 10 },
			{ name: '', amount: 22 },
			{ name: '', remaining: 8 },
		];
		const expected = {
			names: [],
			total: 0,
		};
		expect( getValues( items ) ).toEqual( expected );
	} );
} );
