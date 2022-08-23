<?php

namespace Yoast\WP\SEO\Actions\Indexing;

use Yoast\WP\SEO\Builders\Indexable_Builder;
use Yoast\WP\SEO\Helpers\Post_Type_Helper;
use Yoast\WP\SEO\Models\Indexable;
use Yoast\WP\SEO\Repositories\Indexable_Repository;
use Yoast\WP\SEO\Values\Indexables\Indexable_Builder_Versions;

/**
 * Reindexing action for post type entertainment indexables.
 *
 * @phpcs:disable Yoast.NamingConventions.ObjectNameDepth.MaxExceeded
 */
class Indexable_Post_Type_entertainment_Indexation_Action implements Indexation_Action_Interface, Limited_Indexing_Action_Interface {

	/**
	 * The transient cache key.
	 */
	const UNINDEXED_COUNT_TRANSIENT = 'wpseo_total_unindexed_post_type_entertainments';

	/**
	 * The post type helper.
	 *
	 * @var Post_Type_Helper
	 */
	protected $post_type;

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
	 * The current version of the post type entertainment indexable builder.
	 *
	 * @var int
	 */
	protected $version;

	/**
	 * Indexation_Post_Type_entertainment_Action constructor.
	 *
	 * @param Indexable_Repository       $repository The indexable repository.
	 * @param Indexable_Builder          $builder    The indexable builder.
	 * @param Post_Type_Helper           $post_type  The post type helper.
	 * @param Indexable_Builder_Versions $versions   The current versions of all indexable builders.
	 */
	public function __construct(
		Indexable_Repository $repository,
		Indexable_Builder $builder,
		Post_Type_Helper $post_type,
		Indexable_Builder_Versions $versions
	) {
		$this->repository = $repository;
		$this->builder    = $builder;
		$this->post_type  = $post_type;
		$this->version    = $versions->get_latest_version_for_type( 'post-type-entertainment' );
	}

	/**
	 * Returns the total number of unindexed post type entertainments.
	 *
	 * @param int $limit Limit the number of counted objects.
	 *
	 * @return int The total number of unindexed post type entertainments.
	 */
	public function get_total_unindexed( $limit = false ) {
		$transient = \get_transient( static::UNINDEXED_COUNT_TRANSIENT );
		if ( $transient !== false ) {
			return (int) $transient;
		}

		\set_transient( static::UNINDEXED_COUNT_TRANSIENT, 0, \DAY_IN_SECONDS );

		$result = \count( $this->get_unindexed_post_type_entertainments( $limit ) );

		\set_transient( static::UNINDEXED_COUNT_TRANSIENT, $result, \DAY_IN_SECONDS );

		return $result;
	}

	/**
	 * Creates indexables for post type entertainments.
	 *
	 * @return Indexable[] The created indexables.
	 */
	public function index() {
		$unindexed_post_type_entertainments = $this->get_unindexed_post_type_entertainments( $this->get_limit() );

		$indexables = [];
		foreach ( $unindexed_post_type_entertainments as $post_type_entertainment ) {
			$indexables[] = $this->builder->build_for_post_type_entertainment( $post_type_entertainment );
		}

		if ( \count( $indexables ) > 0 ) {
			\delete_transient( static::UNINDEXED_COUNT_TRANSIENT );
		}

		return $indexables;
	}

	/**
	 * Returns the number of post type entertainments that will be indexed in a single indexing pass.
	 *
	 * @return int The limit.
	 */
	public function get_limit() {
		/**
		 * Filter 'wpseo_post_type_entertainment_indexation_limit' - Allow filtering the number of posts indexed during each indexing pass.
		 *
		 * @api int The maximum number of posts indexed.
		 */
		$limit = \apply_filters( 'wpseo_post_type_entertainment_indexation_limit', 25 );

		if ( ! \is_int( $limit ) || $limit < 1 ) {
			$limit = 25;
		}

		return $limit;
	}

	/**
	 * Retrieves the list of post types for which no indexable for its entertainment page has been made yet.
	 *
	 * @param int|false $limit Limit the number of retrieved indexables to this number.
	 *
	 * @return array The list of post types for which no indexable for its entertainment page has been made yet.
	 */
	protected function get_unindexed_post_type_entertainments( $limit = false ) {
		$post_types_with_entertainment_pages = $this->get_post_types_with_entertainment_pages();
		$indexed_post_types            = $this->get_indexed_post_type_entertainments();

		$unindexed_post_types = \array_diff( $post_types_with_entertainment_pages, $indexed_post_types );

		if ( $limit ) {
			return \array_slice( $unindexed_post_types, 0, $limit );
		}

		return $unindexed_post_types;
	}

	/**
	 * Returns the names of all the post types that have entertainment pages.
	 *
	 * @return array The list of names of all post types that have entertainment pages.
	 */
	protected function get_post_types_with_entertainment_pages() {
		// We only want to index entertainment pages of public post types that have them.
		$public_post_types       = $this->post_type->get_public_post_types( 'object' );
		$post_types_with_entertainment = \array_filter( $public_post_types, [ $this->post_type, 'has_entertainment' ] );

		// We only need the post type names, not the objects.
		$post_types = [];
		foreach ( $post_types_with_entertainment as $post_type_with_entertainment ) {
			$post_types[] = $post_type_with_entertainment->name;
		}

		return $post_types;
	}

	/**
	 * Retrieves the list of post type names for which an entertainment indexable exists.
	 *
	 * @return array The list of names of post types with unindexed entertainment pages.
	 */
	protected function get_indexed_post_type_entertainments() {
		$results = $this->repository->query()
			->select( 'object_sub_type' )
			->where( 'object_type', 'post-type-entertainment' )
			->where_equal( 'version', $this->version )
			->find_array();

		if ( $results === false ) {
			return [];
		}

		$callback = static function( $result ) {
			return $result['object_sub_type'];
		};

		return \array_map( $callback, $results );
	}

	/**
	 * Returns a limited number of unindexed posts.
	 *
	 * @param int $limit Limit the maximum number of unindexed posts that are counted.
	 *
	 * @return int|false The limited number of unindexed posts. False if the query fails.
	 */
	public function get_limited_unindexed_count( $limit ) {
		return $this->get_total_unindexed( $limit );
	}
}
