/**
 * External dependencies
 */
import React from 'react';
import { isEmpty } from 'lodash';

/**
 * Import internal dependencies
 */
import { withDetails } from '@moderntribe/common/hoc';
import { Loading } from '@moderntribe/events/elements';
import { Actions, Name } from './index';

const Item = ( { details = {}, isLoading, onRemoveOrganizer, ...rest } ) => {
	if ( isLoading || isEmpty( details ) ) {
		return <li><Loading className="tribe-editor__spinner--item" /></li>;
	}

	return (
		<li>
			<Name { ...details } />
			<Actions onRemoveOrganizer={ onRemoveOrganizer } { ...rest } />
		</li>
	);
};

export default withDetails( 'id' )( Item );
