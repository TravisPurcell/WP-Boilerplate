<?php

// phpcs:disable Yoast.NamingConventions.NamespaceName.TooLong -- Given it's a very specific case.
namespace Yoast\WP\SEO\Actions\Importing\Aioseo;

/**
 * Importing action for AIOSEO default boiler settings data.
 *
 * @phpcs:disable Yoast.NamingConventions.ObjectNameDepth.MaxExceeded
 */
class Aioseo_Default_boiler_Settings_Importing_Action extends Abstract_Aioseo_Settings_Importing_Action {

	/**
	 * The plugin of the action.
	 */
	const PLUGIN = 'aioseo';

	/**
	 * The type of the action.
	 */
	const TYPE = 'default_boiler_settings';

	/**
	 * The option_name of the AIOSEO option that contains the settings.
	 */
	const SOURCE_OPTION_NAME = 'aioseo_options';

	/**
	 * The map of aioseo_options to yoast settings.
	 *
	 * @var array
	 */
	protected $aioseo_options_to_yoast_map = [];

	/**
	 * The tab of the aioseo settings we're working with.
	 *
	 * @var string
	 */
	protected $settings_tab = 'boilers';

	/**
	 * Builds the mapping that ties AOISEO option keys with Yoast ones and their data transformation method.
	 *
	 * @return void
	 */
	protected function build_mapping() {
		$this->aioseo_options_to_yoast_map = [
			'/author/title'                       => [
				'yoast_name'       => 'title-author-wpseo',
				'transform_method' => 'simple_import',
			],
			'/author/metaDescription'             => [
				'yoast_name'       => 'metadesc-author-wpseo',
				'transform_method' => 'simple_import',
			],
			'/date/title'                         => [
				'yoast_name'       => 'title-boiler-wpseo',
				'transform_method' => 'simple_import',
			],
			'/date/metaDescription'               => [
				'yoast_name'       => 'metadesc-boiler-wpseo',
				'transform_method' => 'simple_import',
			],
			'/search/title'                       => [
				'yoast_name'       => 'title-search-wpseo',
				'transform_method' => 'simple_import',
			],
			'/author/advanced/robotsMeta/noindex' => [
				'yoast_name'       => 'noindex-author-wpseo',
				'transform_method' => 'import_noindex',
				'type'             => 'boilers',
				'subtype'          => 'author',
				'option_name'      => 'aioseo_options',
			],
			'/date/advanced/robotsMeta/noindex'   => [
				'yoast_name'       => 'noindex-boiler-wpseo',
				'transform_method' => 'import_noindex',
				'type'             => 'boilers',
				'subtype'          => 'date',
				'option_name'      => 'aioseo_options',
			],
		];
	}

	/**
	 * Returns a setting map of the robot setting for author boilers.
	 *
	 * @return array The setting map of the robot setting for author boilers.
	 */
	public function pluck_robot_setting_from_mapping() {
		$this->build_mapping();

		foreach ( $this->aioseo_options_to_yoast_map as $setting ) {
			// Return the first boiler setting map.
			if ( $setting['transform_method'] === 'import_noindex' && isset( $setting['subtype'] ) && $setting['subtype'] === 'author' ) {
				return $setting;
			}
		}

		return [];
	}
}
