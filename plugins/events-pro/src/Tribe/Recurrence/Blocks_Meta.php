<?php

/**
 * Class Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta {
	protected $rules_key = '_tribe_blocks_recurrence_rules';
	protected $exclusions_key = '_tribe_blocks_recurrence_exclusions';
	
	/**
	 * Meta key used to get the rules associated with the recurrence on the new UI
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function get_rules_key() {
		return $this->rules_key;
	}
	
	/**
	 * Return the meta key used to get the exclusions in a post.
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function get_exclusions_key() {
		return $this->exclusions_key;
	}
}
