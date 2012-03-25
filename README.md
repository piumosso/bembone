
# Example:

## Initialization

<article class="news" id="sample">
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

var NewsView = Backbone.BemView.extend({
    blockName: 'news'
});
var view = new NewsView({
    el: $('#sample')
});

## Usage

view.setMod('importance', 'high')
article.news.news_importance_high

view.removeMod('importance')
article.news

view.element('title')
h1.news__title

view.element('title').setMod({
    size: 'big',
    bordered: 'yes'
})
h1.news__title.news__title_size_big.news__title_bordered_yes

view.element('title').setMod('size', 'small')
h1.news__title.news__title_size_small.news__title_bordered_yes

view.element('title').removeMod('bordered')
h1.news__title.news__title_size_small
