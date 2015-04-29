var app = angular.module('myApp', []);

var apiKey = 'MDE5MDA1ODI1MDE0MzAzMzYyMzlmNzdiNA001',
		nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.directive('nprLink', function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      play: '&'
    },
    templateUrl: 'views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});

app.controller('PlayerController', function($scope, $http) {
	var audio = document.createElement('audio');
	$scope.audio = audio;

	$http({
		method: 'JSONP',
		url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data, status) {
		$scope.programs = data.list.story;
		// success function
	}).error(function(data, status) {
		// error function
	});

	$scope.play = function(program) {
		if ($scope.playing) $scope.audio.pause();
		var url = program.audio[0].format.mp4.$text;
		audio.src = url;
		audio.play();

		// store the state of the player as playing
		$scope.playing = true;
	};

	$scope.stop = function() {
		$scope.audio.stop();
		$scope.playing = false;
	};

	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function() {
			$scope.stop()
		});
	});

})


// app.controller('PlayerController', ['$scope', function($scope) {
// 	$scope.playing = false;
// 	$scope.audio = document.createElement('audio');
// 	$scope.audio.src = '/media/npr.mp4'
// 	$scope.play = function() {
// 		$scope.audio.play();
// 		$scope.playing = true;
// 	};
// 	$scope.stop = function() {
// 		$scope.audio.stop();
// 		$scope.playing = false;
// 	};
// 	$scope.audio.addEventListener('ended', function() {
// 		$scope.$apply(function() {
// 			$scope.stop()
// 		});
// 	});
// }]);

app.controller('RelatedController', ['$scope', function($scope) {

}]);