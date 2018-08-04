/**
 * Internal dependencies
 */
import { maybeDispatch } from '@@plugins/events/data/utils';

const dispatch = jest.fn();
const action = jest.fn();

describe( 'Data utils maybeDispatch', () => {
	afterEach( () => {
		dispatch.mockClear();
		action.mockClear();
	} );

	test( 'Dispatch an action when attribute is present', () => {
		const attributes = {
			title: 'Modern tribe',
		};
		maybeDispatch( attributes, dispatch )( action, 'title' );
		expect( dispatch ).toHaveBeenCalled();
		expect( dispatch ).toHaveBeenCalledTimes( 1 );
		expect( dispatch ).toHaveBeenCalledWith( action( attributes.title ) );
	} );

	test( 'Action being fired when attribute is present', () => {
		const attributes = {
			title: 'Modern tribe',
		};
		maybeDispatch( attributes, dispatch )( action, 'title' );
		expect( action ).toHaveBeenCalled();
		expect( action ).toHaveBeenCalledTimes( 1 );
		expect( action ).toHaveBeenCalledWith( attributes.title );
	} );

	test( 'Action fired with default value when value is `empty`', () => {
		maybeDispatch( { title: '' }, dispatch )( action, 'title', 'default' );
		expect( action ).toHaveBeenCalledWith( 'default' );
		expect( action ).toHaveBeenCalled();
		expect( action ).toHaveBeenCalledTimes( 1 );
	} );

	test( 'Action fired with default value when value is `false`', () => {
		maybeDispatch( { title: false }, dispatch )( action, 'title', 'default' );
		expect( action ).toHaveBeenCalledWith( 'default' );
		expect( action ).toHaveBeenCalled();
		expect( action ).toHaveBeenCalledTimes( 1 );
	} );

	test( 'Action fired with default value when value is `undefined`', () => {
		maybeDispatch( { title: undefined }, dispatch )( action, 'title', 'default' );
		expect( action ).toHaveBeenCalledWith( 'default' );
		expect( action ).toHaveBeenCalled();
		expect( action ).toHaveBeenCalledTimes( 1 );
	} );

	test( 'Action fired with default value when value is `0`', () => {
		maybeDispatch( { title: 0 }, dispatch )( action, 'title', 'default' );
		expect( action ).toHaveBeenCalledWith( 'default' );
		expect( action ).toHaveBeenCalled();
		expect( action ).toHaveBeenCalledTimes( 1 );
	} );

	test( 'Action not executed when attribute is not present', () => {
		maybeDispatch( {}, dispatch )( action, 'title' );
		expect( dispatch ).not.toHaveBeenCalled();
		expect( action ).not.toHaveBeenCalled();
	} );
} );
