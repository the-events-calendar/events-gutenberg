/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import {
	default as AccordionRow,
	getHeaderAttrs,
	getContentAttrs,
} from '@moderntribe/common/elements/accordion/AccordionRow/template';

let row;

describe( 'Accordion Row Element', () => {
	beforeEach( () => {
		row = {
			accordionId: '123',
			content: 'this is a content',
			contentClassName: 'content-class',
			contentId: 'content-id-1',
			header: 'this is header',
			headerClassName: 'header-class',
			headerId: 'header-id-1',
			onClick: jest.fn(),
			onClose: jest.fn(),
			onOpen: jest.fn(),
		};
	} );

	describe( 'AccordionRow', () => {
		it( 'renders an accordion row', () => {
			const component = renderer.create( <AccordionRow { ...row } /> );
			expect( component.toJSON() ).toMatchSnapshot();
		} );

		it( 'renders an accordion row with inactive state', () => {
			row.isActive = false;
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
} );
