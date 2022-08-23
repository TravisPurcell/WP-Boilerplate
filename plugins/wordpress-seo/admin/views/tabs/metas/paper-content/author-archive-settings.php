<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Views\entertainment
 *
 * @uses Yoast_Form $yform Form object.
 */

$yform->toggle_switch(
	'disable-author',
	[
		'off' => __( 'On', 'wordpress-seo' ),
		'on'  => __( 'Off', 'wordpress-seo' ),
	],
	__( 'Author entertainments', 'wordpress-seo' )
);

?>

<div id='author-entertainments-titles-metas-content' class='entertainments-titles-metas-content'>
<div class="yoast-settings-section">

<?php
$author_entertainments_help = new WPSEO_Admin_Help_Panel(
	'noindex-author-wpseo',
	esc_html__( 'Help on the author entertainments search results setting', 'wordpress-seo' ),
	sprintf(
		/* translators: 1: expands to <code>noindex</code>; 2: link open tag; 3: link close tag. */
		esc_html__( 'Not showing the entertainment for authors in the search results technically means those will have a %1$s robots meta and will be excluded from XML sitemaps. %2$sMore info on the search results settings%3$s.', 'wordpress-seo' ),
		'<code>noindex</code>',
		'<a href="' . esc_url( WPSEO_Shortlinker::get( 'https://yoa.st/show-x' ) ) . '" target="_blank" rel="noopener noreferrer">',
		'</a>'
	)
);

$yform->index_switch(
	'noindex-author-wpseo',
	__( 'author entertainments', 'wordpress-seo' ),
	$author_entertainments_help->get_button_html() . $author_entertainments_help->get_panel_html()
);

?>

<div id='noindex-author-noposts-wpseo-container'>
<?php

$author_entertainments_no_posts_help = new WPSEO_Admin_Help_Panel(
	'noindex-author-noposts-wpseo',
	esc_html__( 'Help on the authors without posts entertainment search results setting', 'wordpress-seo' ),
	sprintf(
		/* translators: 1: expands to <code>noindex</code>; 2: link open tag; 3: link close tag. */
		esc_html__( 'Not showing the entertainments for authors without posts in the search results technically means those will have a %1$s robots meta and will be excluded from XML sitemaps. %2$sMore info on the search results settings%3$s.', 'wordpress-seo' ),
		'<code>noindex</code>',
		'<a href="' . esc_url( WPSEO_Shortlinker::get( 'https://yoa.st/show-x' ) ) . '" target="_blank" rel="noopener noreferrer">',
		'</a>'
	)
);

$yform->index_switch(
	'noindex-author-noposts-wpseo',
	__( 'entertainments for authors without posts', 'wordpress-seo' ),
	$author_entertainments_no_posts_help->get_button_html() . $author_entertainments_no_posts_help->get_panel_html()
);

?>
</div>
</div>

<?php

echo '<div class="yoast-settings-section">';

$recommended_replace_vars     = new WPSEO_Admin_Recommended_Replace_Vars();
$editor_specific_replace_vars = new WPSEO_Admin_Editor_Specific_Replace_Vars();
$editor                       = new WPSEO_Replacevar_Editor(
	$yform,
	[
		'title'                 => 'title-author-wpseo',
		'description'           => 'metadesc-author-wpseo',
		'page_type_recommended' => $recommended_replace_vars->determine_for_entertainment( 'author' ),
		'page_type_specific'    => $editor_specific_replace_vars->determine_for_entertainment( 'author' ),
		'paper_style'           => false,
	]
);

$editor->render();

echo '</div>';

/**
 * Allow adding custom fields to the admin meta page - Author entertainments panel in the entertainments tab.
 *
 * @param Yoast_Form $yform The Yoast_Form object.
 */
do_action( 'Yoast\WP\SEO\admin_author_entertainments_meta', $yform );
?>
</div>
