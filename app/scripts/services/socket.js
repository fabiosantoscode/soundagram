'use strict';

angular.module('veercApp')
.factory('socket', ['$rootScope', function ($rootScope) {

    var socket = io.connect('http://localhost:3000');

    return {
        on: function (eventName, cb) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    cb.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, cb) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (cb) {
                        cb.apply(socket, args);
                    }
                });
            });
        }
    };
}]);
