<?php

/** Siger's Template Class
 *
 * @version: 1.0.3
 * @since: 1.0
 * @author misteregis (https://siger.win)
 *
 */
class Template
{
    /**
     * O título do App
     *
     * @var string
     */
    private string $title = 'Siger\'s';

    /**
     * Uma lista onde conterá os itens de menu a partir de uma lista (array) ou arquivo
     *
     * @var string|array
     */
    private $menu_list;

    /**
     * Conterá o código HTML que será adicionado ao menu (à direita)
     *
     * @var string
     */
    private string $html_menu = '';

    /**
     * Conterá o código HTML que será adicionado ao final do body
     *
     * @var string
     */
    private string $html_body = '';

    /**
     * Conterá o código HTML que será adicionado ao footer (à direita)
     *
     * @var string
     */
    private string $html_footer = '';

    /**
     * Diretório do template
     *
     * @var string
     */
    private string $template_dir = 'lib/siger/template/';

    /**
     * Verdadeiro para ordenar os itens do menu do menor > maior
     *
     * @var bool
     */
    private bool $sort_menu_list = true;

    /**
     * Tema do App (padrão dark)
     *
     * @var string
     */
    private string $theme = 'dark';

    /**
     * O cabeçalho (head)
     *
     * @var string
     */
    protected string $head = "<meta charset=utf-8>
        <title>{title} - ® MS ® Siger</title>
        <meta name=\"description\" content=\"{title} by Misteregis\">
        <meta name=\"author\" content=\"Misteregis\">

        <!-- Template style -->
        <link rel=stylesheet href=\"{template_dir}style.css\">
        <link rel=stylesheet href=\"{template_dir}style.ie.css\">

        <!-- favicon -->
        <link rel=\"shortcut icon\" href=\"favicon.ico\">
        {app_prefetch}
		{app_css}
		{app_js_header}";

    /**
     * O corpo (body)
     *
     * @var string
     */
    protected string $body = '
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

    /**
     * O rodapé (footer)
     *
     * @var string
     */
    protected string $footer = '<div id="footer">
            <div class="container">
                <p class="text-muted credit">Desenvolvido por <a href="#" target="_blank">Misteregis</a>.</p>
                <div id="pageload"></div>
                <div class="right">{footer}</div>
            </div>
        </div>

        <!-- Template script -->
        <script src="{template_dir}script.js?app={app}"></script>
        <script src="{template_dir}../main.js"></script>';

    /**
     * Um link prefetch é um mecanismo do navegador, que utiliza o tempo ocioso do navegador para baixar ou
     * pré-buscar (prefetch) documentos que o usuário pode visitar em um futuro próximo
     *
     * @var array
     */
    private array $prefetch = array();

    /**
     * Verdadeiro se o App já estiver sido construído
     *
     * @var bool
     */
    private bool $builded = false;

    /**
     * Lista (array) contendo os CSS's
     *
     * @var array
     */
    private array $css = array();

    /**
     * Lista (array) contendo os JS's
     *
     * @var array
     */
    private array $js = array();

    /**
     * Menu Apps
     *
     * @var string
     */
    private string $menu = '';

    /**
     * Irá conter os códigos JS (script inline)
     *
     * @var string
     */
    private string $js_inline = '';
    /**
     * Versão do App
     *
     * @var string
     */
    private string $version = '';

    /**
     * Conterá os código para a tag HEAD
     *
     * @var array
     */
    private array $jshead = array();
    /**
     * Nome do App
     *
     * @var string
     */
    private string $app;

    /**
     * Ativa / desativa texto do menu (padrão: $title)
     *
     * @var bool
     */
    public bool $menu_title = true;

    public function __construct($file = __FILE__)
    {
        $this->menu = dirname($file) . DS . ".." . DS . "siger.txt";
    }

    /**
     * Define o nome do App
     *
     * @param  string $app O nome do App.
     * @return Template
     */
    public function setApp(string $app):Template
    {
        $this->app = $app;

        return $this;
    }

    /**
     * Define a versão no final da url do arquivo
     *
     * @param  int|string $v A versão do arquivo.
     * @return Template
     */
    public function setVersion($v):Template
    {
        $this->version = "?v={$v}";

        return $this;
    }

    /**
     * Define o título do App
     *
     * @param  string $title O título do App.
     * @return Template
     */
    public function setTitle(string $title):Template
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Define o tema do App
     *
     * @param  string $theme O tema (dark / light).
     * @return Template
     */
    public function setTheme(string $theme):Template
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * Adiciona uma tag script (inline) após o último script
     *
     * @param  string $js O código JS inline.
     * @return Template
     */
    public function setScript(string $js):Template
    {
        $this->js_inline .= "\r\n\t\t<script>\n{$this->_tab($js)}\t\t</script>";

        return $this;
    }

    /**
     * Adiciona uma tag link (prefetch) ao head
     *
     * @param  string|array $prefetch Um texto (string) ou uma lista (array) contendo os links (url) prefetch.
     * @param  bool $version Exibe ou não a versão no final do link (url).
     * @return Template
     */
    public function setPrefetch($prefetch, bool $version = true):Template
    {
        $v = $version ? $this->version : "";

        if (gettype($prefetch) === 'array')
            foreach($prefetch as $p) $this->prefetch[$p] = "\r\n\t\t<link rel=\"prefetch\" href=\"{$p}{$v}\">";
        else
            $this->prefetch[$prefetch] = "\r\n\t\t<link rel=\"prefetch\" href=\"{$prefetch}{$v}\">";

        return $this;
    }

    /**
     * Adiciona uma tag link (stylesheet) ao head
     *
     * @param  string|array $css Um texto (string) ou uma lista (array) contendo os links (url) css.
     * @param  bool $version Exibe ou não a versão no final do link (url).
     * @return Template
     */
    public function setCSS($css, bool $version = true):Template
    {
        $v = $version ? $this->version : "";

        if (gettype($css) === 'array')
            foreach($css as $c) $this->css[$c] = "\r\n\t\t<link rel=\"stylesheet\" href=\"{$c}{$v}\">";
        else
            $this->css[$css] = "\r\n\t\t<link rel=\"stylesheet\" href=\"{$css}{$v}\">";

        return $this;
    }

    /**
     * Adiciona uma tag script ao final da página
     *
     * @param  string|array $js Um texto (string) ou uma lista (array) contendo os links (url) js.
     * @param  bool $version Exibe ou não a versão no final do link (url).
     * @return Template
     */
    public function setJS($js, bool $version = true):Template
    {
        $v = $version ? $this->version : "";

        if (gettype($js) === 'array')
            foreach($js as $s) $this->js[$s] = "\r\n\t\t<script src=\"{$s}{$v}\"></script>";
        else
            $this->js[$js] = "\r\n\t\t<script src=\"{$js}{$v}\"></script>";

        return $this;
    }

    /**
     * Adiciona uma tag script head
     *
     * @param  string|array $js Uma string contendo os links (url), um texto (string) contendo o código
     * javascript ou uma lista (array) contendo os links (url) ou códigos js.
     * @param  bool $file Verdadeiro para tratar o $js como arquivo (link - url)
     * ou falso para tratar o $js como código javascript.
     * @param  bool $version Exibe ou não a versão no final do link (url).
     * @return Template
     */
    public function setJSHeader($js, bool $file = true, bool $version = true):Template
    {
        $v = $version ? $this->version : "";

        if ($file) {
            if (gettype($js) === 'array')
                foreach($js as $s) $this->jshead[$s] = "\r\n\t\t<script src=\"{$s}{$v}\"></script>";
            else
                $this->jshead[$js] = "\r\n\t\t<script src=\"{$js}{$v}\"></script>";
        } else
            $this->jshead[$js] = "\r\n\t\t<script>{$js}</script>";

        return $this;
    }

    /**
     * Adiciona um conteúdo (HTML) ao menu (à direita)
     *
     * @param  string $html O código HTML.
     * @return Template
     */
    public function setMenu(string $html):Template
    {
        $this->html_menu = $this->_tab("\n$html", 7) . $this->tab(6);

        return $this;
    }

    /*
     * Cria um menu apartir de uma lista array("título" => "url") ou um arquivo de texto (real ou relativo)
     *
     * O arquivo de texto tem que ser separado por "|", por exemplo:
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
    public function setMenuList($list, $sort = true):Template
    {
        $this->sort_menu_list = $sort;
        $this->menu_list = $list;

        return $this;
    }

    /**
     * Adiciona um conteúdo (HTML) no final do body
     *
     * @param  string $html O código HTML.
     * @return Template
     */
    public function setBody(string $html):Template
    {
        $this->html_body = $this->_tab("\n$html", 2);

        return $this;
    }

    /**
     * Adiciona um conteúdo (HTML) ao footer (à direita)
     *
     * @param  string $html O código HTML.
     * @return Template
     */
    public function setFooter(string $html):Template
    {
        $this->html_footer = $this->_tab("\n$html", 4);

        return $this;
    }

    private function _tab($str, $tab = 3):string
    {
        $string = '';

        foreach(preg_split("/((\r?\n)|(\r\n?))/", $str) as $line)
            $string .= $this->tab($tab) . "$line\n";

        return $string;
    }

    private function tab($count):string
    {
        $spaces = '';

        for($i=0;$i < $count;$i++) $spaces .= '    ';

        return $spaces;
    }

    /**
     * Constrói a página
     *
     * @return void
     */
    public function build():void
    {
        if ($this->builded) return;

        ob_start();

        // Prefetch
        $prefetch = '';
        if ($this->prefetch) {
            $prefetch .= "\r\n\r\n\t\t<!-- App Prefetch -->";

            foreach($this->prefetch as $p) $prefetch .= $p;
        }

        // CSS Style
        $css = '';

        if ($this->css) {
            $css .= "\r\n\t\t<!-- App style -->";
            foreach($this->css as $c) $css .= $c;
        }

        // JS Head Script
        $jshead = '';

        if ($this->jshead) {
            $jshead .= "\r\n\t\t<!-- App script -->";
            foreach($this->jshead as $c) $jshead .= $c;
        }

        // js
        if ($this->js) {
            $script = "\r\n\r\n\t\t<!-- App script -->";
            foreach($this->js as $js) $script .= $js;
            $this->js_inline = "{$script}{$this->js_inline}";
        }

        if (is_array($this->menu_list) && !empty($this->menu_list)) {
            $_menu = $this->menu_list;
        } else {
            $this_menu = file_exists($this->menu) ? $this->menu : false;
            $menu_list = substr($this->menu_list, 0, 1) === '/' ? $_SERVER['DOCUMENT_ROOT'] . $this->menu_list : $this->menu_list;
            $_menu = file_exists($menu_list) ? $menu_list : $this_menu;
        }

        if ($_menu) {
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

        $this->head = str_replace('{app_js_header}', $jshead, $this->head);                 // Scripts no header
        $this->head = str_replace('{template_dir}', $this->template_dir, $this->head);      // Diretório do template
        $this->head = str_replace('{app_prefetch}', $prefetch, $this->head);                // Adiciona os CSS's à página
        $this->head = str_replace('{app_css}', $css, $this->head);                          // Adiciona os CSS's à página
        $this->head = str_replace('{title}', $this->title, $this->head);                    // Adiciona título à página
        $this->body = str_replace('{title}', $menu_title, $this->body);                     // Altera o texto do botão de menu ($title)
        $this->body = str_replace('{html_menu}', $this->html_menu, $this->body);            // Adiciona código html ao menu à direita
        $this->body = str_replace('{html_body}', $this->html_body, $this->body);            // Adiciona código html no final de body
        $this->footer = str_replace('{footer}', $this->html_footer, $this->footer);         // Adiciona código html ao footer
        $this->footer = str_replace('{template_dir}', $this->template_dir, $this->footer);  // Diretório do template
        $this->footer = str_replace('{app}', $this->app, $this->footer);                    // Define o nome do App

        echo "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n";
        echo "\t<head>\n\t\t{$this->head}";
        echo "\n\t</head>";

        flush();
        ob_flush();

        echo "\n\t<body class=\"noselect\" data-theme=\"{$this->theme}\" onload=\"init();\">{$this->body}\n";
        echo "\n\t\t{$this->footer}";
        echo $this->js_inline;
        echo "\n\t</body>\n</html>";

        $this->builded = true;

        ob_end_flush();
    }
}
