
/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as price from '@moderntribe/events/data/blocks/price';
import * as venue from '@moderntribe/events/data/blocks/venue';

[
	price.sagas,
	venue.sagas,
].forEach( sagas => store.run( sagas ) );
