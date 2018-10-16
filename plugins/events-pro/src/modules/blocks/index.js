/**
 * External Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import additionalFields from '@moderntribe/events-pro/blocks/additional-fields';
import { initStore } from '@moderntribe/events-pro/data';

const blocks = [
	additionalFields,
];

blocks.forEach( block => {
	const blockName = `tribe/${ block.id }`;
	registerBlockType( blockName, block );
} );

initStore();
