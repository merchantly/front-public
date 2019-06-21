window.mrch = window.mrch || {};
window.mrch.config = window.mrch.config || {};
window.mrch.config.operator_api_url = window.mrch.config.operator_api_url || process.env.OPERATOR_API_URL;
window.mrch.config.public_api_url = window.mrch.config.public_api_url || process.env.PUBLIC_API_URL;

require('owlCarousel');
require('fancybox');
const numeral = require('numeral');
const language = require('numeral/languages/ru');

numeral.language('ru', language);
numeral.language('ru');

require('./ProductCard');
