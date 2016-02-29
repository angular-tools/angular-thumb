(function () {
    'use strict';

    angular.module('angularThumb', [])
        .directive('ngThumb', function ($timeout) {
            return {
                restrict: 'A',
                replace: true,
                scope: {url: '=', imgClass: '@', thumbHeight: '@', ngFail: '&'},
                template: '<div class="{{class}}" style="height: {{thumbHeight || 128}}px; background-image: url(http://i.imgur.com/KCxGAWh.gif)">' +
                '              <div class="{{class}}" style="height: {{thumbHeight || 128}}px; background-image: url({{img}})">&nbsp;</div>' +
                '          </div>',
                link: function ($scope, element, attrs) {
                    $scope.class = $scope.imgClass || 'image-result';
                    $scope.$watch('url', function (value) {
                        if (value) {
                            var parts;

                            if (parts = value.match(/youtube\.com.*((?:\?|\&)v=|\/embed\/)(.{11})/)) {
                                var video_id = parts.pop();

                                if (video_id.length == 11) {
                                    $scope.img = '//img.youtube.com/vi/' + video_id + '/0.jpg';
                                    return;
                                }
                            } else if (parts = value.match(/(.*)\.mp4$/)) {
                                $scope.image = parts[1] + '-thumb.jpg';
                            }
                        }

                        if ($scope.ngFail) {
                            var image = new Image();
                            image.onerror = $scope.ngFail;
                            image.onload = function () {
                                $timeout(function () {$scope.img = value;});
                            };
                            image.src = value;
                        } else {
                            $scope.img = value;
                        }
                    });
                }
            }
        })
})();

