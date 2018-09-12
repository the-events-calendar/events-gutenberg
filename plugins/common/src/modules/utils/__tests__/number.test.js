/**
 * Internal dependencies
 */
import { percentage } from '@moderntribe/common/utils/number';

describe( 'percentage', () => {
	test( 'with default values', () => {
		expect( percentage() ).toBe( 0 );
	} );

	test( 'with non numbers', () => {
		expect( percentage( 'modern', 'tribe' ) ).toBe( 0 ) ;
	} );

	test( 'limits outside 100 percent', () => {
		expect( percentage( 120, 100 ) ).toBe( 100 );
		expect( percentage( 1220, 100 ) ).toBe( 100 );
		expect( percentage( 101, 100 ) ).toBe( 100 );
		expect( percentage( 100, 100 ) ).toBe( 100 );
	} );

	test( 'common cases', () => {
		expect( percentage( 10, 100 ) ).toBe( 10 );
		expect( percentage( 17, 100 ) ).toBe( 17 );
		expect( percentage( 17, 1000 ) ).toBe( 1 );
		expect( percentage( 155, 1000 ) ).toBe( 15 );
		expect( percentage( 999, 1000 ) ).toBe( 99 );
		expect( percentage( 1000, 1000 ) ).toBe( 100 );
	} );
} );
