/* eslint-disable max-len, camelcase */
/**
 * External dependencies
 */
import { __, sprintf, _n } from '@wordpress/i18n';
import { some } from 'lodash';
import { race, take, select, call, put } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import { select as wpSelect, subscribe, dispatch as wpDispatch } from '@wordpress/data';
import 'whatwg-fetch';
import { allowEdits, disableEdits } from '@moderntribe/events/data/blocks/datetime/actions';
import { restNonce } from '@moderntribe/common/src/modules/utils/globals';
import { moment as momentUtils } from '@moderntribe/common/utils';

/**
 * Internal dependencies
 */
import * as recurringTypes from '@moderntribe/events-pro/data/blocks/recurring/types';
import * as actions from './actions';
import * as selectors from './selectors';

//
// ─── NOTICES ─────────────────────────────────────────────────────────────────────
//
export const NOTICE_EDITING_SERIES = 'NOTICE_EDITING_SERIES';
export const NOTICE_PROGRESS_ON_SERIES_CREATION_COUNT = 'NOTICE_PROGRESS_ON_SERIES_CREATION_COUNT';
export const NOTICE_PROGRESS_ON_SERIES_CREATION = 'NOTICE_PROGRESS_ON_SERIES_CREATION';
export const NOTICES = {
	[ NOTICE_EDITING_SERIES ]: __( 'You are currently editing all events in a recurring series.', 'events-gutenberg' ),
	[ NOTICE_PROGRESS_ON_SERIES_CREATION_COUNT ]: _n( '%d instance', '%d instances', 1, 'events-gutenberg' ),
	[ NOTICE_PROGRESS_ON_SERIES_CREATION ]: __( 'of this event have been created through %s.', 'events-gutenberg' ),
};

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
		yield call( [ payload, 'append' ], 'post_id', postId );

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
	// Disable datetime block edits until we know we're not making any series events
	yield put( disableEdits() );

	while ( true ) {
		const response = yield call( fetchStatus );
		const isCompleted = response === false || response.done; // If false, no edits being done

		if ( isCompleted ) {
			const payload = response === false ? { done: isCompleted } : response;
			yield put( actions.setSeriesQueueStatus( payload ) );
		} else {
			yield put( actions.setSeriesQueueStatus( response ) );

			const { items_created, last_created_at } = response;

			const date = momentUtils.toDate( momentUtils.toMoment( last_created_at ) );

			// Show editing notice
			yield call(
				[ wpDispatch( 'core/notices' ), 'createSuccessNotice' ],
				NOTICES[ NOTICE_EDITING_SERIES ],
				{ id: NOTICE_EDITING_SERIES, isDismissible: false }
			);

			// Show progress notice
			yield call(
				[ wpDispatch( 'core/notices' ), 'createSuccessNotice' ],
				`${ sprintf( NOTICES[ NOTICE_PROGRESS_ON_SERIES_CREATION_COUNT ], items_created ) } ${ sprintf( NOTICES[ NOTICE_PROGRESS_ON_SERIES_CREATION ], date ) }`,
				{ id: NOTICE_PROGRESS_ON_SERIES_CREATION, isDismissible: true }
			);
		}

		if ( yield select( selectors.isCompleted ) ) {
			yield put( allowEdits() ); // Allow datetime block to be editable again
			// Remove editing notice
			yield call(
				[ wpDispatch( 'core/notices' ), 'removeNotice' ],
				NOTICE_EDITING_SERIES
			);
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
