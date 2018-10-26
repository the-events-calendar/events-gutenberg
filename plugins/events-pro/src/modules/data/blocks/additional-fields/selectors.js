/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import identity from 'lodash/identity';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/common/data/plugins';
import { wordsAsList } from '@moderntribe/common/utils/string';

export const getPlugin = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ];
export const getBlocks = createSelector(
	[ getPlugin ],
	( plugin ) => plugin.blocks,
);

export const getAdditionalFields = createSelector(
	[ getBlocks ],
	( blocks ) => blocks.additionalFields,
);

export const getFieldName = ( state, props ) => props.name;

export const getIds = createSelector(
	[ getAdditionalFields ],
	( fields ) => fields.allIds,
);

export const getFieldAsObjects = createSelector(
	[ getAdditionalFields ],
	( fields ) => fields.byId,
);

export const getFieldBlock = createSelector(
	[ getFieldAsObjects, getFieldName ],
	( fields, name ) => fields[ name ] || {},
);

export const getFieldDividerList = createSelector(
	[ getFieldBlock ],
	( field ) => field.dividerList,
);

export const getFieldDividerEnd = createSelector(
	[ getFieldBlock ],
	( field ) => field.dividerEnd,
);

export const getFieldType = createSelector(
	[ getFieldBlock ],
	( field ) => field.type,
);

export const getFieldLabel = createSelector(
	[ getFieldBlock ],
	( field ) => field.label || '',
);

export const getFieldValue = createSelector(
	[ getFieldBlock ],
	( field ) => field.value,
);

export const getTextFieldValue = createSelector(
	[ getFieldValue ],
	( value ) => value || '',
);

export const getArrayFieldValue = createSelector(
	[ getFieldBlock ],
	( field ) => field.value || [],
);

export const getTextAreaOutput = createSelector(
	[ getTextFieldValue ],
	( value ) => {
		return value.split( '\n' ).filter( identity );
	},
);

export const getFieldIsPristine = createSelector(
	[ getFieldBlock ],
	( field ) => field.isPristine,
);

export const getFieldOptions = createSelector(
	[ getFieldBlock ],
	( field ) => field.options || [],
);

export const getFieldOptionsWithLabels = createSelector(
	[ getFieldOptions ],
	( options ) => {
		return options.map( ( option ) => ( { value: option, label: option } ) );
	},
);

export const getFieldDropdownValue = createSelector(
	[ getFieldBlock ],
	( field ) => ( { value: field.value, label: field.value } ),
);

export const getFieldDropdownOutput = createSelector(
	[ getFieldDropdownValue ],
	( value ) => value.label || '',
);

export const getFieldCheckboxValue = createSelector(
	[ getTextFieldValue ],
	( value ) => value.split( '|' ),
);

export const getFieldCheckboxOptions = createSelector(
	[ getFieldCheckboxValue, getFieldOptionsWithLabels ],
	( values, optionsWithLabels ) => {
		return optionsWithLabels.map( ( option ) => ( {
			...option,
			isChecked: includes( values, option.value ),
		} ) );
	},
);

export const getFieldCheckboxOutput = createSelector(
	[ getFieldCheckboxValue, getFieldDividerList, getFieldDividerEnd ],
	( values, listDivider, dividerEnd ) => wordsAsList( values, listDivider, dividerEnd ),
);
