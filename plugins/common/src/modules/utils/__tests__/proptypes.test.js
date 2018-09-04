/**
 * Internal dependencies
 */
import * as proptypes from '@moderntribe/common/utils/proptypes';

describe( 'Tests for proptypes utils', () => {
	it( 'should not throw an error when provided proper time formatted string', () => {
		const props = {
			time: '15:34',
		};
		const timeFormat = jest.fn( () => proptypes.timeFormat( props, 'time', 'component' ) );
		timeFormat();

		expect( timeFormat ).toHaveReturned();
		expect( timeFormat ).toHaveReturnedWith( null );
	} );

	it( 'should throw an error when not provided a string', () => {
		const props = {
			time: true,
		};
		const timeFormat = jest.fn( () => proptypes.timeFormat( props, 'time', 'component' ) );
		timeFormat();

		expect( timeFormat ).toHaveReturned();
		expect( timeFormat ).toHaveReturnedWith( Error( "Warning: Invalid prop 'time' of type 'boolean' supplied to 'component', expected 'string'." ) );
	} );

	it( 'should throw an error when not provided proper time format', () => {
		const props = {
			time: 'random string',
		};
		const timeFormat = jest.fn( () => proptypes.timeFormat( props, 'time', 'component' ) );
		timeFormat();

		expect( timeFormat ).toHaveReturned();
		expect( timeFormat ).toHaveReturnedWith( Error( "Warning: Invalid format for prop 'time' supplied to 'component', expected time format 'hh:mm'." ) );
	} );
} );
