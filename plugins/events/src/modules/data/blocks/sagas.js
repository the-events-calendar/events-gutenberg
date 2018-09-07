
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
import * as sharing from '@moderntribe/events/data/blocks/sharing';

[
	price.sagas,
	venue.sagas,
	website.sagas,
	sharing.sagas,
].forEach( sagas => store.run( sagas ) );
