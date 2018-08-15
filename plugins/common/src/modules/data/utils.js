export const PREFIX = '@@MT/COMMON';

export const withPrefix = ( actionName = 'UNKNOWN' ) => `${ PREFIX }/${ actionName }`;
