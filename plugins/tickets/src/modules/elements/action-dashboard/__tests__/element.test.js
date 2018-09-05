/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { ActionDashboard } from '@moderntribe/tickets/elements';

describe( 'Action Dashboard Element', () => {
	it( 'renders action dashboard', () => {
		const component = renderer.create( <ActionDashboard /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with actions', () => {
		const actions = [ 'test-1', 'test-2' ];
		const component = renderer.create( <ActionDashboard actions={ actions } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with cancel label', () => {
		const component = renderer.create( <ActionDashboard cancelLabel="Cancel" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with class', () => {
		const component = renderer.create( <ActionDashboard className="test-class" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with confirm label', () => {
		const component = renderer.create( <ActionDashboard confirmLabel="Confirm" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with cancel button disabled', () => {
		const component = renderer.create( <ActionDashboard isCancelDisabled={ true } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with confirm button disabled', () => {
		const component = renderer.create( <ActionDashboard isConfirmDisabled={ true } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with cancel click handler', () => {
		const onClick = jest.fn();
		const component = renderer.create( <ActionDashboard onCancelClick={ onClick } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with confirm click handler', () => {
		const onClick = jest.fn();
		const component = renderer.create( <ActionDashboard onConfirmClick={ onClick } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with cancel button hidden', () => {
		const component = renderer.create( <ActionDashboard showCancel={ false } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders action dashboard with confirm button hidden', () => {
		const component = renderer.create( <ActionDashboard showConfirm={ false } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
