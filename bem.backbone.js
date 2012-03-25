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

        elementBaseClassDataAttribute: 'bemBaseClass',

        getMods: function(jqueryMethodArgs){
            var mods = {};

            if (jqueryMethodArgs.length == 1) {
                mods = jqueryMethodArgs[0];
            } else {
                mods[jqueryMethodArgs[0]] = jqueryMethodArgs[1];
            }

            return mods;
        },


        getElementMods: function($element, baseClass){
            var elementMods = $element.data(utilities.elementModDataAttribute);

            if (!elementMods) {
                var elementClasses = $element.attr('class').split(/\s+/gm);
                var modifierRegexp = new RegExp('^' + baseClass + '_([A-Za-z0-9\-]+)_([A-Za-z0-9\-]+)$');

                elementMods = {};
                for (var i = 0; i < elementClasses.length; i++) {
                    var matches = modifierRegexp.exec(elementClasses[i]);

                    if (matches){
                        elementMods[matches[1]] = matches[2];
                    }
                }

                $element.data(utilities.elementModDataAttribute, elementMods);
            }

            return elementMods;
        },

        setElementMod: function($element, modName, modValue){
            var elementMods = utilities.getElementMods($element, '');
            elementMods[modName] = modValue;
            $element.data(utilities.elementModDataAttribute, elementMods);
        }
    };


    /**
     * jQuery methods for setting and removing modifiers
     */
    $.fn.setMod = function(){
        if (arguments.length == 0 || arguments.length > 2) {
            utilities.errorMessage('.setMod() takes one or two attributes');
            return this;
        }

        var mods = utilities.getMods(arguments);

        return this.each(function(){
            var $element = $(this);
            var baseClass = $element.data(utilities.elementBaseClassDataAttribute);

            if (!baseClass) {
                utilities.errorMessage('.setMod() error');
                return;
            }

            var elementMods = utilities.getElementMods($element, baseClass);

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
        return this.each(function(){
            var $element = $(this);
            var baseClass = $element.data(utilities.elementBaseClassDataAttribute);

            if (!baseClass) {
                utilities.errorMessage('.removeMod() error');
                return;
            }

            var elementMods = utilities.getElementMods($element, baseClass);

            if (modName in elementMods) {
                $element.removeClass(baseClass + '_' + modName + '_' + elementMods[modName]);
            }
        });
    };


    Backbone.BemView = Backbone.View.extend({
        blockName: '',

        setMod: function(){
            var $block = this.$el;

            $block.data(utilities.elementBaseClassDataAttribute, this.blockName);
            $block.setMod(utilities.getMods(arguments));

            return $block;
        },

        removeMod: function(modName){
            var $block = this.$el;

            $block.data(utilities.elementBaseClassDataAttribute, this.blockName);
            $block.removeMod(modName);

            return $block;
        },

        element: function(elementName){
            var that = this;
            var $block = this.$el;
            var elementSelector = '.' + this.blockName + '__' + elementName;
            var $elements = $block.find(elementSelector);

            // Set blockName and elementName
            $elements.each(function(){
                $(this).data(utilities.elementBaseClassDataAttribute, that.blockName + '__' + elementName)
            });

            return $elements;
        }
    });
})(jQuery);
