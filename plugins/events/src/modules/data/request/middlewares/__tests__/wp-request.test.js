/**
 * Internal dependencies
 */
import { actions, middlewares } from 'data/request';

let create;
const nextMock = jest.fn();
const meta = {
	path: '',
	params: {},
	actions: {
		none: jest.fn(),
		start: jest.fn(),
		success: jest.fn(),
		error: jest.fn(),
	},
};

const xhr = {
	getAllResponseHeaders: jest.fn( () => '' ),
};

describe( '[STORE] - wp-request middleware', () => {
	beforeAll( () => {
		create = () => {
			const invoke = ( action ) => middlewares.wpRequest()( nextMock )( action );
			return { next: nextMock, invoke };
		};
	} );

	afterEach( () => {
		nextMock.mockClear();
		meta.actions.start.mockClear();
		meta.actions.error.mockClear();
		meta.actions.none.mockClear();
		meta.actions.success.mockClear();
		xhr.getAllResponseHeaders.mockClear();
		window.wp.apiRequest = undefined;
	} );

	it( 'Should move through a unknown action', () => {
		const { next, invoke } = create();
		const action = { type: 'UNKNOWN' };
		invoke( action );

		expect( next ).toHaveBeenCalled();
		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
	} );

	it( 'Should execute the none action if the path is empty', () => {
		const { next, invoke } = create();
		const action = actions.wpRequest( meta );
		invoke( action );

		expect( next ).toHaveBeenCalled();
		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( meta.actions.none ).toHaveBeenCalled();
		expect( meta.actions.none ).toHaveBeenCalledTimes( 1 );
		expect( meta.actions.none ).toHaveBeenLastCalledWith( meta.path );
		expect( meta.actions.start ).not.toHaveBeenCalled();
		expect( meta.actions.success ).not.toHaveBeenCalled();
		// expect( xhr.getAllResponseHeaders ).not.toHaveBeenCalled();
		expect( meta.actions.error ).not.toHaveBeenCalled();
	} );

	it( 'Should execute the correct actions on success', async () => {
		const { invoke } = create();

		const body = {
			id: 1217,
			date: '2018-05-26T23:07:05',
			meta: {},
		};
		window.wp.apiRequest = () => {
			const $ajax = window.$.Deferred();
			$ajax.resolve( body, 'success', xhr );
			return $ajax.promise();
		};
		await invoke( actions.wpRequest( { ...meta, path: 'tribe_organizer/1217' } ) );

		expect.assertions( 10 );
		expect( meta.actions.none ).not.toHaveBeenCalled();
		expect( meta.actions.error ).not.toHaveBeenCalled();
		expect( meta.actions.start ).toHaveBeenCalledWith( '/wp/v2/tribe_organizer/1217', {} );
		expect( meta.actions.start ).toHaveBeenCalled();
		expect( meta.actions.start ).toHaveBeenCalledTimes( 1 );
		expect( meta.actions.success ).toHaveBeenCalled();
		expect( meta.actions.success )
			.toHaveBeenCalledWith( { body, headers: {}, status: 'success', xhr } );
		expect( meta.actions.success ).toHaveBeenCalledTimes( 1 );
		expect( xhr.getAllResponseHeaders ).toHaveBeenCalled();
		expect( xhr.getAllResponseHeaders ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'Should execute the correct actions on failure', async () => {
		const { invoke } = create();

		window.wp.apiRequest = () => {
			const $ajax = window.$.Deferred();
			$ajax.reject( 'Wrong path' );
			return $ajax.promise();
		};

		try {
			await invoke( actions.wpRequest( { ...meta, path: 'tribe_organizer/1217//////' } ) );
		} catch ( error ) {}

		expect.assertions( 7 );
		expect( meta.actions.none ).not.toHaveBeenCalled();
		expect( meta.actions.success ).not.toHaveBeenCalled();
		expect( xhr.getAllResponseHeaders ).not.toHaveBeenCalled();
		expect( meta.actions.start ).toHaveBeenCalled();
		expect( meta.actions.start ).toHaveBeenCalledWith( '/wp/v2/tribe_organizer/1217//////', {} );
		expect( meta.actions.error ).toHaveBeenCalled();
		expect( meta.actions.error ).toHaveBeenCalledWith( 'Wrong path' );
	} );
} );
