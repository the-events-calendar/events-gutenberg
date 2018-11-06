/**
 * External Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import { initStore } from '@moderntribe/events-pro/data';
import { addAdditionalFields } from '@moderntribe/events-pro/blocks/additional-fields/utils';

const blocks = addAdditionalFields( [] );

blocks.forEach( block => {
	const blockName = `tribe/${ block.id }`;
	registerBlockType( blockName, block );
} );

initStore();
