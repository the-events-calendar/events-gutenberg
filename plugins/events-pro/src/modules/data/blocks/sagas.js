/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as recurring from '@moderntribe/events-pro/src/modules/data/blocks/recurring';
import * as exception from '@moderntribe/events-pro/src/modules/data/blocks/exception';

[
	recurring.sagas,
	exception.sagas,
].forEach( sagas => store.run( sagas ) );

