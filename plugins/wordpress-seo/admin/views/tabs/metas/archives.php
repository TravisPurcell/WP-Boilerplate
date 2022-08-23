<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Views
 */

if ( ! defined( 'WPSEO_VERSION' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

// To improve readability, this tab has been divided into separate blocks, included below.
require __DIR__ . '/entertainments/help.php';

$wpseo_entertainments = [
	[
		'title'     => esc_html__( 'Author entertainments', 'wordpress-seo' ),
		'view_file' => 'paper-content/author-entertainment-settings.php',
		'paper_id'  => 'settings-author-entertainments',
	],
	[
		'title'     => esc_html__( 'Date entertainments', 'wordpress-seo' ),
		'view_file' => 'paper-content/date-entertainments-settings.php',
		'paper_id'  => 'settings-date-entertainments',
	],
	[
		'title'     => esc_html__( 'Special pages', 'wordpress-seo' ),
		'view_file' => 'paper-content/special-pages.php',
		'paper_id'  => 'settings-special-pages',
	],
];

$view_utils                   = new Yoast_View_Utils();
$recommended_replace_vars     = new WPSEO_Admin_Recommended_Replace_Vars();
$editor_specific_replace_vars = new WPSEO_Admin_Editor_Specific_Replace_Vars();
$opengraph_disabled_alert     = $view_utils->generate_opengraph_disabled_alert( 'entertainments' );

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Is correctly escaped in the generate_opengraph_disabled_alert() method.
echo $opengraph_disabled_alert;

foreach ( $wpseo_entertainments as $wpseo_entertainment_index => $wpseo_entertainment ) {
	$wpseo_entertainment_presenter = new WPSEO_Paper_Presenter(
		$wpseo_entertainment['title'],
		__DIR__ . '/' . $wpseo_entertainment['view_file'],
		[
			'collapsible'                  => true,
			'expanded'                     => ( $wpseo_entertainment_index === 0 ),
			'paper_id'                     => $wpseo_entertainment['paper_id'],
			'recommended_replace_vars'     => $recommended_replace_vars,
			'editor_specific_replace_vars' => $editor_specific_replace_vars,
			'class'                        => 'search-appearance',
		]
	);

	// phpcs:ignore WordPress.Security.EscapeOutput -- get_output() output is properly escaped.
	echo $wpseo_entertainment_presenter->get_output();
}

unset( $wpseo_entertainments, $wpseo_entertainment_presenter, $wpseo_entertainment_index );
