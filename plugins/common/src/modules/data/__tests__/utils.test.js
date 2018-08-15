/**
 * Internal dependencies
 */
import {
	PREFIX,
	withPrefix,
} from '@moderntribe/common/data/utils';

describe( 'prefix', () => {
	it( 'Should return the prefix', () => {
		expect( PREFIX ).toBe('@@MT/COMMON');
	} );
} );

describe( 'withPrefix', () => {
	it( 'Should generate an unknown action', () => {
		expect( withPrefix() ).toBe( '@@MT/COMMON/UNKNOWN' );
	} );

	it( 'Should generate an action name', () => {
		expect( withPrefix( 'MY_ACTION_NAME' ) ).toBe('@@MT/COMMON/MY_ACTION_NAME' );
	} );
} );
