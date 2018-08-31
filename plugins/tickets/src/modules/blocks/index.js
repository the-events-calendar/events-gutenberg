/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import tickets from '@moderntribe/tickets/blocks/tickets';

const blocks = [
	tickets,
];

blocks.forEach( ( block ) => registerBlockType( `tribe/${ block.id }`, block ) );

export default blocks;
