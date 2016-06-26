'use strict';

/**
 * Created by morita on 6/25/2016 AD.
 */
var app = angular.module('myApp');
app.directive('mySelect', [function() {
        return function(scope, $el, attrs) {
            scope.$watch(attrs.mySelect, function(val) {
                if (val) {
                    $el[0].select();
                }
            });
        };
    }]);