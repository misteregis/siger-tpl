<?php

/*! Siger's Template Class - 2021-02-20
 *
 * @version: 1.0.0
 * 
 * https://siger.win
 * 
 */

class Template
{
    private $title = 'Siger\'s';
    private $menu_list;
    private $html_menu = '';
    private $html_body = '';
    private $html_footer = '';
    private $template_dir = 'lib/siger/template/';
    private $sort_menu_list = true;
    private $theme = 'dark';

    private $head = "<meta charset=utf-8>
        <title>{title} - ® MS ® Siger</title>
        <meta name=\"description\" content=\"{title} by Misteregis\">
        <meta name=\"author\" content=\"Misteregis\">
    
        <!-- Template style -->
        <link rel=stylesheet href=\"{template_dir}style.css\">
        <link rel=stylesheet href=\"{template_dir}style.ie.css\">
        <!--<link rel=stylesheet href=\"{template_dir}style-dark.css\">-->
    
        <!-- favicon -->
        <link rel=\"shortcut icon\" href=\"favicon.ico\">
		{app_css}";
    private $body = '
        <!-- Wrap all page content here -->
        <div id="wrap">

            <!-- Fixed navbar -->
            <div class="navbar navbar-default navbar-fixed-top">
                <div class="container">

                    <!-- Tab Menu -->
                    <div class="navbar-header">
                        <div id="menu">
                            <ul>
                                <li class="navbar-brand">{title}</li>{menu_apps}
                            </ul>
                        </div>
                        <div class="navbar-brand right">{html_menu}</div>
                    </div>
                </div>
            </div>

            <!-- Begin page content -->
            <div class="container">
                <div class="scrollbar">
                    <div id="result"></div>
                </div>
                <h3>&nbsp;</h3>
                <div class="overlay" style="display:none"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                <i class="icon-go-to-top tip" title="Ir para o topo" style="display:none"></i>
            </div>
        </div>{html_body}';
    private $footer = '<div id="footer">
            <div class="container">
                <p class="text-muted credit">Desenvolvido por <a href="#" target="_blank">Misteregis</a>.</p>
                <div id="pageload"></div>
                <div class="right">{footer}</div>
            </div>
        </div>

        <!-- Template script -->
        <script src="{template_dir}script.js?app={app}"></script>
        <script src="{template_dir}../main.js"></script>';

    private $builded = false;
    private $css = array();
    private $js = array();
    private $script = '';
    private $js_inline;
    private $version;
    private $app;

    // ativa / desativa texto do menu (padrão: $title)
    public $menu_title = true;

    // Define o nome do App
    public function setApp($app){
        $this->app = $app;
        return $this;
    }

    // Define a versão no final do arquivo
    public function setVersion($v){
        $this->version = "?v={$v}";
        return $this;
    }

    // Define o título (string)
    public function setTitle($title){
        $this->title = $title;
        return $this;
    }

    // Define o tema do App
    public function setTheme($theme){
        $this->theme = $theme;
        return $this;
    }

    // Adiciona uma tag script (inline) após o último script
    public function setScript($js){
        $this->js_inline .= "\r\n\t\t<script>\n{$this->_tab($js)}\t\t</script>";
        return $this;
    }

    // Adiciona uma tag link<stylesheet> ao head (string | array)
    public function setCSS($css){
        if (gettype($css) === 'array')
            foreach($css as $c) $this->css[$c] = "\r\n\t\t<link rel=\"stylesheet\" href=\"{$c}{$this->version}\">";
        else
            $this->css[$css] = "\r\n\t\t<link rel=\"stylesheet\" href=\"{$css}{$this->version}\">";
        return $this;
    }

    // Adiciona uma tag script ao final da página (string | array)
    public function setJS($js){
        if (gettype($js) === 'array')
            foreach($js as $s) $this->js[$s] = "\r\n\t\t<script src=\"{$s}{$this->version}\"></script>";
        else
            $this->js[$js] = "\r\n\t\t<script src=\"{$js}{$this->version}\"></script>";
        return $this;
    }

    // Adiciona um conteúdo (HTML) ao menu (à direita)
    public function setMenu($html){
        $this->html_menu = $this->_tab("\n$html", 7) . $this->tab(6);
        return $this;
    }

    /*
     * Cria um menu apartir de um array("título" => "url") ou um arquivo de texto (real ou relativo)
     *
     * O arquivo de texto tem que separado por "|", por exemplo:
     *      Linha 1: Meu outro App|/meuoutroapp/
     *      Linha 2: Meu blog|https://meublog.com/
     *      Linha 3: Meu site|//meusite.com.br/
     * 
     * Uso:
     *      // Iniciando a classe
     *      $template = new Template();
     * 
     *      // Carregando menu apartir de um arquivo de texto local
     *      $template->setMenuList('D:\meu_menu.txt');
     * 
     *      // Carregando menu apartir de um arquivo de texto relativo
     *      $template->setMenuList('/resources/meu_menu.txt');
     * 
     *      // Criando menu apartir de um Array com um segundo parâmetro (false),
     *      // por padrão o segundo parâmetro é true, ordenando do menor para maior,
     *      // definir para false irá criar o menu na ordem em que estiver
     *      $template->setMenuList([
     *          'Meu blog' => 'https://meublog.com/',
     *          'Meu site' => '//meusite.com.br/'
     *      ], false);
     */
    public function setMenuList($list, $sort = true){
        $this->sort_menu_list = $sort;
        $this->menu_list = $list;
        return $this;
    }

    // Adiciona um conteúdo (HTML) no final do body
    public function setBody($html){
        $this->html_body = $this->_tab("\n$html", 2);
        return $this;
    }

    // Adiciona um conteúdo (HTML) ao footer (à direita)
    public function setFooter($html){
        $this->html_footer = $this->_tab("\n$html", 4);
        return $this;
    }

    private function _tab(string $str, $tab = 3):string
    {
        $string = '';
        foreach(preg_split("/((\r?\n)|(\r\n?))/", $str) as $line)
            $string .= $this->tab($tab) . "$line\n";
        return $string;
    }

    private function tab($count):string
    {
        $spaces = '';
        for($i=0;$i < $count;$i++)
            $spaces .= '    ';
        return $spaces;
    }

    // Constrói a página
    public function build()
    {
        if ($this->builded) return;

        ob_start();

        // CSS Style
        $css = '';
        if ($this->css) {
            $css .= "\r\n\r\n\t\t<!-- App style -->";
            foreach($this->css as $c) $css .= $c;
        }

        // js
        if ($this->js) {
            $script = "\r\n\r\n\t\t<!-- App script -->";
            foreach($this->js as $js) $script .= $js;
            $this->js_inline = "{$script}{$this->js_inline}";
        }

        // Menu Apps
        $default = dirname(__FILE__, 5) . DIRECTORY_SEPARATOR . "siger.txt";
        if (is_array($this->menu_list) and !empty($this->menu_list)) {
            $_menu = $this->menu_list;
        } else {
            $menu_list = substr($this->menu_list, 0, 1) === '/' ? $_SERVER['DOCUMENT_ROOT'] . $this->menu_list : $this->menu_list;
            $_menu = file_exists($menu_list) ? $menu_list : (file_exists($default) ? $default : false);
        }
        if ($_menu) {
            $menu = array();
            if (gettype($_menu) === 'string') {
                $_new_menu = array();
                foreach(preg_split("/((\r?\n)|(\r\n?))/", file_get_contents($_menu)) as $line) {
                    $line = explode('|', $line);
                    $_new_menu[$line[0]] = $line[1];
                }
                $_menu = $_new_menu;
            }

            $menu_apps = '';
            if ($this->sort_menu_list) ksort($_menu);
            foreach($_menu as $title => $link) {
                if ($title === $this->title) continue;
                $menu_apps .= "\n{$this->tab(8)}<li class=hidden>";
                $menu_apps .=     "<a href=\"{$link}\">";
                $menu_apps .=         "<span>{$title}</span>";
                $menu_apps .=     "</a>";
                $menu_apps .= "</li>";
            }
        }
        $this->body = str_replace('{menu_apps}', isset($menu_apps) ? $menu_apps : '', $this->body);

        // Texto do botão de menu ($title), caso menu_title seja true
        $menu_title = $this->title;
        if (!$this->menu_title)
            $menu_title = '';

        if (strpos($_SERVER['REQUEST_URI'], $this->template_dir) !== false)
            $this->template_dir = '';

        $this->head = str_replace('{template_dir}', $this->template_dir, $this->head); // Diretório do template
        $this->head = str_replace('{app_css}', $css, $this->head); // Adiciona os CSS's à página
        $this->head = str_replace('{title}', $this->title, $this->head); // Adiciona título à página
        $this->body = str_replace('{title}', $menu_title, $this->body); // Altera o texto do botão de menu ($title)
        $this->body = str_replace('{html_menu}', $this->html_menu, $this->body); // Adiciona código html ao menu à direita
        $this->body = str_replace('{html_body}', $this->html_body, $this->body); // Adiciona código html no final de body
        $this->footer = str_replace('{footer}', $this->html_footer, $this->footer); // Adiciona código html ao footer
        $this->footer = str_replace('{template_dir}', $this->template_dir, $this->footer); // Diretório do template
        $this->footer = str_replace('{app}', $this->app, $this->footer); // Define o nome do App

        echo "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n";
        echo "\t<head>\n\t\t{$this->head}";
        echo "\n\t</head>";
        flush();ob_flush();
        echo "\n\t<body class=\"noselect\" data-theme=\"{$this->theme}\" onload=\"init();\">{$this->body}\n";
        echo "\n\t\t{$this->footer}";
        echo $this->js_inline;
        echo "\n\t</body>\n</html>";
        $this->builded = true;
        ob_end_flush();
    }
}
