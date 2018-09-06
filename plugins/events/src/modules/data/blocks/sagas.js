
/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as price from '@moderntribe/events/data/blocks/price';

[
	price.sagas,
].forEach( sagas => store.run( sagas ) );
