var app = angular.module('myApp', []);

var apiKey = 'MDE5MDA1ODI1MDE0MzAzMzYyMzlmNzdiNA001',
		nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', function($scope, $http){

	$http({
		method: 'JSONP',
		url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data, status) {
		console.log(data)
		$scope.programs = data.list.story;
		// success function
	}).error(function(data, status) {
		// error function
	})

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