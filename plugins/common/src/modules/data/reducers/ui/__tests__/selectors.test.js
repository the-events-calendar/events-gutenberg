/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/common/data/reducers/ui';

const state = {
	ui: {
		accordion: {
			id1: false,
		}
	}
};

const ownProps = { accordionId: 'id1' };

describe( 'UI Selectors', () => {
	it( 'should return the UI state', () => {
		expect( selectors.getUI( state ) ).toMatchSnapshot();
	} );

	it( 'should return the accordion id', () => {
		expect( selectors.getAccordionId( state, ownProps ) ).toMatchSnapshot();
	} );

	it( 'should return the accordion state', () => {
		expect( selectors.getAccordions( state ) ).toMatchSnapshot();
	} );

	it( 'should return the accordion state of accordion id', () => {
		expect( selectors.getAccordionState( state, ownProps ) ).toMatchSnapshot();
	} );
} )
