(function($){
    if (!Backbone || !Backbone.View) {
        return;
    }


    /**
     * Utilites
     */
    var error = (console && console.error) ? console.error : function(errorText){};
    var elementModlDataAttribute = 'bemMods';
    var getElementMods = function($element){
        var elementMods = $element.data(elementModlDataAttribute);

        if (!elementMods) {
            elementMods = {};
            $element.data(elementModlDataAttribute, elementMods);
        }

        return elementMods;
    };
    var setElementMod = function($element, modName, modValue){
        var elementMods = getElementMods($element);
        elementMods[modName] = modValue;
        $element.data(elementModlDataAttribute, elementMods);
    };


    /**
     * jQuery methods for setting and removing modificators
     */
    $.fn.setMod = function(){
        if (!this.blockName && !this.elementName) {
            error('.setMod() error');
            return this;
        }

        if (arguments.length == 0 || arguments.length > 2) {
            error('.setMod() takes one or two attributes');
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
            var elementMods = getElementMods($element);

            for (var modName in mods) {
                if (modName in elementMods) {
                    $element.removeClass(elementClass + '_' + modName + '_' + elementMods[modName]);
                }
                $element.addClass(elementClass + '_' + modName + '_' + mods[modName]);
                setElementMod($element, modName, mods[modName]);
            }
        });
    };
    $.fn.removeMod = function(modName){
        if (!this.blockName && !this.elementName) {
            error('.removeMod() error');
            return this;
        }

        var elementClass = this.blockName + '__' + this.elementName;

        return this.each(function($element){
            var elementMods = getElementMods($element);

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
