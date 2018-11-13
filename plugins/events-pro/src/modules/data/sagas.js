/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import syncer from '@moderntribe/events-pro/data/shared/sync';
import queueStatus from '@moderntribe/events-pro/data/status/sagas';

[
	syncer,
	queueStatus,
	recurring.sagas,
	exception.sagas,
].forEach( sagas => store.run( sagas ) );

