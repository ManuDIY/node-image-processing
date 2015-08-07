'use strict';

angular.module('materialApp')
.controller('chatController', ['$scope', 'Socket', function($scope, Socket){
	var socket = io();

	$scope.messages = [];

	$scope.sendMessage = function() {
		console.log($scope.messageText);
		var message = {
			text: $scope.messageText
		};
    	Socket.emit('chatMessage', message);
    	$scope.messageText = '';
	};

	Socket.on('chatMessage', function(msg){
		$scope.messages.push(msg);
	});

	$scope.$on('$destroy', function() {
        Socket.removeListener('chatMessage');
    });
}]);
