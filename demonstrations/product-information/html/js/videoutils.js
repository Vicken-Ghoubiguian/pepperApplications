// A utility module that requires jQuery.

VideoUtils = (function(self, $) {
    var FPS = null; 
    var color = null; 
    var format = null;
    var canvas = null;
    var ID = null;
    var context = null;
    var imageData = null;
    var buf = null;
    var buf8 = null;
    var buf32 = null;
    var SCALE_X = 1;
    var SCALE_Y = 1;
    var resolutionDict = {0 : [160,120], 1 : [320,240], 2 : [640,480], 3 : [1280,960]};
    
    var enablePlay = true;
    var timer;
    var g_handle;
    var g_videoDevice;
    
    function unsubscribeCamera (videoDevice, handle) {
        if (handle) {
            videoDevice.unsubscribe(handle).then(function () {
                console.log('UNsubscribed camera');
                handle = null;
            }, $.onQimError);
        }
    }
    
    function draw(canvas, data, width, height, color){
        if (!context) { return; }
        var read = 0;
        
        for(var y = 0; y < height; y++) {
            for(var x = 0; x < width; x++) {
                var luminosity = data[read++];
                var lum_01 = luminosity/255;
                lum_01 = 1.0 - (1.0 - lum_01) * (1.0 - lum_01);
                luminosity = Math.floor(256 * lum_01);
                for (var dx = 0; dx < SCALE_X; dx++) {
                    for (var dy = 0; dy < SCALE_Y; dy++) {
                        var writep = (width * SCALE_X * (SCALE_Y * y + dy) + (width * SCALE_X - SCALE_X * x - dx - 1)); // flip
                        buf32[writep] = (255   << 24) |         // alpha
                                        (luminosity << 16) |    // blue
                                        (luminosity <<  8) |    // green
                                        luminosity;             // red
                    }
                }
            }
        }
        imageData.data.set(buf8);
        context.putImageData(imageData, 0, 0);
    }
    
    function updateImage(videoDevice, handle) {
        if(!enablePlay)return;
        videoDevice.getImageRemote(handle).then(function (image) {
            if (image) {
                var width = image[0];
                var height = image[1];
                //console.log("height " + height)
                draw(canvas, image[6], width, height, color);
                videoDevice.releaseImage(handle).then(function () {
                    timer = setTimeout(updateImage(videoDevice, handle), (1000 / FPS));
                }, $.onQimError);
            }
            else
                console.log("no image")
        }, $.onQimError);
    }
    
    
    self.unsubscribeAllHandlers = function(videoDevice, handler) {
        return new Promise(function(resolve, reject) {
            console.log("trying to unsubscribe all related handlers...");
            promises = [];
            for (var i = 0; i < 5; i++) {
                promises[i] = new Promise(function(res, rej) { unsubscribeCamera(videoDevice, handler+"_"+i); res(); });
            }
            Promise.all(promises).then(function() {resolve(handler);}, reject);
        });
    }  
    
    
    self.startVideo = function(videoDevice, element, resolution, fps, color) {
        FPS = fps; 
        color = color; 
        format = resolution;
        canvas = document.getElementById(element);
        ID = element + '_camera';
        context = canvas.getContext('2d');
        imageData = context.createImageData(resolutionDict[resolution][0], resolutionDict[resolution][1]);
        buf = new ArrayBuffer(imageData.data.length);
        buf8 = new Uint8ClampedArray(buf);
        buf32 = new Uint32Array(buf);
        g_videoDevice = videoDevice;
        
        enablePlay = true;
        console.log('play');
        videoDevice.subscribeCamera(ID, 0, format, color, FPS).then(function (handle) {
            console.log('subscribed camera', handle);
            g_handle = handle;
            g_videoDevice = videoDevice;
            
            //unsubscribeCamera(videoDevice, handle);

            setTimeout(function(){updateImage(videoDevice, handle)}, 0);
            }, 
            function(error) { 
                console.log(error);
            } 
        );
    }
    
    self.stopVideo = function() {
        try{
            enablePlay = false;
            clearTimeout(timer);
            unsubscribeCamera(g_videoDevice, g_handle); 
        }
        catch(err){
        }
    }
    
    return self;
})(window.VideoUtils || {}, jQuery);


