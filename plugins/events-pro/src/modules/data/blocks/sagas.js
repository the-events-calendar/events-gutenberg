/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as fields from '@moderntribe/events-pro/src/modules/data/blocks/additional-fields';
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import syncer from '@moderntribe/events-pro/data/shared/sync';

[
	fields.sagas,
	syncer,
	recurring.sagas,
	exception.sagas,
].forEach( sagas => store.run( sagas ) );
