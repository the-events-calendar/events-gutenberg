/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import * as proptypes from '@moderntribe/common/utils/proptypes';

describe( 'Tests for proptypes utils', () => {
	describe( 'createChainableValidator', () => {
		it( 'should not return an error when prop is undefined and is not required', () => {
			const props = {};
			const chainedValidator = jest.fn( proptypes.createChainableValidator( noop ) );
			chainedValidator( props, 'time', 'component' );

			expect( chainedValidator ).toHaveReturned();
			expect( chainedValidator ).toHaveReturnedWith( null );
		} );

		it( 'should return an error when prop is undefined and is required', () => {
			const props = {};
			const chainedValidator = jest.fn( proptypes.createChainableValidator( noop ).isRequired );
			chainedValidator( props, 'time', 'component' );

			expect( chainedValidator ).toHaveReturned();
			expect( chainedValidator ).toHaveReturnedWith( Error( 'The prop `time` is marked as required in `component`, but its value is `undefined`.' ) );
		} );

		it( 'should return an error when prop is null and is required', () => {
			const props = {
				time: null,
			};
			const chainedValidator = jest.fn( proptypes.createChainableValidator( noop ).isRequired );
			chainedValidator( props, 'time', 'component' );

			expect( chainedValidator ).toHaveReturned();
			expect( chainedValidator ).toHaveReturnedWith( Error( 'The prop `time` is marked as required in `component`, but its value is `null`.' ) );
		} );

		it( 'should call the validator when prop is provided, not undefined or null, and is not required', () => {
			const props = {
				time: '15:34',
			};
			const validator = jest.fn( noop );
			const chainedValidator = jest.fn( proptypes.createChainableValidator( validator ) );
			chainedValidator( props, 'time', 'component' );

			expect( validator ).toHaveBeenCalled();
			expect( validator ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'should call the validator when prop is provided, not undefined or null, and is required', () => {
			const props = {
				time: '15:34',
			};
			const validator = jest.fn( noop );
			const chainedValidator = jest.fn( proptypes.createChainableValidator( validator ).isRequired );
			chainedValidator( props, 'time', 'component' );

			expect( validator ).toHaveBeenCalled();
			expect( validator ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'timeFormat', () => {
		it( 'should not return an error when provided proper time formatted string', () => {
			const props = {
				time: '15:34',
			};
			const timeFormat = jest.fn( () => proptypes.timeFormat( props, 'time', 'component' ) );
			timeFormat();

			expect( timeFormat ).toHaveReturned();
			expect( timeFormat ).toHaveReturnedWith( null );
		} );

		it( 'should return an error when not provided a string', () => {
			const props = {
				time: true,
			};
			const timeFormat = jest.fn( () => proptypes.timeFormat( props, 'time', 'component' ) );
			timeFormat();

			expect( timeFormat ).toHaveReturned();
			expect( timeFormat ).toHaveReturnedWith( Error( 'Invalid prop `time` of type `boolean` supplied to `component`, expected `string`.' ) );
		} );

		it( 'should return an error when not provided proper time format', () => {
			const props = {
				time: 'random string',
			};
			const timeFormat = jest.fn( () => proptypes.timeFormat( props, 'time', 'component' ) );
			timeFormat();

			expect( timeFormat ).toHaveReturned();
			expect( timeFormat ).toHaveReturnedWith( Error( 'Invalid prop `time` shape supplied to `component`, expected `hh:mm`.' ) );
		} );
	} );
} );
