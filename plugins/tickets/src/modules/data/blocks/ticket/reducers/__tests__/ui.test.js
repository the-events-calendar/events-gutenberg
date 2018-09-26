/**
 * Internal dependencies
 */
import ui, { DEFAULT_STATE } from '../ui';
import { actions } from '@moderntribe/tickets/data/blocks/ticket';
import temp from '../temp';

jest.mock( '../temp', () => ( {
	__esModule: true,
	default: jest.fn(),
} ) );

describe( 'UI reducer', () => {
	test( 'default state', () => {
		expect( ui( undefined, {} ) ).toBe( DEFAULT_STATE );
	} );

	test( 'Shared capacity', () => {
		expect( ui( DEFAULT_STATE, actions.setTotalSharedCapacity( 50 ) ) ).toMatchSnapshot();
	} );

	test( 'Header image', () => {
		expect( ui( DEFAULT_STATE, actions.setHeader( { id: 100 } ) ) ).toMatchSnapshot();
		expect( ui( DEFAULT_STATE, actions.setHeader( null ) ) ).toMatchSnapshot();
	} );

	test( 'Settings Open', () => {
		expect( ui( DEFAULT_STATE, actions.setSettingsOpen( true ) ) ).toMatchSnapshot();
		expect( ui( DEFAULT_STATE, actions.setSettingsOpen( false ) ) ).toMatchSnapshot();
	} );

	test( 'Is Parent Block selected', () => {
		expect( ui( DEFAULT_STATE, actions.setParentBlockSelected( true ) ) ).toMatchSnapshot();
		expect( ui( DEFAULT_STATE, actions.setParentBlockSelected( false ) ) ).toMatchSnapshot();
	} );

	test( 'Is Child block selected', () => {
		expect( ui( DEFAULT_STATE, actions.setChildBlockSelected( true ) ) ).toMatchSnapshot();
		expect( ui( DEFAULT_STATE, actions.setChildBlockSelected( false ) ) ).toMatchSnapshot();
	} );

	test( 'Is Active Child block', () => {
		expect( ui( DEFAULT_STATE, actions.setActiveChildBlockId( 'modern-tribe' ) ) )
			.toMatchSnapshot();
	} );

	test( 'Tmp actions are passed down to the reducer', () => {
		ui( DEFAULT_STATE, actions.setTempSharedCapacity( 100 ) );
		expect( temp ).toHaveBeenCalledTimes( 1 );
		expect( temp ).toHaveBeenCalledWith( DEFAULT_STATE.tmp, actions.setTempSharedCapacity( 100 ) );
	} );
} );
