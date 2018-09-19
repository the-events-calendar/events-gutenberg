/**
 * Internal dependencies
 */
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';
import { DEFAULT_STATE } from '@moderntribe/tickets/data/blocks/ticket/reducer';

const state = {
	tickets: {
		blocks: {
			ticket: DEFAULT_STATE,
		},
	},
};

const image = {
	id: 4961,
	title: 'aircraft-1362586_1920',
	filename: 'aircraft-1362586_1920.jpg',
	url: 'http://gutenberg.local/wp-content/uploads/2018/09/aircraft-1362586_1920.jpg',
	link: 'http://gutenberg.local/event/tickets-here/aircraft-1362586_1920/',
	sizes: {
		full: {
			url: 'http://gutenberg.local/wp-content/uploads/2018/09/aircraft-1362586_1920.jpg',
			height: 1211,
			width: 1920,
			orientation: 'landscape'
		},
		large: {
			height: 331,
			width: 525,
			url: 'http://gutenberg.local/wp-content/uploads/2018/09/aircraft-1362586_1920-1024x646.jpg',
			orientation: 'landscape',
		},
		medium: {
			height: 189,
			width: 300,
			url: 'http://gutenberg.local/wp-content/uploads/2018/09/aircraft-1362586_1920-300x189.jpg',
			orientation: 'landscape',
		},
		thumbnail: {
			height: 150,
			width: 150,
			url: 'http://gutenberg.local/wp-content/uploads/2018/09/aircraft-1362586_1920-150x150.jpg',
			orientation: 'landscape',
		},
	}
};

describe( 'Ticket blocks selectors', () => {
	describe( 'Header image', () => {
		test( 'Select default image', () => {
			expect( selectors.getHeader( state ) ).toBe( null );
		} );

		test( 'Select set image', () => {
			const newState = {
				tickets: {
					blocks: {
						ticket: {
							...DEFAULT_STATE,
							header: image,
						},
					},
				},
			};
			expect( selectors.getHeader( newState ) ).toEqual( image );
		} );

		test( 'Select image id', () => {
			const newState = {
				tickets: {
					blocks: {
						ticket: {
							...DEFAULT_STATE,
							header: image,
						},
					},
				},
			};
			expect( selectors.getImageID( state ) ).toBe( null );
			expect( selectors.getImageID( newState ) ).toBe( 4961 );
		} );

		test( 'Select image size', () => {
			const newState = {
				tickets: {
					blocks: {
						ticket: {
							...DEFAULT_STATE,
							header: image,
						},
					},
				},
			};
			expect( selectors.getHeaderSize( newState, { size: 'large' } ) ).toEqual( image.sizes.large );
			expect( selectors.getHeaderSize( newState, { size: 'unknown' } ) ).toBe( null );
		} );
	} );

	describe( 'Shared capacity', () => {
		test( 'Select shared capacity', () => {
			expect( selectors.getSharedCapacity( state ) ).toBe( 0 );
		} );

		test( 'Select shared capacity after being set', () => {
			const newState = {
				tickets: {
					blocks: {
						ticket: {
							...DEFAULT_STATE,
							sharedCapacity: 99,
						},
					},
				},
			};
			expect( selectors.getSharedCapacity( newState ) ).toBe( 99 );
		} );
	} );
} );
