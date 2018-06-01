import { registerBlockType } from '@wordpress/blocks';

import classicEventDetails from 'blocks/classic-event-details';

import eventDateTime from 'blocks/event-datetime';
import eventVenue from 'blocks/event-venue';
import eventOrganizer from 'blocks/event-organizer';
import eventLinks from 'blocks/event-links';
import eventPrice from 'blocks/event-price';
import eventCategory from 'blocks/event-category';
import eventTags from 'blocks/event-tags';
import eventWebsite from 'blocks/event-website';

import './style.pcss';

const blocks = [
	classicEventDetails,

	eventDateTime,
	eventVenue,
	eventOrganizer,
	eventLinks,
	eventPrice,
	eventCategory,
	eventTags,
	eventWebsite,
];

blocks.forEach( block => {
	const blockName = `tribe/${ block.id }`;
	registerBlockType( blockName, block );
} );

export default blocks;

