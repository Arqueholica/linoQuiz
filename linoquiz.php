<?php
/*
Plugin Name: LinoQuiz
Description: Quiz interactivo creado con HTML/CSS/JS y Tailwind.
Version:     1.0
Author:      Tu Nombre
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Protección

/**
 * Encola CSS y JS del plugin desde assets/
 */
function linoquiz_enqueue_assets() {
    // CSS compilado
    wp_enqueue_style(
        'linoquiz-style',
        plugins_url( 'assets/css/style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'assets/css/style.css' )
    );
    // Cada JS (dependencias vacías en este ejemplo)
    $js_files = [ 'preguntasNivel1.js', 'preguntasNivel2.js', 'preguntasNivel3.js', 'script.js' ];
    foreach ( $js_files as $file ) {
        wp_enqueue_script(
            'linoquiz-'.basename($file, '.js'),
            plugins_url( 'assets/js/' . $file, __FILE__ ),
            array(),
            filemtime( plugin_dir_path(__FILE__) . 'assets/js/' . $file ),
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'linoquiz_enqueue_assets' );

/**
 * Shortcode [linoquiz] para insertar el quiz
 */
function linoquiz_shortcode() {
    ob_start();
    ?>
    <div id="linoquiz-app">
      <?php
        // Inserta aquí el contenido de src/index.html *
        include plugin_dir_path(__FILE__) . 'src/index.html';
      ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'linoquiz', 'linoquiz_shortcode' );