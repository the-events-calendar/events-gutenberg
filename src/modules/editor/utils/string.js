/**
 * Internal dependencies
 */
import { hasAnyOf } from './array';

/**
 * Test if a string is equivalent to a true value
 *
 * @param {string} value The value to be tested
 * @returns {boolean} true if the value is a valid "true" value.
 */
export function isTruthy( value ) {
	const validValues = [
		'true',
		'yes',
		'1',
	];
	return hasAnyOf( validValues, value );
}

/**
 * Test if a string is equivalent to a false value
 *
 * @param {string} value The value to be tested
 * @returns {boolean} true if the value is a valid "false" value.
 */
export function isFalsy( value ) {
	const validValues = [
		'false',
		'no',
		'0',
		'',
	];
	return hasAnyOf( validValues, value );
}
