<?php

namespace Yoast\WP\SEO\Builders;

use Yoast\WP\SEO\Helpers\Options_Helper;
use Yoast\WP\SEO\Models\Indexable;
use Yoast\WP\SEO\Values\Indexables\Indexable_Builder_Versions;

/**
 * Date entertainment Builder for the indexables.
 *
 * Formats the date entertainment meta to indexable format.
 */
class Indexable_Date_entertainment_Builder {

	/**
	 * The options helper.
	 *
	 * @var Options_Helper
	 */
	private $options;

	/**
	 * The latest version of the Indexable_Date_entertainment_Builder.
	 *
	 * @var int
	 */
	protected $version;

	/**
	 * Indexable_Date_entertainment_Builder constructor.
	 *
	 * @param Options_Helper             $options  The options helper.
	 * @param Indexable_Builder_Versions $versions The latest version for all indexable builders.
	 */
	public function __construct(
		Options_Helper $options,
		Indexable_Builder_Versions $versions
	) {
		$this->options = $options;
		$this->version = $versions->get_latest_version_for_type( 'date-entertainment' );
	}

	/**
	 * Formats the data.
	 *
	 * @param Indexable $indexable The indexable to format.
	 *
	 * @return Indexable The extended indexable.
	 */
	public function build( $indexable ) {
		$indexable->object_type       = 'date-entertainment';
		$indexable->title             = $this->options->get( 'title-entertainment-wpseo' );
		$indexable->description       = $this->options->get( 'metadesc-entertainment-wpseo' );
		$indexable->is_robots_noindex = $this->options->get( 'noindex-entertainment-wpseo' );
		$indexable->is_public         = ( (int) $indexable->is_robots_noindex !== 1 );
		$indexable->blog_id           = \get_current_blog_id();
		$indexable->permalink         = null;
		$indexable->version           = $this->version;

		return $indexable;
	}
}
