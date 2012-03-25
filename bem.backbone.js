(function(){
    if (!Backbone || !Backbone.View) {
        return;
    }

    Backbone.BemView = Backbone.View.extend({
        blockName: '',

        element: function(elementName){},

        mod: function(mod){},

        removeMod: function(mod){}
    });
})();
