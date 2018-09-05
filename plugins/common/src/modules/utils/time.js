/**
 * External dependencies
 */
import zeroFill from 'zero-fill';

export const MINUTE_IN_SECONDS = 60;
export const HALF_HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 30;
export const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
export const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;

export const START_OF_DAY = '00:00';
export const END_OF_DAY = '23:59';

/**
 * The code below is copied from the library hh-mm-ss
 * Link: https://www.npmjs.com/package/hh-mm-ss
 * The code has been copied so that Modern Tribe can maintain this library
 * internally and adjust as needed.
 */
export const TIME_FORMAT_HH_MM_SS_SSS = 'hh:mm:ss.sss';
export const TIME_FORMAT_HH_MM_SS = 'hh:mm:ss';
export const TIME_FORMAT_HH_MM = 'hh:mm';
export const TIME_FORMAT_MM_SS_SSS = 'mm:ss.sss';
export const TIME_FORMAT_MM_SS = 'mm:ss';

export const HOUR_IN_MS = 3600000;
export const MINUTE_IN_MS = 60000;
export const SECOND_IN_MS = 1000;

export const fromMs = (ms, format = TIME_FORMAT_MM_SS) => {
	if (typeof ms !== 'number' || Number.isNaN(ms)) {
		/* eslint-disable-next-line max-len */
		throw new Error('Argument `ms` provided to `fromMs` is not a number or is NaN.');
	}

	let absMs = Math.abs(ms);

	let negative = (ms < 0);
	let hours = Math.floor(absMs / HOUR_IN_MS);
	let minutes = Math.floor(absMs % HOUR_IN_MS / MINUTE_IN_MS);
	let seconds = Math.floor(absMs % MINUTE_IN_MS / SECOND_IN_MS);
	let miliseconds = Math.floor(absMs % SECOND_IN_MS);

	return formatTime({
		negative, hours, minutes, seconds, miliseconds
	}, format);
};

export const fromS = (s, format = TIME_FORMAT_MM_SS) => {
	if (typeof s !== 'number' || Number.isNaN(s)) {
 		/* eslint-disable-next-line max-len */
		throw new Error('Argument `s` provided to `fromS` is not a number or is NaN.');
	}

	let ms = s * SECOND_IN_MS;

	return fromMs(ms, format);
};

export const toMs = (time, format = TIME_FORMAT_MM_SS) => {
	let re;

	if ([
		TIME_FORMAT_HH_MM_SS_SSS,
		TIME_FORMAT_HH_MM_SS,
		TIME_FORMAT_MM_SS_SSS,
		TIME_FORMAT_MM_SS,
	].includes(format)) {
		re = /^(-)?(?:(\d\d+):)?(\d\d):(\d\d)(\.\d+)?$/;
	} else if (format === TIME_FORMAT_HH_MM) {
		re = /^(-)?(\d\d):(\d\d)(?::(\d\d)(?:(\.\d+))?)?$/;
	} else {
 		/* eslint-disable-next-line max-len */
		throw new Error('Argument `format` provided to `toMs` is not a recognized format.');
	}

	let result = re.exec(time);
	/* eslint-disable-next-line max-len */
	if (!result) throw new Error('Argument `time` provided to `toMs` is not a recognized format.');

	let negative = result[1] === '-';
	let hours = result[2] | 0;
	let minutes = result[3] | 0;
	let seconds = result[4] | 0;
	let miliseconds = Math.floor(1000 * result[5] | 0);

	if (minutes >= 60 || seconds >= 60) {
		/* eslint-disable-next-line max-len */
		throw new Error('Argument `time` provided to `toMs` contains minutes or seconds greater than 60.');
	}

	return (negative ? -1 : 1) * (
		hours * HOUR_IN_MS + minutes * MINUTE_IN_MS + seconds * SECOND_IN_MS + miliseconds
	);
};

export const toS = (time, format = TIME_FORMAT_MM_SS) => {
	let ms = toMs(time, format);
	return Math.floor(ms / SECOND_IN_MS);
};

export const formatTime = (time, format) => {
	let showMs;
	let showSc;
	let showHr;

	switch (format) {
		case TIME_FORMAT_HH_MM_SS_SSS:
			showMs = true;
			showSc = true;
			showHr = true;
			break;
		case TIME_FORMAT_HH_MM_SS:
			showMs = !(!time.miliseconds);
			showSc = true;
			showHr = true;
			break;
		case TIME_FORMAT_HH_MM:
			showMs = !(!time.miliseconds);
			showSc = showMs || !(!time.seconds);
			showHr = true;
			break;
		case TIME_FORMAT_MM_SS_SSS:
			showMs = true;
			showSc = true;
			showHr = !(!time.hours);
			break;
		case TIME_FORMAT_MM_SS:
			showMs = !(!time.miliseconds);
			showSc = true;
			showHr = !(!time.hours);
			break;
		default:
			/* eslint-disable-next-line max-len */
			throw new Error('Argument `format` provided to `toMs` is not a recognized format.');
	}

	let hh = zeroFill(2, time.hours);
	let mm = zeroFill(2, time.minutes);
	let ss = zeroFill(2, time.seconds);
	let sss = zeroFill(3, time.miliseconds);

	return (time.negative ? '-' : '') + (showHr ? (
		showMs ? `${hh}:${mm}:${ss}.${sss}` : showSc ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`
	) : (
		showMs ? `${mm}:${ss}.${sss}` : `${mm}:${ss}`
	));
};
