# BEM-extension for Backbone views

Bembone provides access to elements in terms of [BEM](http://bem.github.com/bem-method/html/all.en.html),
the management of their modifiers and modifiers of the block.

## Usage

Include bem.backbone.js after backbone.js.

```html
<article class="news" id="example">
    <header class="news__header">
        <h1 class="news__title"></h1>
        <time class="news__date"></time>
    </header>
    <div class="news__teaser"></div>
    <footer class="news__controlls">
        <a class="news__more" href=""></a>
        <span class="news__add-to-favorites"></span>
        <span class="news__rate"></span>
    </footer>
</article>
```
```js
var NewsView = Backbone.BemView.extend({
    blockName: 'news'
});
var view = new NewsView({
    el: $('#example')
});
```


## Examples


### Set modifier to the block

```js
view.setMod('importance', 'high')
```
```html
<article class="news news_importance_high"></article>
```

### Remove modifier from the block

```js
view.removeMod('importance')
```
```html
<article class="news"></article>
```

### Get a block element

```js
view.element('title')
```
```html
<h1 class="news__title"></h1>
```

### Set modifier to the element

```js
view.element('title').setMod({
    size: 'big',
    bordered: 'yes'
})
```
```html
<h1 class="news__title news__title_size_big news__title_bordered_yes"></h1>
```

### Change an element modifier

```js
view.element('title').setMod('size', 'small')
```
```html
<h1 class="news__title news__title_size_small news__title_bordered_yes"></h1>
```

### Remove modifier from the element

```js
view.element('title').removeMod('bordered')
```
```html
<h1 class="news__title news__title_size_small"></h1>
```
