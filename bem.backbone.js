(function($){
    if (!Backbone || !Backbone.View) {
        return;
    }


    /**
     * Utilities
     */
    var utilities = {
        errorMessage: (console && console.error) ? console.error : function(errorText){},

        elementModDataAttribute: 'bemMods',

        getElementMods: function($element){
            var elementMods = $element.data(utilities.elementModDataAttribute);

            if (!elementMods) {
                elementMods = {};
                $element.data(utilities.elementModDataAttribute, elementMods);
            }

            return elementMods;
        },

        setElementMod: function($element, modName, modValue){
            var elementMods = utilities.getElementMods($element);
            elementMods[modName] = modValue;
            $element.data(utilities.elementModDataAttribute, elementMods);
        }
    };


    /**
     * jQuery methods for setting and removing modificators
     */
    $.fn.setMod = function(){
        if (!this.blockName && !this.elementName) {
            utilities.errorMessage('.setMod() error');
            return this;
        }

        if (arguments.length == 0 || arguments.length > 2) {
            utilities.errorMessage('.setMod() takes one or two attributes');
            return this;
        }

        var mods = {};
        var elementClass = this.blockName + '__' + this.elementName;

        if (arguments.length == 1) {
            mods = arguments[0];
        } else {
            mods[arguments[0]] = arguments[1];
        }

        return this.each(function(index, element){
            var $element = $(element);
            var elementMods = utilities.getElementMods($element);

            for (var modName in mods) {
                if (modName in elementMods) {
                    $element.removeClass(elementClass + '_' + modName + '_' + elementMods[modName]);
                }
                $element.addClass(elementClass + '_' + modName + '_' + mods[modName]);
                utilities.setElementMod($element, modName, mods[modName]);
            }
        });
    };
    $.fn.removeMod = function(modName){
        if (!this.blockName && !this.elementName) {
            utilities.errorMessage('.removeMod() error');
            return this;
        }

        var elementClass = this.blockName + '__' + this.elementName;

        return this.each(function(index, element){
            var $element = $(element);
            var elementMods = utilities.getElementMods($element);

            if (modName in elementMods) {
                $element.removeClass(elementClass + '_' + modName + '_' + elementMods[modName]);
            }
        });
    };


    Backbone.BemView = Backbone.View.extend({
        blockName: '',

        element: function(elementName){
            var $block = this.$el;
            var elementSelector = '.' + this.blockName + '__' + elementName;
            var $elements = $block.find(elementSelector);

            // Set blockName and elementName
            $elements.blockName = this.blockName;
            $elements.elementName = elementName;

            return $elements;
        }
    });
})(jQuery);
