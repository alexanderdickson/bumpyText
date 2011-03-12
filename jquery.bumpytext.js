/*
 * bumpyText 1.1
 * -----------------
 * Text that is allergic to the mouse cursor.
 * Please download jQuery easing plugin for best results.
 * http://www.alexanderdickson.com/
 *
 *
 * Copyright (c) 2011 Alex Dickson
 * Licensed under the MIT licenses.
 * See website for more info.
 *
 */

;
(function($) {

    var findText = function(element, pattern, callback) {
        for (var childi= element.childNodes.length; childi-->0;) {
            var child= element.childNodes[childi];
            if (child.nodeType==1) {
                findText(child, pattern, callback);
            } else if (child.nodeType==3) {
                var matches= [];
                var match;
                while (match= pattern.exec(child.data))
                    matches.push(match);
                for (var i= matches.length; i-->0;)
                    callback.call(window, child, matches[i]);
            }
        }
    }


    $.fn.bumpyText = function(options) {

        var defaults = {
            bounceHeight: '1.3em',
            bounceUpDuration: 500,
            bounceDownDuration: 700, // Take into accout here "gravity", i.e. should be quicker than going up
            // Custom classes
            charClass: 'bumpy-char',
            charElement: 'span'

        };

        options = $.extend(defaults, options);

        return this.each(function() {

            findText(this, /\S/g, function(node, match) {
                
                var element = $('<' + options.charElement + '/>', {
                    'class': options.charClass
                })[0];


                node.splitText(match.index+1);
                element.appendChild(node.splitText(match.index));
                node.parentNode.insertBefore(element, node.nextSibling);
    


            });

            $(this).find(options.charElement + '.' + options.charClass).each(function() {
            
                $(this).css({
                    position: 'relative'
                });

                $(this).mouseover(function(){

                    $(this).animate(
                    {
                        bottom: options.bounceHeight
                    },
                    {
                        queue: false,
                        duration: options.bounceUpDuration,
                        easing: 'easeOutCubic' in $.easing ? 'easeOutCubic' : 'swing',
                        complete: function(){
                            $(this).animate({
                                bottom: 0
                            }, {
                                queue: false,
                                duration: options.bounceDownDuration,
                                easing: 'easeOutBounce' in $.easing ? 'easeOutBounce' : 'swing'
                            });
                        }
                    });
                });

            });

        });
    };
})(jQuery);