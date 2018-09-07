
/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as price from '@moderntribe/events/data/blocks/price';
import * as venue from '@moderntribe/events/data/blocks/venue';
import * as website from '@moderntribe/events/data/blocks/website';

[
	price.sagas,
	venue.sagas,
	website.sagas,
].forEach( sagas => store.run( sagas ) );
