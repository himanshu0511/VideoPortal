! function() {
    "use strict";
    angular.module("angular-lazy-loader", []).directive("angularLazyLoad", ["$window", "$timeout", "$rootScope", function(e, t, n) {
        return {
            restrict: "EA",
            scope: !0,
            link: function(r, o, a) {
                function i() {
                    s = Array.prototype.slice.call(o[0].querySelectorAll("source[data-src], img[data-src], iframe[data-src], div[data-src]")), s.length > 0 && l()
                }

                function c(e) {
                    var t = e.parentNode.parentNode.getBoundingClientRect();
                    return t.bottom + g >= 0 && t.left >= 0 && t.top - g <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
                }

                function l() {
                    s = s.reduce(function(e, t) {
                        var n = t.getAttribute("data-src");
                        if (!c(t)) return e.push(t), e;
                        switch (t.tagName) {
                            case "SOURCE":
                                // if(t && !t.src) {
                                  t.src = n;
                                  t.parentNode.load();
                                // }
                                break;
                            default:
                                e.push(t)
                        }
                        return e
                    }, [])
                }

                function u() {
                    t(i, 0)
                }

                function d() {
                    t(l, 0)
                }
                var s = [],
                    g = Number(a.threshold) || 0;
                t(function() {
                  i(), r.$on("$includeContentLoaded", u), n.$on("selectiveLoad", u), angular.element(e).bind("scroll", d), angular.element(e).bind("resize", d), angular.element(o).bind("scroll", d)
                }, 100);
            }
        }
    }])
}();
