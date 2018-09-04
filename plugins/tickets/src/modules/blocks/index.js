/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { initStore } from '@moderntribe/tickets/data';
import tickets from '@moderntribe/tickets/blocks/tickets';

const blocks = [
	tickets,
];

blocks.forEach( ( block ) => registerBlockType( `tribe/${ block.id }`, block ) );

// Initialize AFTER blocks are registered
// to avoid plugin shown as available in reducer
// but not having block available for use
initStore();

export default blocks;
