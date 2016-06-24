'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}]);

//This is the controller to output the input data
app.controller('AppCtrl', ['$scope', '$filter', function($scope, $filter) {
        $scope.todos = [];
        //Add new todo list
        //  $scope.submit = function() {
        //      if ($scope.todoText) {
        //return 
        $scope.add = function() {
            $scope.todos.push({
                text: this.todoText,
                addLine: false
            });
            console.log("add");
            $scope.todoText = "";
        };
        //}
        $scope.delete = function(number) {
            console.log("delete");
            $scope.todos.splice(number, 1);
            //return currentTodo !== todo;
        }

        //Filter

        $scope.filter = {
            addLine: {
                addLine: true
            },
            remaining: {
                addLine: false
            }
        };

        $scope.currentFilter = null;

        $scope.changeFilter = function(filter) {
            $scope.currentFilter = filter;
        };

        var where = $filter('filter');
        $scope.$watch('todos', function(todos) {
            var length = todos.length;

            $scope.allCount = length; //All
            $scope.doneCount = where(todos, $scope.filter.addLine).length; //comeplete
            $scope.remainingCount = length - $scope.doneCount; //active
        }, true);


        var originalTitle;
        $scope.editing = null;
        /*
                $scope.editTodo = function(todo) {
                    originalTitle = todo.text;
                    $scope.editing = todo;
                };

                $scope.doneEdit = function(todoForm) {
                    if (todoForm.$invalid) {
                        $scope.editing.text = originalTitle;
                    }
                    $scope.editing = originalTitle = null;
                };
        */
        $scope.checkAll = function() {
            var state = !!$scope.remainingCount;
            angular.forEach($scope.todos, function(todo) {
                todo.addLine = state;
            });
        };

        $scope.removeDoneTodo = function() {
            $scope.todos = where($scope.todos, $scope.filter.remaining);
            console.log("delete check all");
            $scope.todos.splice($scope.checkAll, $scope.checkAll);
        };
        /*
                $scope.removeTodo = function(currentTodo) {
                    $scope.todos = where($scope.todos, function(todo) {

                        console.log("delete");
                        return currentTodo !== todo;
                    });
                };*/
    }])
    .directive('mySelect', [function() {
        return function(scope, $el, attrs) {
            scope.$watch(attrs.mySelect, function(val) {
                if (val) {
                    $el[0].select();
                }
            });
        };
    }]);