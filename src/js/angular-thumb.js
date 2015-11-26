(function () {
    'use strict';

    angular.module('angularThumb', [])
        .directive('ngThumb', function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {url: '=', imgClass: '@', thumbHeight: '@'},
                template: '<div class="{{class}}" style="height: {{thumbHeight || 128}}px; background-image: url(http://i.imgur.com/vW5NOC9.jpg)">' +
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
                                    //console.log("video_id: ", video_id);
                                    $scope.img = '//img.youtube.com/vi/' + video_id + '/0.jpg';
                                    //console.log('i', $scope.img);
                                    return;
                                }
                            } else if (parts = value.match(/(.*)\.mp4$/)) {
                                $scope.image = parts[1] + '-thumb.jpg';
                            }
                        }

                        $scope.img = value;
                    });
                }
            }
        })
})();

