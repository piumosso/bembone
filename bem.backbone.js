(function($){
    if (!Backbone || !Backbone.View) {
        return;
    }


    /**
     * Utilites
     */
    var utilites = {
        errorMessage: (console && console.error) ? console.error : function(errorText){},

        elementModDataAttribute: 'bemMods',

        getElementMods: function($element){
            var elementMods = $element.data(utilites.elementModDataAttribute);

            if (!elementMods) {
                elementMods = {};
                $element.data(utilites.elementModDataAttribute, elementMods);
            }

            return elementMods;
        },

        setElementMod: function($element, modName, modValue){
            var elementMods = utilites.getElementMods($element);
            elementMods[modName] = modValue;
            $element.data(utilites.elementModDataAttribute, elementMods);
        }
    };


    /**
     * jQuery methods for setting and removing modificators
     */
    $.fn.setMod = function(){
        if (!this.blockName && !this.elementName) {
            utilites.errorMessage('.setMod() error');
            return this;
        }

        if (arguments.length == 0 || arguments.length > 2) {
            utilites.errorMessage('.setMod() takes one or two attributes');
            return this;
        }

        var mods = {};
        var elementClass = this.blockName + '__' + this.elementName;

        if (arguments.length == 1) {
            mods = arguments[0];
        } else {
            mods[arguments[0]] = arguments[1];
        }

        return this.each(function($element){
            var elementMods = utilites.getElementMods($element);

            for (var modName in mods) {
                if (modName in elementMods) {
                    $element.removeClass(elementClass + '_' + modName + '_' + elementMods[modName]);
                }
                $element.addClass(elementClass + '_' + modName + '_' + mods[modName]);
                utilites.setElementMod($element, modName, mods[modName]);
            }
        });
    };
    $.fn.removeMod = function(modName){
        if (!this.blockName && !this.elementName) {
            utilites.errorMessage('.removeMod() error');
            return this;
        }

        var elementClass = this.blockName + '__' + this.elementName;

        return this.each(function($element){
            var elementMods = utilites.getElementMods($element);

            if (modName in elementMods) {
                $element.removeClass(elementClass + '_' + modName + '_' + elementMods[modName]);
            }
        });
    };


    Backbone.BemView = Backbone.View.extend({
        blockName: '',

        element: function(elementName){
            var $block = this.$el;
            var elementSelector = self.blockName + '__' + elementName;
            var $elements = $block.find(elementSelector);

            // Set blockName and elementName
            $elements.blockName = self.blockName;
            $elements.elementName = elementName;

            return $elements;
        }
    });
})(jQuery);
