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

        getMods: function(jqueryMethodArgs){
            var mods = {};

            if (jqueryMethodArgs.length == 1) {
                mods = jqueryMethodArgs[0];
            } else {
                mods[jqueryMethodArgs[0]] = jqueryMethodArgs[1];
            }

            return mods;
        },

        getElementMods: function($element){
            var elementMods = $element.data(utilities.elementModDataAttribute);

            if (!elementMods) {
                console.log($element.attr('class'));
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
     * jQuery methods for setting and removing modifiers
     */
    $.fn.setMod = function(){
        var baseClass = this.baseClass;
        if (!baseClass) {
            utilities.errorMessage('.setMod() error');
            return this;
        }

        if (arguments.length == 0 || arguments.length > 2) {
            utilities.errorMessage('.setMod() takes one or two attributes');
            return this;
        }

        var mods = utilities.getMods(arguments);

        return this.each(function(index, element){
            var $element = $(element);
            var elementMods = utilities.getElementMods($element);

            for (var modName in mods) {
                if (modName in elementMods) {
                    $element.removeClass(baseClass + '_' + modName + '_' + elementMods[modName]);
                }
                $element.addClass(baseClass + '_' + modName + '_' + mods[modName]);
                utilities.setElementMod($element, modName, mods[modName]);
            }
        });
    };
    $.fn.removeMod = function(modName){
        var baseClass = this.baseClass;
        if (!baseClass) {
            utilities.errorMessage('.removeMod() error');
            return this;
        }

        return this.each(function(index, element){
            var $element = $(element);
            var elementMods = utilities.getElementMods($element);

            if (modName in elementMods) {
                $element.removeClass(baseClass + '_' + modName + '_' + elementMods[modName]);
            }
        });
    };


    Backbone.BemView = Backbone.View.extend({
        blockName: '',

        setMod: function(){
            var $block = this.$el;

            $block.baseClass = this.blockName;
            $block.setMod(utilities.getMods(arguments));

            return $block;
        },

        removeMod: function(modName){
            var $block = this.$el;

            $block.baseClass = this.blockName;
            $block.removeMod(modName);

            return $block;
        },

        element: function(elementName){
            var $block = this.$el;
            var elementSelector = '.' + this.blockName + '__' + elementName;
            var $elements = $block.find(elementSelector);

            // Set blockName and elementName
            $elements.baseClass = this.blockName + '__' + elementName;

            return $elements;
        }
    });
})(jQuery);
