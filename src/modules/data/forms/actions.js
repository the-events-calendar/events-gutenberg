/**
 * Internal dependencies
 */
import { actions as requestActions } from 'data/request';

import * as types from './types';
import * as selectors from './selectors';

export const registerForm = ( id, type ) => ( {
	type: types.ADD_FORM,
	payload: {
		id,
		type,
	},
} );

export const clearForm = ( id ) => ( {
	type: types.CLEAR_FORM,
	payload: {
		id,
	},
} );

export const createDraft = ( id, fields ) => ( {
	type: types.CREATE_FORM_DRAFT,
	payload: {
		id,
		fields,
	},
} );

export const editEntry = ( id, fields ) => ( {
	type: types.EDIT_FORM_ENTRY,
	payload: {
		id,
		fields,
	},
} );

export const setSubmit = ( id ) => ( {
	type: types.SUBMIT_FORM,
	payload: {
		id,
	},
} );

export const sendForm = ( id, fields = {}, completed, details = {} ) => ( dispatch, getState ) => {
	const state = getState();
	const props = { name: id };
	const type = selectors.getFormType( state, props );
	const create = selectors.getFormCreate( state, props );

	const path = create
		? `${ type }`
		: `${ type }/${ details.id }`;

	const options = {
		path,
		params: {
			method: create ? 'POST' : 'PUT',
			data: fields,
		},
		actions: {
			success: ( { body } ) => {
				completed( body, create );
				dispatch( clearForm( id ) );
			},
			error: () => dispatch( clearForm( id ) ),
		},
	};
	dispatch( requestActions.wpRequest( options ) );
};
