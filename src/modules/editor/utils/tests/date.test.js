import { equalDates } from './../date';

test( 'equalDates', () => {
	expect( equalDates( new Date(), new Date(), new Date(), new Date() ) ).toEqual( true );
	// Falsy tests
	const b = new Date();
	b.setDate( b.getDate() + 1 );
	expect( equalDates( new Date(), b ) ).toEqual( false );
	expect( equalDates( new Date(), new Date(), new Date(), null ) ).toEqual( false );
	expect( equalDates( null, new Date() ) ).toEqual( false );
	expect( equalDates() ).toEqual( false );
} );