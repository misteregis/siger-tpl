/*! Siger's Template Class - 2022-08-06
 *
 * @version: 1.3.1
 *
 * https://siger.win
 *
 */

if (typeof window.URL !== 'function') {
    window.URL = function (url) {
        url = (url || "").toString();

        var param = {}, search = "";

        if (!url || url.split("//").length !== 2)
            return console.error("Falha ao construir 'URL': 1 argumento necessário, mas apenas 0 presentes.");

        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, k, v) { param[k] = v.split("#")[0]; search += m });

        var _url = url.split("//"),
            _u = _url[1],
            _hash = _u.split("#"),
            hash = _hash[1] ? "#" + _hash[1] : "",
            host = _url[1].split("/")[0],
            hostname = host.split(":")[0],
            port = host.split(":")[1] ? host.split(":")[1] : "",
            pathname = _url[1].replace(host, "").replace(search, "").replace(hash, "");

        this.hash = hash;
        this.host = host;
        this.hostname = hostname;
        this.href = url;
        this.origin = _url[0] + "//" + host;
        this.pathname = pathname;
        this.port = port;
        this.protocol = _url[0];
        this.search = search.split("#")[0];
        this.searchParams = {
            get: function (key) { return param[key] || null },
            getAll: function () { return param || null }
        };
    }
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        value: function (obj) {
            return this.filter(function (el) { return el == obj }).length > 0;
        }
    });
}

var scripts = document.getElementsByTagName("script"),
    url = new URL("https://" + scripts[0].getAttribute("src")),
    app = url.searchParams.get("app");

var assign = function () {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target) {
            'use strict';

            if (target === undefined || target === null)
                throw new TypeError('Cannot convert first argument to object');

            var to = Object(target);

            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];

                if (nextSource === undefined || nextSource === null)
                    continue;

                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));

                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

                    if (desc !== undefined && desc.enumerable)
                        to[nextKey] = nextSource[nextKey];
                }
            }

            return to;
        }
    });
};

var padStart = function (targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');

    if (this.length > targetLength)
        return String(this);
    else {
        targetLength = targetLength - this.length;

        if (targetLength > padString.length)
            padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed

        return padString.slice(0, targetLength) + String(this);
    }
};

var zeroPad = function () {
    var length = arguments[0] || 4, add = arguments[1] || "0";

    return this.toString().padStart(length || 4, add || "0");
};

/**
 * String.capitalize(): Primeira letra maiúscula
 * @param {string} str A string a ser capitalizada.
 * @example
 * 'misteregis'.capitalize(); // 'Misteregis'
 * 'SIGER'.capitalize(); // 'Siger'
 * @return {string} A string capitalizada.
 */
var capitalize = function (str) {
    str = (str || this).toLowerCase().trim();

    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * String.format(): Formatar texto
 * @example
 * 'Meu nome é {0}, eu moro em {1}, trabalho na {2}.'.format('Reginaldo', 'Niterói', 'SMF');
 *
 * // Resultado:
 * 'Meu nome é Reginaldo, eu moro em Niterói, trabalho na SMF.'
 * @return {string} A string formatada.
 */
var format = function () {
    var args = [];

    for (var k in arguments) args.push(arguments[k]);

    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match ;
    });
};

var fadeIn = function () {
    if (this.length) {
        for (var i = 0; i < this.length; i++)
            this[i].fadeIn(arguments);

        return this;
    }

    if (typeof arguments[0] === 'object') {
        var args = [];

        for (var k in arguments[0])
            args[k] = arguments[0][k];

        arguments = args;
    }

    var secs = !isNaN(arguments[0]) ? arguments[0] : .4,
        func = typeof arguments[0] === 'function' ? arguments[0] : (
            typeof arguments[1] === 'function' ? arguments[1] : null
        );

    if (secs === 0) {
        $style = this.style;
        $style.opacity = 1;
        $style.display = 'inline-block';
        $style.visibility = 'visible';

        return this;
    }

    this.style.opacity = 0;
    this.style.filter = "alpha(opacity=0)";
    this.style.display = "inline-block";
    this.style.visibility = "visible";

    var $this = this, opacity = 0;
    var timer = setInterval(function () {
        opacity += 50 / (secs * 1000);

        if (opacity >= 1) {
            clearInterval(timer);
            opacity = 1;

            if (func) func($this);
        }

        $this.style.opacity = opacity;
        $this.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50);

    return $this;
};

var fadeOut = function () {
    if (this.length) {
        for (var i = 0; i < this.length; i++)
            this[i].fadeOut(arguments);

        return this;
    }

    if (typeof arguments[0] === 'object') {
        var args = [];
        for (var k in arguments[0])
            args[k] = arguments[0][k];

        arguments = args;
    }

    var secs = !isNaN(arguments[0]) ? arguments[0] : .4,
        func = typeof arguments[0] === 'function' ? arguments[0] : (
            typeof arguments[1] === 'function' ? arguments[1] : null
        );

    if (secs === 0) {
        $style = this.style;
        $style.opacity = 0;
        $style.display = 'none';
        $style.visibility = 'hidden';

        return this;
    }

    var $this = this, opacity = 1;
    var timer = setInterval(function () {
        opacity -= 50 / (secs * 1000);

        if (opacity <= 0) {
            clearInterval(timer);
            opacity = 0;
            $this.style.display = "none";
            $this.style.visibility = "hidden";

            if (func) func($this);
        }

        $this.style.opacity = opacity;
        $this.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50);

    return $this;
};

var html = function () {
    if (this.length) { for (var i = 0; i < this.length; i++) { this[i].html(arguments); } return this }
    if (typeof arguments[0] === 'object') arguments[0] = arguments[0][0];
    if (!arguments[0]) return this.outerHTML;

    return this.innerHTML = typeof arguments[0] === 'object' ? arguments[0].outerHTML : arguments[0];
};

var text = function () {
    if (this.length) { for (var i = 0; i < this.length; i++) { this[i].text(arguments); } return this }
    if (typeof arguments[0] === 'object') arguments[0] = arguments[0][0];
    if (!arguments[0]) return this.innerText;

    return this.innerText = typeof arguments[0] === 'object' ? arguments[0].innerText : arguments[0];
};

var show = function () { return this.fadeIn(0) };
var hide = function () { return this.fadeOut(0) };

var append = function () {
    if (this.length) return this._each(arguments);
    var $div = document.createElement('div');
    $div.innerHTML = arguments[0].trim();

    return this.appendChild($div.firstChild);
};

var setScaledFont = function () {
    if (this.length) return this._each(arguments);
    var f = arguments[0],
        s = this.offsetWidth,
        fs = s * (f ? f : .35);

    return this.style.fontSize = fs + '%';
};

var _each = function () {
    for (var i = 0; i < this.length; i++)
        this[i][arguments[0].callee.name](arguments[0][0]);

    return this;
};

/**
 * [case insensitive]
 * __call(FNAME, FTYPE): Cria uma função prototype com nome e tipo da função
 * - FNAME: Nome da função
 * - FTYPE: Tipo da função (pode ser vários separados por vírgula)
 *
 *
 * @example
 * __call('setScaledFont', 'NodeList,Element');
 * // O exemplo acima irá criar dois prototype para a função 'setScaledFont'
 * // Um do tipo 'NodeList' e outro do tipo 'Element':
 * NodeList.prototype.setScaledFont = setScaledFont;
 * Element.prototype.setScaledFont = setScaledFont;
 *
 * //--------------------------------------------------------------------------//
 * // __call(Object): Cria uma ou mais funções prototype a partir de um objeto
 * // Exemplo:
 * __call({
 *   setScaledFont: 'NodeList,Element',
 *   capitalize: 'String'
 * });
 * // O exemplo acima irá criar dois prototype para a função 'setScaledFont' e um prototype para a função 'capitalize'
 * // [setScaledFont] um prototype do tipo 'NodeList' e outro do tipo 'Element':
 * NodeList.prototype.setScaledFont = setScaledFont;
 * Element.prototype.setScaledFont = setScaledFont;
 * //
 * // [capitalize] um prototype do tipo 'String':
 * String.prototype.capitalize = capitalize;
 */
var __call = function () {
    if (typeof arguments[0] === 'object') {
        for (var k in arguments[0])
            __call(k, arguments[0][k]);
        return;
    }
    var f = arguments[0], ftype = arguments[1],
        _capitalize = { Nodelist: 'NodeList' };

    ftype.split(',').forEach(function (t, _) {
        t = capitalize(t);
        t = _capitalize[t] || t;

        if (t === 'Object') {
            if (!$.fn[f]) $.fn[f] = eval(f);
        } else {
            eval(t).prototype[f] = eval(f);
        }
    });
};


if (!window.jQuery) {
    window.$ = function (selector) {
        if (typeof selector === 'object') return selector;

        return document.querySelectorAll(selector)
    }

    $.fn = {}
    $.isFunction = function (functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    window.jQuery = $;
}

if (!Object.assign) assign();

var SIGER = SIGER || {};

SIGER = Object.assign({

    /**
     * SIGER.set(key, value): Salva dados no localStorage na chave Siger[app]
     * você também pode salvar dados com subchaves separando-os com ponto (.)
     *
     * @param {string} key Chave a ser salva.
     * @param {*} value Valor a ser salva.
     * @example
     * var appKey = 'meu_app';
     * SIGER.set('teste', 'Meu teste');
     * SIGER.set('config', {theme:'dark'});
     * SIGER.set('config.site.title', 'Meu Site');
     *
     * // Resultado:
     * // { "teste": "Meu teste" }
     * // { "config": { "theme": "dark" } }
     * // { "config": { "site": {"title":"Meu Site"} } }
     * @returns {Object} A configuração.
     */
    set: function (key, value) {
        if (typeof app === 'string') {
            if (key && value) {
                var sets = this.get(),
                    _siger = JSON.parse(localStorage.Siger),
                    keys = key.split('.'),
                    $eval = 'sets';

                for (var k in keys) {
                    $eval += '["' + keys[k] + '"]';

                    if (typeof eval($eval) === 'undefined')
                        eval($eval + ' = {}')
                }
                if (typeof value === 'object')
                    $eval += ' = ' + JSON.stringify(value);
                else
                    $eval += ' = "' + value + '"';

                eval($eval);
                _siger[app] = sets
                localStorage.Siger = JSON.stringify(_siger);

                return sets;
            }
        } else {
            console.info('A variável "app" não está definida');
        }
    },

    /**
     * SIGER.get(key): Obtém um ou todos os dados em localStorage na chave Siger[app]
     * você também pode obter dados em subchaves separando-as com ponto (.)
     *
     * @param {string} key Chave a ser obtida.
     * @example
     * var appKey = 'meu_app';
     * var all    = SIGER.get(); // (object) { "teste": "Meu teste", "config" : { "theme": "dark" } }
     * var teste  = SIGER.get('teste'); // (string) "Meu teste"
     * var config = SIGER.get('config'); // (object) {"theme":"dark"}
     * var theme  = SIGER.get('config.theme') // (string) "dark"
     * @returns {*} A configuração.
     */
    get: function (key, _default) {
        if (typeof app === 'string') {
            if (!localStorage.Siger)
                localStorage.Siger = JSON.stringify({});

            var sets = JSON.parse(localStorage.Siger);

            if (!sets[app]) {
                sets[app] = _default || {};
                localStorage.Siger = JSON.stringify(sets);
            }

            if (key) {
                var found = true,
                    $eval = 'sets[app]',
                    keys = key.split('.');

                for (var k in keys) {
                    $eval += '["' + keys[k] + '"]';
                    if (typeof eval($eval) === 'undefined') {
                        console.info('A chave ' + $eval.replace('sets[app]', '') + ' não foi encontrada.');
                        found = false;
                        break;
                    }
                }

                return found ? eval($eval) : null;
            }

            return sets[app];
        } else {
            console.info('A variável "app" não está definida');
        }
    },

    /**
     * SIGER.getAll(): Obtém todos os dados em localStorage na chave Siger[app]
     * você também pode obter dados em subchaves separando-as com ponto (.)
     *
     * @returns {Object} A configuração.
     */
    getAll: function () { return this.get() },

    /**
     * SIGER.del(key): Deleta um ou todos os dados em localStorage na chave Siger[app]
     * você também pode excluir dados em subchaves separando-as com ponto (.)
     *
     * @param {string} key Chave a ser removida.
     * @example
     * SIGER.del('teste');
     * SIGER.del('config');
     * SIGER.del('config.theme');
     * @returns {void} Nada.
     */
    del: function (key) {
        if (typeof app === 'string') {
            if (key) {
                var _siger = JSON.parse(localStorage.Siger),
                    keys = key.split('.'),
                    sets = this.get(),
                    $eval = 'sets';

                for (var k in keys) {
                    $eval += '["' + keys[k] + '"]';

                    if (typeof eval($eval) === 'undefined') {
                        console.info('A chave ' + $eval.replace('sets[app]', '') + ' não foi encontrada.');
                        break;
                    }
                }
                eval('delete ' + $eval);
                _siger[app] = sets;
                localStorage.Siger = JSON.stringify(_siger);
            } else {
                console.info('Nenhuma chave definida');
            }
        } else {
            console.info('A variável "app" não está definida');
        }
    },

    /**
     * SIGER.focusTextToEnd(element): Foca o elemento e coloca o marcador no fim
     * @param {Element} element O elemento.
     * @returns {void} Nada.
     */
    focusTextToEnd: function (element) {
        var v = element.value;
        element.focus();
        element.value = '';
        element.value = v;
    },

    /**
     * SIGER.editInLine(element, callback): Edita um elemento em linha e executa o callback (caso exista)
     * O callback irá retornar três parâmetros callback(elemento, valor_antigo, novo_valor)
     * @param {Element} element O elemento.
     * @param {function(Element,string,string):void} callback A função de retorno.
     * @returns {void} Nada.
     */
    editInLine: function (element, callback) {
        if (!element.querySelector('input')) {
            var t = element.textContent, o = t,
                $input = document.createElement('input');

            $input.setAttribute('class', 'editInLine');
            $input.setAttribute('value', t);
            element.innerHTML = '';
            element.appendChild($input);

            setTimeout(function () { SIGER.focusTextToEnd($input) }, 100);

            $input.addEventListener('keyup', function (event) {
                var keycode = event.keyCode || event.which;

                var v = this.value.trim();
                if (keycode === 13) {
                    if (callback && t !== v) {
                        t = v; element.textContent = v;
                        callback(element, o, v);
                    } else {
                        element.textContent = v;
                    }
                }
            });

            $input.addEventListener('blur', function (_) {
                this.disabled = true;
                var v = this.value.trim();

                element.textContent = v;

                if (callback && t !== v)
                    callback(element, o, v);
            });
        }
    },

    /**
     * SIGER.array_flip(): Troca a chave por valor de um Object ou Array
     * @param {(Object|Array)} $array O objeto a ser trocado.
     * @example
     * var obj = { "author": "misteregis", "mark": "Siger" };
     * var obj_flip = SIGER.array_flip(obj);
     *
     * // Resultado:
     * obj_flip = { "misteregis": "author", "siger": "mark" }
     * @returns {Object} O objeto trocado.
     */
    array_flip: function ($array) {
        return Object.keys($array)
            .filter($array.hasOwnProperty.bind($array))
            .reduce(function (obj, key) {
                obj[$array[key].toLowerCase()] = key;

                return obj;
            }, {});
    },

    /**
     * SIGER.in_array(): Verifica se uma chave existe num array
     * @param {string} $needle A string a ser encontrada.
     * @param {Array} $haystack O array a ser verificado.
     * @example
     * var arr = ['account disabled','welcome','dialog-login','dialog-view','close'];
     * var exists1 = SIGER.in_array('welcome', arr); // true
     * var exists2 = SIGER.in_array('welCOME', arr); // false
     * @returns {boolean} Verdadeiro ou falso.
     */
    in_array: function ($needle, $haystack) { return $haystack.indexOf($needle) > -1 },

    /**
     * SIGER.remove(): Remove um elemento de um Object ou Array pela chave
     * @param {(Object|Array)} obj O objeto/array.
     * @param {string} key A chave a ser removida.
     * @example
     * var obj = {author:'misteregis',mark:'Siger'};
     * var arr = ['misteregis', 'Siger'];
     * obj = SIGER.remove(obj, 'mark');
     * arr = SIGER.remove(arr, 'Siger');
     *
     * //Resultado:
     * obj = {author:"misteregis"}
     * arr = ["misteregis"]
     * @returns {(Object|Array)} Object/Array
     */
    remove: function (obj, key) {
        if (Array.isArray(obj))
            obj.splice(key, 1);
        else if (obj != null && typeof obj == 'object')
            delete obj[key];
        return obj;
    },

    /**
     * SIGER.toDay(): Obtém a date de hoje por extenso
     * @example
     * SIGER.toDay(); // Niterói, 5 de agosto de 2022
     * @return {string}
     */
    toDay: function () {
        var today = new Date(),
            dd = today.getDate(),
            month = today.toLocaleString('pt-BR', { month: 'long' }),
            yyyy = today.getFullYear();

        return 'Niterói, {0} de {1} de {2}'.format(dd, month, yyyy);
    },

    /**
     * SIGER.dateObj(): Objeto contendo o dia, mês, ano, hora, minuto e segundos atual
     * @param {(number|Date|string)} key Pode ser objeto, data ou string.
     * @param {string} key2 Apenas string.
     * @param {string} rKey Apenas string.
     * @example
     * var d_obj = SIGER.dateObj('obj'); // { "year": 2022, "day": 5, "hour": "15", "minute": "48", "second": "39", … }
     * var ano = d_obj.year; // 2022
     * var mes = d_obj['month'].number; // 8
     * var dia = d_obj['day']; // 5
     * @returns {Object}
     */
    dateObj: function (key, key2, rKey) {
        var d = new Date();

        if (key && !isNaN(key)) {
            if (key.toString().length === 10 || key.toString().length === 13) {
                if (key.toString().length === 10)
                    key = new Date(key * 1000);
                else
                    key = new Date(key);
            }
        }

        if (key instanceof Date) {
            d = key;

            if (key2) {
                key = key2;
                key2 = null;
            }
        }

        if (key === 'timestamp')
            return Math.floor(d.getTime() / 1000);

        if (key === 'today')
            d.setHours(0, 0, 0, 0);

        if (key === 'yesterday')
            d.setDate(d.getDate() - 1);

        if (key === 'sevenday')
            d.setDate(d.getDate() - 7);

        var year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours().zeroPad(2),
            minute = d.getMinutes().zeroPad(2),
            second = d.getSeconds().zeroPad(2),
            weekday = d.getDay();

        var longmonth = d.toLocaleString('pt-BR', { month: 'long' }),
            longweekday = d.toLocaleString('pt-BR', { weekday: 'long' }),
            shortmonth = d.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
            shortweekday = d.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '');

        var obj = { timestamp: Math.floor(d.getTime() / 1000), year: year, day: day, hour: hour, minute: minute, second: second };
        obj.weekday = { number: weekday, long: longweekday, short: shortweekday };
        obj.month = { number: month, long: longmonth, short: shortmonth };
        obj.fulldate = parseInt([year, month, day, hour, minute, second].map(function (n) {
            var number = n.toString();

            if (number.length < 2)
                number = number.padStart(2, '0');

            return number;
        }).join(''));

        obj.ampm = d.getHours() >= 12 ? 'pm' : 'am';
        obj.ampmupper = obj.ampm.toUpperCase();
        obj.date = d;

        if (obj.hasOwnProperty(rKey)) {
            if (obj[rKey].hasOwnProperty(key)) return obj[rKey][key];
            if (obj[rKey].hasOwnProperty(key2)) return obj[rKey][key2];

            return obj[rKey];
        }

        if (obj.hasOwnProperty(key2)) {
            if (obj[key2].hasOwnProperty(key)) return obj[key2][key];
            if (obj[key2].hasOwnProperty(rKey)) return obj[key2][rKey];

            return obj[key2];
        }

        if (obj.hasOwnProperty(key)) {
            if (obj[key].hasOwnProperty(key2)) return obj[key][key2];
            if (obj[key].hasOwnProperty(rKey)) return obj[key][rKey];

            return obj[key];
        }

        if (key === 'obj' || key2 === 'obj' || rKey === 'obj')
            return obj;

        return d;
    },

    /**
     * SIGER.formatDate(): Formata data e hora apartir do timestamp.
     * Formata data e hora apartir do timestamp
     * @param {(
     *    null|
     *    Date|
     *    number|
     *    string|
     *    Object.<string,*>
     * )} $timestamp                                            Pode ser um objeto JSON, Date, string ou número (timestamp).
     * @param {string} $format                                  Formata a string (exemplo: dd/mm/YYYY)
     * @param {Boolean} $extend                                 Extende ou não a string.
     * @param {Boolean} $toLower                                Retorna tudo minúsculo (se verdadeiro).
     * @param {Boolean} $short                                  Retorna uma string curta (se verdadeiro).
     * @returns {string}
     */
    formatDate: function ($timestamp, $format, $extend, $toLower, $short) {
        var defaults = { timestamp: null, format: null, extend: false, toLower: false, short: false };
        var s = {};

        if (typeof $timestamp === 'number' || typeof $timestamp === 'string')
            $timestamp = SIGER.dateObj($timestamp);

        if ($timestamp instanceof Date)
            $timestamp = Math.floor($timestamp.getTime() / 1000);

        if ($timestamp instanceof Object)
            if ($timestamp.timestamp instanceof Date)
                $timestamp.timestamp = Math.floor($timestamp.timestamp.getTime() / 1000);

        if (typeof $timestamp === 'object')
            s = Object.assign(defaults, $timestamp);
        else
            s = Object.assign(defaults, {
                timestamp: $timestamp,
                toLower: $toLower,
                extend: $extend,
                format: $format,
                short: $short
            });

        if (!s.timestamp) s.timestamp = Date.now();

        var $dd = SIGER.dateObj(s.timestamp, 'obj'),
            $t = $dd.hour + ':' + $dd.minute,
            $w = $dd.weekday.long.split('-')[0],
            $m = $dd.month.long,
            $y = $dd.year,
            $d = $dd.day,
            $r = '';

        var $month = ($y === SIGER.dateObj() && $m === SIGER.dateObj().month.long) ? '' : ' de ' + $m,
            $year = $y === SIGER.dateObj().year ? '' : ' de ' + $y;

        var $sevendayTimestamp = SIGER.dateObj('sevenday', 'timestamp'),
            $yesterdayTimestamp = SIGER.dateObj('yesterday', 'timestamp'),
            $today = SIGER.dateObj('obj', 'today'), $now = SIGER.dateObj('obj'),
            $todayTimestamp = $today.timestamp;

        if (s.timestamp > $sevendayTimestamp) {
            $r = $w + ', dia ' + $d + $month + $year + ' às ' + $t;
        } else {
            $r = 'Dia ' + $d + $month + $year + ' às ' + $t;
        }

        var seconds = Math.round(($now.date - $dd.date) / 1000),
            minutes = Math.round(seconds / 60);

        if (s.format) {
            const map = {
                a: $dd.ampm,
                d: $dd.day.zeroPad(2),
                g: parseInt($dd.hour % 12),
                h: ($dd.hour % 12).zeroPad(2),
                i: $dd.minute,
                j: $dd.month.number,
                m: $dd.month.number.zeroPad(2),
                n: $dd.month.number,
                s: $dd.second,
                A: $dd.ampmupper,
                D: $dd.weekday.short,
                F: $dd.month.long,
                G: parseInt($dd.hour),
                H: $dd.hour.zeroPad(2),
                M: $dd.month.short,
                y: $dd.year.toString().slice(-2),
                Y: $dd.year
            }

            var regex = eval('/' + Object.keys(map).join('|') + '/gi');

            return s.format.replace(regex, function (matched) {
                return map[matched] ? map[matched] : matched
            });
        }

        if (s.short) {
            $r = $d.zeroPad(2) + '/' + $dd.month.number.zeroPad(2) + '/' + $y + ' ' + $t;

            if (s.timestamp >= $todayTimestamp)
                $r = 'Hoje às ' + $t;
            else if (s.timestamp >= $yesterdayTimestamp)
                $r = 'Ontem às ' + $t;

            return s.toLower ? $r.toLowerCase() : $r.capitalize();
        }

        if (!s.extend) {
            if (seconds < 5)
                return 'agora'
            else if (seconds < 60)
                return '{0} segundos atrás'.format(seconds)
            else if (seconds < 90)
                return 'cerca de um minuto atrás'
            else if (minutes < 60)
                return '{0} minutos atrás'.format(minutes)
            else if (minutes < 61)
                return 'Uma hora atrás'.format(minutes)

            if (s.timestamp >= $todayTimestamp)
                $r = 'Hoje às ' + $t;
            else if (s.timestamp >= $yesterdayTimestamp)
                $r = 'Ontem às ' + $t;
        }

        return s.toLower ? $r.toLowerCase() : $r.capitalize();
    },

    /**
     * SIGER.loadJSON(): Carrega objeto JSON via URL
     * @param {string} path A URL do arquivo JSON.
     * @param {function(Object):void} success A função chamada no caso de sucesso.
     * @param {function(string):void} error A função chamada no caso de erro.
     * @example
     * // Arquivo "file.json": { "author": "misteregis", "mark":"Siger" }
     * SIGER.loadJSON('file.json', function(json){console.log(json)});
     *
     * // Resultado:
     * // {author:'misteregis',mark:'Siger'}
     *
     */
    loadJSON: function (path, success, error) {
        var r = Math.floor(Math.random() * 99999) + 1;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr.statusText);
                }
            }
        };

        xhr.open("GET", path + '?r=' + r, true);
        xhr.send();
    },

    /**
     * SIGER.is_numeric(): Verifica se um valor é numéricou ou não, retornando true/false
     * @param {(string|Number)} n O número a ser verificado.
     * @example
     * SIGER.is_numeric(123456); // true
     * SIGER.is_numeric("123456"); //true
     * SIGER.is_numeric("A123456"); // false
     * @returns {boolean} Verdadeiro ou falso.
     */
    is_numeric: function (n) { return !isNaN(parseFloat(n)) && isFinite(n) },

    /**
     * SIGER.JSON.clone(): Clonar objeto (JSON)
     * @example
     * var obj = {author:'misteregis',mark:'Siger'}; // contém as chaves (author e mark) e os valores (misteregis e Siger)
     * var novo_obj = {}; [objeto vazio];
     *
     * novo_obj = SIGER.JSON.clone(obj);
     *
     * // Resultado:
     * novo_obj = {author:'misteregis',mark:'Siger'};
     * @returns {Object} JSON
     */
    JSON: {
        /**
         * Clona um objeto
         * @param {Object} obj O objeto a ser clonado.
         * @returns {Object} O novo objeto.
         */
        clone: function (obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    },

    /**
     * SIGER.merge(): Junta dois ou mais array ou json object em um
     * @example
     * var objA = {author:'misteregis',mark:'Siger'};
     * var objB = {year:'2020',by:'Siger'};
     * var objC = {windows:10,x:'x64'};
     *
     * objAB = SIGER.merge(objA, objB);
     * objABC = SIGER.merge(objA, objB, objC);
     *
     * // Resultado:
     * // objAB = {author: "misteregis", mark: "Siger", year: "2020", by: "Siger"};
     * // objABC = {author: "misteregis", mark: "Siger", year: "2020", by: "Siger", windows: 10, x: "x64"};
     * @returns {Object} Um novo objeto.
     */
    merge: function () {
        var obj = arguments[0] || null;

        if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++)
                for (var key in arguments[i])
                    obj[key] = arguments[i][key];

        return obj;
    },

    /**
     * SIGER.toBool(): Converte string boolean string ('true', 'false') para boolean
     * @param {string} $bool O boolean em string.
     * @example
     * var _f = SIGER.toBool('false'); // false
     * var _t = SIGER.toBool('true'); // true
     * @returns {boolean} Verdadeiro ou falso.
     */
    toBool: function ($bool) { return JSON.parse($bool.toString().toLowerCase()) },

    /**
     * Alterna o modo de cores (dark/light)
     * @param {string} $theme O tema (dark, light, toggle).
     * @returns {void}
     */
    setTheme: function ($theme) {
        var _theme = SIGER.get('theme');

        if ($theme === 'toggle') {
            var t = { dark: 'light', light: 'dark' };
            $theme = t[_theme];
        }

        if ($theme) {
            SIGER.set('theme', $theme);
            SIGER.cookie('theme', $theme);
        }

        if (!$theme && !_theme) {
            $theme = document.body.getAttribute('data-theme');
            SIGER.cookie('theme', $theme);
            SIGER.set('theme', $theme);
        } else {
            document.body.setAttribute('data-theme', ($theme || SIGER.get('theme')));
        }
    },

    /**
     * SIGER.cookie(): Cria, obtém ou exclui um cookie
     * @param {string} name O nome do Cookie.
     * @param {(string|number)} value O valor do Cookie.
     * @param {(string|number)} days O número de dias até expirar o Cookie (padrão 360).
     * @example
     * SIGER.cookie('tema', 'light', '3'); // Irá criar um cookie com nome "tema", valor "light" e duração "3 dias"
     * SIGER.cookie('tema'); // Irá obter o valor do cookie "tema", você também pode obter valor usando SIGER.cookie('get', 'tema');
     * SIGER.cookie('delete', 'tema'); // Irá excluir o cookie "tema", você também pode excluir usando SIGER.cookie(null, 'tema');
     * @returns {string=}
     */
    cookie: function (name, value, days) {
        days = days ? days : 360

        var path = new URL(window.location).pathname, cookie = {
            /**
             * Obtém um cookie
             * @param {string} n Nome do cookie.
             * @example
             * SIGER.cookie('tema'); // Irá obter o valor do cookie "tema", você também pode obter valor usando SIGER.cookie('get', 'tema');
             * @returns {string} O valor do cookie.
             */
            get: function (n) {
                if (n) name = n;

                var nameEQ = name + "=",
                    ca = document.cookie.split(';');

                for (var item of ca) {
                    while (item.charAt(0) == ' ') item = item.substring(1, item.length);

                    if (item.indexOf(nameEQ) == 0) return item.substring(nameEQ.length, item.length);
                }

                return null;
            },
            /**
             * Cria um cookie
             * @param {string} n Nome do Cookie.
             * @param {(string|number)} v Valor do Cookie.
             * @param {(string|number)} d Número de dias até expirar o Cookie (padrão 360).
             * @param {boolean=} x Verdadeiro para excluir o cookie.
             * @example
             * SIGER.cookie('tema', 'light', '3'); // Irá criar um cookie com nome "tema", valor "light" e duração "3 dias"
             * @returns {void}
             */
            set: function (n, v, d, x) {
                var expires = '';

                if (v) value = v;
                if (n) name = n;

                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }

                if (x) expires = '; expires=Thu, 01 Jan 1970 00:00:01 GMT';

                document.cookie = name + "=" + value + expires + "; path=" + path;
            },
            /**
             * Obtém um cookie
             * @param {string} name Nome do cookie.
             * @example
             * SIGER.cookie('delete', 'tema'); // Irá excluir o cookie "tema", você também pode excluir usando SIGER.cookie(null, 'tema');
             * @returns {void}
             */
            delete: function (name) {
                cookie.set(name, null, null, true);
            }
        }

        if (name === null)
            return cookie.delete(value);

        if ($.isFunction(cookie[name]))
            return cookie[name](value);

        if (value)
            cookie.set();

        return cookie.get(name);
    },

    /**
     * Cria um array contendo uma faixa de elementos
     * @param {(string|number)} start O primeiro valor da sequência.
     * @param {(string|number)} end O último valor da sequência.
     * @param {number} step Se o parâmetro "step" for especificado,
     * será usado como o incremento entre os elementos da sequência.
     *
     * "step" deve ser um inteiro positivo.
     * Se não for especificado, "step" terá valor igual a 1.
     * @returns {Array} Retorna um array com elementos iniciando com o valor "start" até o valor "end", inclusive.
     */
    range: function (start, end, step = 1) {
        var arr = [], count = end - start + 1,
            reverse = false, isnan = isNaN(start) || isNaN(end);

        if (isnan) {
            start = start.charCodeAt();
            end = end.charCodeAt();
            count = end - start + 1
        }

        step = isNaN(step) ? 1 : parseInt(step);
        start = parseInt(start);
        end = parseInt(end);

        if (end < start) {
            count = start - end + 1;
            end = start;
            start = start - count + 1;
            reverse = true;
        }

        for (var i = 0; i < count; i += step) {
            var item = reverse ? end - i : start + i;

            arr.push(isnan ? String.fromCharCode(item) : item);
        }

        return arr;
    },

    /**
     * Salva o conteúdo de uma tabela (thead, tbody) como CSV.
     *
     * Você pode especificar colunas passando os índices e também pode passar um seletor.
     * @example
     * SIGER.saveCsv("table");
     * // O exemplo acima irá pegar os dados de todas as tabelas.
     *
     * SIGER.saveCsv("#info", { name: "CSV_Info" });
     * // O exemplo acima irá pegar os dados da tabela com ID "info" e salvar como "CSV_Info.csv".
     *
     * SIGER.saveCsv({ name: "MyTable", table: ".info", columns: [ 0, 2, 4 ] });
     * // O exemplo acima irá pegar os dados apenas das clunas 0, 2 e 4 (primeira, terceira e quinta coluna)
     * // das tabelas com a classe "info" e salvar como "MyTable.csv".
     *
     * SIGER.saveCsv(0, ".table", 2);
     * // O exemplo acima irá pegar os dados apenas das clunas 0 e 2 (primeira e terceira coluna)
     * // das tabelas com a classe "table".
     */
    saveCsv: function () {
        var file = 'data_' + SIGER.formatDate({ format: 'YmdHi' }) + '.csv',
            link = document.createElement('a'),
            $element = 'table',
            args = Array(),
            header = '',
            body = '';

        $(arguments).each(function (_, v) {
            if (typeof v === 'string')
                $element = v;
            else if (typeof v === 'object') {
                if (v.hasOwnProperty('name'))
                    file = v.name + '.csv';

                if (v.hasOwnProperty('table'))
                    $element = v.table;

                if (v.hasOwnProperty('columns'))
                    args = v.columns;
                else if (v.hasOwnProperty('args')) {
                    var _args = v.args, delimiter = '|;,',
                        length = delimiter.length,
                        x = Array();

                    for (var i = 0; i < length; i++)
                        _args = _args.replace(/\s/gi, '').split(delimiter[i]).join('.');

                    _args = _args.split('.');
                    _args.forEach(function (value, i) {
                        var split = value.split('-');

                        if (split.length === 2) {
                            var from = parseInt(split[0]), to = parseInt(split[1]);
                            x = x.concat(SIGER.range(from, to));
                        }

                        _args[i] = parseInt(value);
                    });

                    _args = _args.concat(x);
                    _args = _args.filter(function (v, i) { return _args.indexOf(v) === i });
                    _args.sort(function (a, b) { return a - b });
                    args = args.concat(_args);
                }
            } else
                args.push(v);
        })

        $($element).each(function (i, e) {
            $('thead th', e).each(function (_, th) {
                if (!args.length || args.filter(function (v) { return v == $(th).index() }).length)
                    header += $(th).text() + ';';
            })

            if ($($element).length > 1) {
                if ($('thead th', e).length) {
                    if (header !== '')
                        header = 'Tabela (nº ' + (i + 1) + ')\n' + header;
                } else {
                    if (body !== '')
                        body = body + '\nTabela (nº ' + (i + 1) + ')\n';
                }
            }

            $('tbody tr', e).each(function (_, tr) {
                var line = ''

                $('td', tr).each(function (_, td) {
                    if (!args.length || args.filter(function (v) { return v == $(td).index() }).length)
                        line += $(td).text().trim() + ';';
                })

                if (line !== '')
                    body += line + '\n';
            })
        })

        if (body === '') return alert('SIGER: Não há dados');

        var data = header + '\n' + body;

        if (header === '') data = body;

        var blob = new Blob([
            new Uint8Array([0xEF, 0xBB, 0xBF]),
            data
        ], {
            type: 'text/csv;charset=utf-8',
            encoding: 'utf-8'
        });

        link.download = file;

        if (window.navigator.msSaveOrOpenBlob)
            link.onclick = function (_) { window.navigator.msSaveOrOpenBlob(blob, file); }
        else
            link.href = URL.createObjectURL(blob);

        link.click();

        if (!window.navigator.msSaveOrOpenBlob)
            URL.revokeObjectURL(link.href);
    }
}, SIGER);

window.onload = function () {
    SIGER.setTheme();

    __call({
        assign:         'Object',
        padStart:       'String',
        zeroPad:        'String,Number',
        capitalize:     'String',
        format:         'String',
        fadeIn:         'NodeList,Element',
        fadeOut:        'NodeList,Element',
        html:           'NodeList,Element',
        text:           'NodeList,Element',
        show:           'NodeList,Element',
        hide:           'NodeList,Element',
        append:         'NodeList,Object,Element',
        setScaledFont:  'NodeList,Object,Element',
        _each:          'NodeList,Object,Element'
    });
}
//# sourceURL=siger/main.js
