import { registerBlockType } from '@wordpress/blocks';

import classicEventDetails from '@@tribe/events/blocks/classic-event-details';

import eventDateTime from '@@tribe/events/blocks/event-datetime';
import eventVenue from '@@tribe/events/blocks/event-venue';
import eventOrganizer from '@@tribe/events/blocks/event-organizer';
import eventLinks from '@@tribe/events/blocks/event-links';
import eventPrice from '@@tribe/events/blocks/event-price';
import eventCategory from '@@tribe/events/blocks/event-category';
import eventTags from '@@tribe/events/blocks/event-tags';
import eventWebsite from '@@tribe/events/blocks/event-website';
import FeaturedImage from '@@tribe/events/blocks/featured-image';
import { initStore } from '@@tribe/events/data';

import './style.pcss';

initStore();

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
	FeaturedImage,
];

blocks.forEach( block => {
	const blockName = `tribe/${ block.id }`;
	registerBlockType( blockName, block );
} );

export default blocks;

