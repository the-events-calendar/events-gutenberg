import { registerBlockType } from '@wordpress/blocks';

import eventDetails from 'blocks/event-details';
import eventVenue from 'blocks/event-venue';
import eventSubtitle from 'blocks/event-subtitle';
import eventLinks from 'blocks/event-links';
import eventPrice from 'blocks/event-price';
import './style.pcss';

const blocks = [
	eventDetails,
	eventVenue,
	eventSubtitle,
	eventLinks,
	eventPrice,
];

blocks.forEach( block => {
	const blockName = `tribe/${ block.id }`;
	registerBlockType( blockName, block );
} );

export default blocks;

