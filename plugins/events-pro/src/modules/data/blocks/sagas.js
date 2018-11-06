/**
 * External dependencies
 */
import { store } from '@moderntribe/common/store';

/**
 * Internal dependencies
 */
import * as fields from '@moderntribe/events-pro/src/modules/data/blocks/additional-fields';

[
	fields.sagas,
].forEach( sagas => store.run( sagas ) );
