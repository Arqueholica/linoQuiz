<?php
/*
Plugin Name: LinoQuiz
Description: Plugin que muestra tu quiz hecho en HTML/CSS/JS.
Version:     1.0
Author:      Linotipo
*/

if ( ! defined( 'ABSPATH' ) ) exit;

// Helper para la URL del plugin en JS
function linoquiz_plugin_url_js() {
    echo '<script>var linoquiz_plugin_url = "' . plugin_dir_url( __FILE__ ) . '";</script>';
}
add_action('wp_head', 'linoquiz_plugin_url_js');

// Encolar Tailwind, CSS y JS
function linoquiz_enqueue_assets() {
    wp_enqueue_style(
        'tailwind-cdn',
        'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
    );
    wp_enqueue_style(
        'linoquiz-style',
        plugins_url( 'assets/css/style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'assets/css/style.css' )
    );
    wp_enqueue_script(
        'linoquiz-script',
        plugins_url( 'assets/js/script.js', __FILE__ ),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'assets/js/script.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'linoquiz_enqueue_assets' );

// Shortcode
function linoquiz_shortcode() {
    ob_start();
  ?>
  <div id="books-bg" class="min-h-screen w-full px-2 py-4 flex flex-col items-center" style="position:relative; overflow:hidden;">
      <div id="welcomeElements" class="w-full flex flex-col items-center">
        <h1 class="text-4xl font-bold text-center w-full max-w-md mx-auto my-2 py-8 px-4 md:px-10 border-2 rounded-lg shadow-lg bg-blue-100">¡Bienvenidxs a LinoQuiz!</h1>
        <div class="w-full max-w-md mx-auto px-4 md:px-10 py-4 md:py-8 bg-white flex flex-col items-center">
          <p class="text-center text-lg font-semibold m-2 p-4">Un mini quiz para poner a prueba tus conocimientos sobre Julio Verne.</p>
          <p class="text-center text-lg font-semibold m-2 p-4">¡Vamos a ver cuánto sabes!</p>
          <p class="text-center text-lg font-semibold m-2 p-4">¡Comencemos!</p>
          <p class="text-center text-lg font-semibold m-2 p-4">¡Suerte!</p>
          <p class="text-center text-lg font-semibold m-2 p-4">¡Recuerda que puedes reiniciar el quiz en cualquier momento!</p>
        </div>
        <p class="text-center text-lg font-semibold m-2 p-4 w-full max-w-md mx-auto">Selecciona un nivel para comenzar:</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mt-4 w-full max-w-md mx-auto">
          <button id="nivel1" class="w-full sm:w-auto py-2 px-4 text-lg font-semibold text-center border-2 border-gray-700 rounded-lg hover:bg-blue-200">Nivel 1</button>
          <button id="nivel2" class="w-full sm:w-auto py-2 px-4 text-lg font-semibold text-center border-2 border-gray-700 rounded-lg hover:bg-green-200">Nivel 2</button>
          <button id="nivel3" class="w-full sm:w-auto py-2 px-4 text-lg font-semibold text-center border-2 border-gray-700 rounded-lg hover:bg-yellow-200">Nivel 3</button>
        </div>
      </div>
      <div id="quiz" class="flex flex-col justify-center items-center min-h-screen hidden w-full">
        <div class="w-full max-w-md p-4 md:p-8 bg-white rounded-lg flex flex-col items-center mx-auto">
          <p class="mb-6 text-center font-bold text-3xl py-6">¿Cuánto sabes de Julio Verne?</p>
          <h3 id="question" class="text-xl font-bold my-6 text-center"></h3>
          <div id="options" class="mb-6 w-full flex flex-col items-center"></div>
          <button id="submit" class="w-full py-2 m-4 text-lg font-semibold text-center border-2 rounded-lg hover:bg-blue-200">Responder</button>
          <div id="result" class="mt-4 text-lg font-semibold text-center"></div>
          <div class="flex flex-col sm:flex-row gap-4 mt-4 w-full">
            <div id="reset" class="w-full sm:w-auto p-2 text-lg font-semibold text-center border-2 rounded-lg hover:bg-blue-200 cursor-pointer">Reiniciar</div>
            <div id="back" class="w-full sm:w-auto p-2 text-lg font-semibold text-center border-2 rounded-lg hover:bg-red-200 cursor-pointer">Atrás</div>
          </div>
        </div>
      </div>
    </div>
    <link rel="icon" href="<?php echo plugins_url('assets/icons/logo2_color_fondoClaro (1).png', __FILE__); ?>" type="image/png" />
    <style>
      #quiz-bg::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
        background-image: url('<?php echo plugins_url('assets/img/FondoQuiz.png', __FILE__); ?>');
        background-size: cover;
        background-position: center;
        filter: blur(12px) brightness(0.7);
        opacity: 0.5;
      }
      #quiz-bg > * { position: relative; z-index: 1; }
    </style>
    <?php
    return ob_get_clean();
}

add_shortcode( 'linoquiz', 'linoquiz_shortcode' );

