define(['./module'], function (services) {
    'use strict';
    services.factory('sVideos', function($q, $qi, $timeout) {
        var t = [];
        for (var i = 0; i < 1024; ++i)
        {
          t[String.fromCharCode(i)] = i;
        }
        var RESOLUTION_QQVGA_160_120 = 0;
        var RESOLUTION_QVGA_320_240 = 1;
        var COLORSPACE_YUV = 0;
        var nomorevideo = false;
        var getVideo = function(){
            var deferred = $q.defer();
            nomorevideo = false;

            function subscribeToCamera(ALVideoDevice){
                var maximumFps = 10;
                ALVideoDevice.subscribeCamera("BootConfigQR", 0, RESOLUTION_QVGA_320_240, COLORSPACE_YUV, maximumFps).then(function (cameraHandler){
                    //console.log(cameraHandler);
                    function stopListening() {
                        //clearInterval(myInterval);
                        ALVideoDevice.unsubscribe(cameraHandler).then(function(reply) {
                          //console.log("Unsubscribe result: " + reply);
                        }, $qi.onQimError);
                    }
                    function displayImageOnCanvas(img){
                        // Doc on img format:
                        // http://doc.aldebaran.lan/doc/release-1.22/public/naoqi/vision/alvideodevice-api.html?highlight=getimageremote#image

                        var canvas = document.getElementById('video_player');
                        if (canvas == null) {
                          stopListening();
                          return;
                        }
                        var context = canvas.getContext('2d');
                        if (!nomorevideo){
                            var a = atob(img[6]);
                            var imageWidth = img[0];
                            var imageHeight = img[1];
                            var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
                            var data = imageData.data;
                            var read = 0;
                            for (var y = 0; y < imageHeight; y++) {
                              for (var x = 0; x < imageWidth; x++) {
                                //var p = (imageWidth * y + x) * 4; // no flip
                                var writep = (imageWidth * y + (imageWidth - x - 1)) * 4; // flip
                                var luminosity = t[a[read++]];
                                // brighten
                                var lum_01 = luminosity/255;
                                lum_01 = 1.0 - (1.0 - lum_01) * (1.0 - lum_01);
                                luminosity = Math.floor(256 * lum_01);
                                // copy to output buffer
                                data[writep+0] = luminosity;
                                data[writep+1] = luminosity;
                                data[writep+2] = luminosity;
                                data[writep+3] = 255; // alpha
                              }
                            }

                            deferred.notify(imageData);
                            context.putImageData(imageData, 0, 0);
                            $timeout(requestImage, 30); // Immediatly require next image (without recursion)
                        }
                        else{
                            stopListening();
                            var imageObj = new Image();
                            imageObj.onload = function() {
                                context.drawImage(imageObj, 100, 60);
                            };
                            imageObj.src = 'img/checked120green.png';
                        }
                    }
                    function requestImage(){
                        ALVideoDevice.getImageRemote(cameraHandler).then(displayImageOnCanvas, $qi.onQimError);
                    }
                    $timeout(requestImage, 30); // Immediatly require first image (without recursion)
                }, $qi.onQimError);
            }
            $qi.call(function(ALVideoDevice){
				ALVideoDevice.getSubscribers().then(function (subscribers){
					angular.forEach(subscribers, function(subscriber){
						if (subscriber.indexOf("BootConfigQR") == 0) {
							 ALVideoDevice.unsubscribe(subscriber).then(function(reply) {
								//console.log("Unsubscribed to " + subscriber + " result: " + reply);
							}, $qi.onQimError);
						}
					});
					subscribeToCamera(ALVideoDevice);
				}, $qi.onQimError);
            });
            return deferred.promise;
        };
        var stopVideo = function(){
            nomorevideo = true;
        };
        var qrEvent = function(){
            var deferred = $q.defer();
            function handleState(data){
                //console.log(data);
                deferred.notify(data);
            }
            $qi.subscribeEvent('BootConfig/QrState', handleState);
            return deferred.promise;
        };

        return {
            getVideo: getVideo,
            stopVideo: stopVideo,
            qrEvent: qrEvent,
        };
    });
});