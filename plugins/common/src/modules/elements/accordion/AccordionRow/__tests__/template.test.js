/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import AccordionRow from '@moderntribe/common/elements/accordion/AccordionRow/template';

let row;

describe( 'Accordion Row Element', () => {
	beforeEach( () => {
		row = {
			accordionId: '123',
			content: 'this is a content',
			contentClassName: 'content-class',
			header: 'this is header',
			headerClassName: 'header-class',
			onClick: jest.fn(),
			onClose: jest.fn(),
			onOpen: jest.fn(),
		};
	} );

	it( 'renders an accordion row', () => {
		const component = renderer.create( <AccordionRow { ...row } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'executes onClick handler', () => {
		const component = mount( <AccordionRow { ...row } /> );
		component.find( 'button' ).simulate( 'click' );
		expect( row.onClick ).toHaveBeenCalled();
		expect( row.onClick ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'executes onOpen and onClose handlers', ( done ) => {
		const component = mount( <AccordionRow { ...row } /> );
		component.find( 'button' ).simulate( 'click' );
		setTimeout( () => {
			component.find( 'button' ).simulate( 'click' );
		}, 250 );
		setTimeout( () => {
			expect( row.onOpen ).toHaveBeenCalled();
			expect( row.onOpen ).toHaveBeenCalledTimes( 1 );
			expect( row.onClose ).toHaveBeenCalled();
			expect( row.onClose ).toHaveBeenCalledTimes( 1 );
			expect( row.onClick ).toHaveBeenCalled();
			expect( row.onClick ).toHaveBeenCalledTimes( 2 );
			done();
		}, 500 );
	} );
} );
