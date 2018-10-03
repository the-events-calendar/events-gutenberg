/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

const blocks = [];

blocks.forEach( ( block ) => registerBlockType( `tribe/${ block.id }`, block ) );

export default blocks;
