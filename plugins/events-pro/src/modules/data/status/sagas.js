/**
 * External dependencies
 */
import { some } from 'lodash';
import { race, take, select, call, put } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import { select as wpSelect, subscribe } from '@wordpress/data';
import 'whatwg-fetch';
import { allowEdits, disableEdits } from '@moderntribe/events/data/blocks/datetime/actions';
import { restNonce } from '@moderntribe/common/src/modules/utils/globals';

/**
 * Internal dependencies
 */
import * as recurringTypes from '@moderntribe/events-pro/data/blocks/recurring/types';
import * as actions from './actions';
import * as selectors from './selectors';

/**
 * Fetches current series queue status
 *
 * @export
 * @returns {Object|Boolean} JSON status or false when no series being edited
 */
export function* fetchStatus() {
	try {
		const payload = new FormData();
		const postId = wpSelect( 'core/editor' ).getCurrentPostId();

		if ( ! postId ) {
			throw 'No post ID';
		}

		yield call( [ payload, 'append' ], 'action', 'gutenberg_events_pro_recurrence_queue' );
		yield call( [ payload, 'append' ], 'recurrence_queue_status_nonce', restNonce().queue_status_nonce ); // eslint-disable-line max-len
		yield call( [ payload, 'append' ], 'postId', postId );

		const response = yield call( fetch, window.ajaxurl, {
			method: 'POST',
			credentials: 'same-origin',
			body: payload,
		} );

		return yield call( [ response, 'json' ] );
	} catch ( error ) {
		// TODO: Better error handling
		console.error( error );
		return false; // To mark as completed
	}
}

/**
 * Polls series status until series is completed
 *
 * @export
 */
export function* pollUntilSeriesCompleted() {
	// Disable datetime block edits until we know we're not making an series events
	yield put( disableEdits() );

	while ( true ) {
		const response = yield call( fetchStatus );
		const isCompleted = response === false; // If false, no edits being done

		if ( isCompleted ) {
			yield put( actions.setSeriesQueueStatus( { completed: isCompleted } ) );
		} else {
			yield put( actions.setSeriesQueueStatus( response ) );
		}

		if ( yield select( selectors.isCompleted ) ) {
			yield put( allowEdits() ); // Allow datetime block to be editable again
			break; // We done
		}

		yield call( delay, 1000 );
	}
}

/**
 * Creates event channel subscribing to WP editor state
 *
 * @returns {Function} Channel
 */
export function createWPEditorChannel() {
	return eventChannel( emit => {
		const editor = wpSelect( 'core/editor' );

		const predicates = [
			editor.isSavingPost,
			editor.isPublishingPost,
		];

		// Returns unsubscribe function
		return subscribe( () => {
			// Only emit when truthy
			if ( some( predicates, fn => fn() ) ) {
				emit( true ); // Emitted value is insignificant here, but cannot be left undefined
			}
		} );
	} );
}

/**
 * Only used to get around redux saga bug when using channels and actions `takes` together
 *
 * @export
 */
export function* actionTaker() {
	yield take( [ recurringTypes.SYNC_RULES_FROM_DB ] );
}

/**
 * Poll on actions or channel emit
 *
 * @export
 */
export default function* watchers() {
	const channel = yield call( createWPEditorChannel );

	while ( true ) {
		yield race( [
			take( channel ),
			call( actionTaker ),
		] );
		yield call( pollUntilSeriesCompleted );
	}
}
