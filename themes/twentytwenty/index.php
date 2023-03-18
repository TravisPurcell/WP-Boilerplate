<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

get_header();
?>

<main id="site-content">

	<?php

	$entertainment_title    = '';
	$entertainment_subtitle = '';

	if ( is_search() ) {
		global $wp_query;

		$entertainment_title = sprintf(
			'%1$s %2$s',
			'<span class="color-accent">' . __( 'Search:', 'twentytwenty' ) . '</span>',
			'&ldquo;' . get_search_query() . '&rdquo;'
		);

		if ( $wp_query->found_posts ) {
			$entertainment_subtitle = sprintf(
				/* translators: %s: Number of search results. */
				_n(
					'We found %s result for your search.',
					'We found %s results for your search.',
					$wp_query->found_posts,
					'twentytwenty'
				),
				number_format_i18n( $wp_query->found_posts )
			);
		} else {
			$entertainment_subtitle = __( 'We could not find any results for your search. You can give it another try through the search form below.', 'twentytwenty' );
		}
	} elseif ( is_entertainment() && ! have_posts() ) {
		$entertainment_title = __( 'Nothing Found', 'twentytwenty' );
	} elseif ( ! is_home() ) {
		$entertainment_title    = get_the_entertainment_title();
		$entertainment_subtitle = get_the_entertainment_description();
	}

	if ( $entertainment_title || $entertainment_subtitle ) {
		?>

		<header class="entertainment-header has-text-align-center header-footer-group">

			<div class="entertainment-header-inner section-inner medium">

				<?php if ( $entertainment_title ) { ?>
					<h1 class="entertainment-title"><?php echo wp_kses_post( $entertainment_title ); ?></h1>
				<?php } ?>

				<?php if ( $entertainment_subtitle ) { ?>
					<div class="entertainment-subtitle section-inner thin max-percentage intro-text"><?php echo wp_kses_post( wpautop( $entertainment_subtitle ) ); ?></div>
				<?php } ?>

			</div><!-- .entertainment-header-inner -->

		</header><!-- .entertainment-header -->

		<?php
	}

	if ( have_posts() ) {

		$i = 0;

		while ( have_posts() ) {
			$i++;
			if ( $i > 1 ) {
				echo '<hr class="post-separator styled-separator is-style-wide section-inner" aria-hidden="true" />';
			}
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );

		}
	} elseif ( is_search() ) {
		?>

		<div class="no-search-results-form section-inner thin">

			<?php
			get_search_form(
				array(
					'aria_label' => __( 'search again', 'twentytwenty' ),
				)
			);
			?>

		</div><!-- .no-search-results -->

		<?php
	}
	?>

	<?php get_template_part( 'template-parts/pagination' ); ?>

</main><!-- #site-content -->

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php
get_footer();
