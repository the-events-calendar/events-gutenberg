/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { find } from 'lodash';
import { constants } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import {
	EXCEPTION_OCCURRENCE_OPTIONS,
} from './options';

export const getExceptions = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.exception;

export const getExceptionTypeOption = createSelector(
	( exception ) => exception,
	( exception ) => find( EXCEPTION_OCCURRENCE_OPTIONS, type => type.value === exception.type )
);
