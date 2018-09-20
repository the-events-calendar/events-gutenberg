/**
 * External dependencies
 */
import { noop } from 'lodash';

export const withAPIData = () => noop;
export const Spinner = () => "🏃‍♂️";
export const Modal = ( { title, children } ) => (
	<div>
		<span>{ title }</span>
		<span>{ children }</span>
	</div>
);
