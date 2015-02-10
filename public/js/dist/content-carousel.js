define([ "require", "exports", "module", "jquery", "stamen-super-classy" ], function(require, exports, module, jquery, StamenSuperClassy) {
    "use strict";
    module.exports = function(rootSelector, options) {
        var animationInterval, that = this;
        StamenSuperClassy.apply(this, arguments), options = options || {};
        var coverPhotos, rootElement = document.querySelector(rootSelector), optionsInternal = {};
        if (rootElement.style.overflow = "auto", STMN && rootElement.parentNode.classList.contains("what-scrollbars") && "Windows" === STMN.OSName) {
            var ws = rootElement.parentNode;
            ws.style.overflow = "hidden", rootElement.style.margin = "0 -17px -17px 0", rootElement.style.height = rootElement.offsetHeight + 17 + "px", 
            rootElement.style.width = rootElement.offsetWidth + 17 + "px";
        }
        return STMN && "Firefox" === STMN.ua.split(" ")[0] && (rootElement.style.overflow = "-moz-scrollbars-none"), 
        optionsInternal.slideClass = options.slideClass || "carousel-slide", coverPhotos = that.utils.get(rootSelector + " ." + optionsInternal.slideClass)[0], 
        rootSelector && rootElement ? (that.goForward = function() {
            animationInterval && (clearInterval(animationInterval), animationInterval = null);
            var pos, next, start = rootElement.scrollLeft;
            options.snapToSlide ? (coverPhotos = that.utils.get(rootSelector + " ." + optionsInternal.slideClass), 
            coverPhotos.length && (next = Math.round(rootElement.scrollLeft / coverPhotos[0].offsetWidth) + 1, 
            pos = coverPhotos[next] ? coverPhotos[next].offsetLeft : start)) : pos = start + rootElement.offsetWidth, 
            $(rootElement).animate({
                scrollLeft: pos
            }, null, null, function() {
                that.fire("forward", {
                    target: rootElement
                });
            });
        }, that.goBackward = function() {
            animationInterval && (clearInterval(animationInterval), animationInterval = null);
            var pos, next, start = rootElement.scrollLeft;
            options.snapToSlide ? (coverPhotos = that.utils.get(rootSelector + " ." + optionsInternal.slideClass), 
            coverPhotos.length && (next = Math.round(rootElement.scrollLeft / coverPhotos[0].offsetWidth) - 1, 
            pos = coverPhotos[next] ? coverPhotos[next].offsetLeft : start)) : pos = start - rootElement.offsetWidth, 
            $(rootElement).animate({
                scrollLeft: start - rootElement.offsetWidth
            }, null, null, function() {
                that.fire("backward", {
                    target: rootElement
                });
            });
        }, rootElement.addEventListener("click", function(e) {
            e.preventDefault();
            var edgeBuffer = 55, middle = [ e.target.offsetLeft + edgeBuffer, e.target.offsetLeft + e.target.offsetWidth - edgeBuffer ], titleNode = e.target.querySelector(".title-link");
            e.pageX >= middle[0] && e.pageX <= middle[1] ? titleNode && (location.href = titleNode.getAttribute("href")) : e.pageX < middle[0] ? that.goBackward() : that.goForward();
        }), rootElement.classList.add("stmn-carousel-module"), rootElement.style.overflow = "hidden", 
        rootElement.style.overflowX = "scroll", rootElement.style.position = "relative", 
        that) : !1;
    };
});