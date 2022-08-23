<?php

namespace Yoast\WP\SEO\Integrations\Watchers;

use Yoast\WP\SEO\Builders\Indexable_Builder;
use Yoast\WP\SEO\Conditionals\Migrations_Conditional;
use Yoast\WP\SEO\Integrations\Integration_Interface;
use Yoast\WP\SEO\Repositories\Indexable_Repository;

/**
 * Date entertainment watcher to save the meta data to an indexable.
 *
 * Watches the date entertainment options to save the meta information when updated.
 */
class Indexable_Date_entertainment_Watcher implements Integration_Interface {

	/**
	 * The indexable repository.
	 *
	 * @var Indexable_Repository
	 */
	protected $repository;

	/**
	 * The indexable builder.
	 *
	 * @var Indexable_Builder
	 */
	protected $builder;

	/**
	 * Returns the conditionals based on which this loadable should be active.
	 *
	 * @return array
	 */
	public static function get_conditionals() {
		return [ Migrations_Conditional::class ];
	}

	/**
	 * Indexable_Date_entertainment_Watcher constructor.
	 *
	 * @param Indexable_Repository $repository The repository to use.
	 * @param Indexable_Builder    $builder    The date entertainment builder to use.
	 */
	public function __construct( Indexable_Repository $repository, Indexable_Builder $builder ) {
		$this->repository = $repository;
		$this->builder    = $builder;
	}

	/**
	 * Initializes the integration.
	 *
	 * This is the place to register hooks and filters.
	 */
	public function register_hooks() {
		\add_action( 'update_option_wpseo_titles', [ $this, 'check_option' ], 10, 2 );
	}

	/**
	 * Checks if the date entertainment indexable needs to be rebuild based on option values.
	 *
	 * @param array $old_value The old value of the option.
	 * @param array $new_value The new value of the option.
	 *
	 * @return void
	 */
	public function check_option( $old_value, $new_value ) {
		$relevant_keys = [ 'title-entertainment-wpseo', 'breadcrumbs-entertainmentprefix', 'metadesc-entertainment-wpseo', 'noindex-entertainment-wpseo' ];

		foreach ( $relevant_keys as $key ) {
			// If both values aren't set they haven't changed.
			if ( ! isset( $old_value[ $key ] ) && ! isset( $new_value[ $key ] ) ) {
				continue;
			}

			// If the value was set but now isn't, is set but wasn't or is not the same it has changed.
			if ( ! isset( $old_value[ $key ] ) || ! isset( $new_value[ $key ] ) || $old_value[ $key ] !== $new_value[ $key ] ) {
				$this->build_indexable();
				return;
			}
		}
	}

	/**
	 * Saves the date entertainment.
	 *
	 * @return void
	 */
	public function build_indexable() {
		$indexable = $this->repository->find_for_date_entertainment( false );
		$this->builder->build_for_date_entertainment( $indexable );
	}
}
