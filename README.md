[![Build Status](https://travis-ci.org/merchantly/front-public.svg?branch=master)](https://travis-ci.org/merchantly/front-public)


Установка
---------

> yarn install

Разработка
----------

> yarn storybook

Билд дистрибутива
-----------------

> yarn build

Деплой storybook на gh-pages
----------------------------

> yarn deploy-storybook

Документация по аналитике
-------------------------

https://github.com/merchantly/doc/blob/master/ANALYTICS.md

Управление кастомным шрифтом с иконками
---------------------------------------

1. Иконки выбираем тут http://www.flaticon.com/
2. Понравившиеся иконки качаем в svg, и импортируем в https://icomoon.io/app
3. Если подобной иконки в шрифте не было, то её код это код последней иконки в нашем шрифте + 1
4. Если иконка уже есть в шрифте и мы хотим заменить её новой, то перед генерацией шрифта в icomoon перетаскиваем новую иконку вместо старой, а старую удаляем. Даём ей такое же название, код и сохраняем шрифт.
5. Распаковываем архив со шрифтом. Файлы eot, svg, ttf, woff кладём в `./app/fonts`, если появилась новая иконка, добавляем её в конец `./app/stylesheets/fonts/KioskPublicIcons.sass`
6. Заменяем `./app/stylesheets/fonts/selection.json` новым из архива.

Сбор фикстур для тестов и примеров компонентов
----------------------------------------------

Предварительно на сайте собираем необходимое состояние компонента (пока вручную). Затем переходим на страницу содержащую компонент. В девелоперской консоли браузера выполняем код:

  ```sh
  JSON.stringify(JSON.parse(document.querySelector('[data-react-props=<Имя компонента>]').getAttribute('data-react-props')), null, 2)
  ```

Ограничение по браузерам:
------------------------

Текущие ограничения:

* Firefox >=25
* IE10+
* Opera 12+
* Chrome >=27
* Safari >-6
* Mobile Safair on iPhone and iPad >= 6

Ограничения для приложения в целом устанавливаются согласно максимальным ограничениям компонентов.

## ReactJS

* IE >= 9, Chrome >= 27, Firefox >= 25, Safari >= 6 and Mobile Safari on iPhone and iPad >= 6

## jQueryFileUpload:

https://github.com/blueimp/jQuery-File-Upload/wiki/Browser-support

### Desktop browsers

* Google Chrome
* Apple Safari 4.0+
* Mozilla Firefox 3.0+
* Opera 11.0+
* Microsoft Internet Explorer 6.0+

### Mobile browsers

* Apple Safari on iOS 6.0+
* Google Chrome on iOS 6.0+
* Google Chrome on Android 4.0+
* Default Browser on Android 2.3+
* Opera Mobile 12.0+

## HTML5 FileReader

* Firefox 3.6+, IE10+, and Opera 12+.# react-i18next-support

## fix json

> perl  -0777 -i -pe 's/},(\n?\r?\s+)([}\]])/}\n$1$2/igs'  test/fixtures/**/*.json

## Требования jQuery

* OwlCarousel >=1.8.3
* jQuery.mmenu >= 1.7.0
* fancybox               "jquery": ">=1.10",, "jquery-mousewheel": "~3.1.3"
* sticky-kit => ?
