/**
 * Internal dependencies
 */
import { hasAnyOf } from './array';

export function isTruthy( value ) {
	const validValues = [
		'true',
		'yes',
		'1',
	];
	return hasAnyOf( validValues, value );
}

export function isFalsy( value ) {
	const validValues = [
		'false',
		'no',
		'0',
	];
	return hasAnyOf( validValues, value );
}
