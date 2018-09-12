/**
 * Calculate the percentage of two numbers
 *
 * @param {number} value Initial value from where to take the percentage
 * @param {number} total Total value to get the percentage relative to this value
 * @returns {number} total percentage value
 */
export const percentage = ( value = 0, total = 0 ) => {
	if ( total <= 0 ) {
		return 0;
	}

	const result = Math.floor( ( value / total ) * 100 );

	if ( isNaN( result ) ) {
		return 0;
	}

	// ensure number does not goes out of 100%
	return Math.min( 100, result );
};
