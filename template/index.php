<?php

$app = 'myapp';
$title = 'Siger\'s';
$version = '1.0.0';

define('DS', DIRECTORY_SEPARATOR);

require_once 'class.template.php';

$template = new Template();

$template->setApp($app)->setMenuList([
    'siger.win' => 'https://siger.win/'
])->setTitle($title)->setVersion($version)->build();
