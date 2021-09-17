multipleClick_clickTime = null;
multipleClick_target = null;

function preventMultipleClick(id) {
    sameTarget = false;
    if(id==multipleClick_target) {
        sameTarget = true;
    }
    multipleClick_target = id;
    fastClick = false;
    var currentClickTime = new Date();
    if (currentClickTime - multipleClick_clickTime < 500) {
        fastClick = true;
    }
    multipleClick_clickTime = currentClickTime;
    return (sameTarget && fastClick);
};

var current_item = null;
var current_timeout = null;

function display(id) {
    new_menu = $( id );
    if (current_item == null) {
        current_item = new_menu;
        new_menu.fadeIn();
    } else if (current_item == new_menu) {
        return;
    } else {
        current_item.stop( true, true ).fadeOut(complete=function() {
            current_item = new_menu;
            new_menu.fadeIn();
        });
    }
};

var listBarcodes = {};

function insertBarcode(barcode) {
    console.log("New barcode read: ", barcode);
    if (barcode in listBarcodes) {
        listBarcodes[barcode] = listBarcodes[barcode] + 1;
        $('#'+barcode).parent().stop(true, true).toggleClass("highlight").delay(300).queue(function() { $('#'+barcode).text(listBarcodes[barcode]); $('#'+barcode).parent().stop(true, true).toggleClass("highlight");});;
    } else {
        listBarcodes[barcode] = 1;
        $('#productsList').append('<li class="list-group-item"><span class="badge" id="'+barcode+'"></span><img src="barcode-icon.png"/> '+barcode+'</li>');
        $('#'+barcode).parent().stop(true, true).toggleClass("highlight").delay(300).queue(function() { $('#'+barcode).text(listBarcodes[barcode]); $('#'+barcode).parent().stop(true, true).toggleClass("highlight");});;
    }
};

var subscriberName = "barcode-reader-webpage";
var theContext;
var theVideoDevice;
var theLastImage = [];

var currentProductImage="1";
var newProductImage="2";

function toggleProductImages() {
    if (currentProductImage=="1") {
        currentProductImage="2";
        newProductImage="1";
    } else {
        currentProductImage="1";
        newProductImage="2";
    }
    $("#product-image-"+newProductImage).fadeOut("slow", function() { $("#product-image-"+currentProductImage).fadeIn("slow"); });
};

var application = function() {
    var onConnected = function(session) {
        console.log('RobotUtils: connected!');

        var TRANSLATION={
                            "facecamera": { "French": "Placez le code devant la caméra",
                                            "English":"Show the barcode to the camera" },
                            "barcode": { "French": "Code :",
                                         "English":"Code:" },
                            "title": { "French": "Titre :",
                                       "English":"Title:" },
                            "images": { "French": "Images :",
                                        "English":"Images:" },
                            "text": { "French": "Texte description :",
                                      "English":"Text on web page:" },
                            "speech": { "French": "Discours de Pepper :",
                                        "English":"Pepper speech:" },
                            "price": { "French": "Prix :",
                                       "English":"Price:" },
                            "save": { "French": "Enregistrer",
                                      "English":"Save" }
                       };

        display("#loading_menu");

        // Load translations
        RobotUtils.onService(function (ALTextToSpeech) {
            ALTextToSpeech.getLanguage().then(function(lang) {
                $(".totranslate").each( function(id, element){
                    var element_id = element.id;
                    if(TRANSLATION[element_id]) {
                        if(TRANSLATION[element_id][lang]) {
                            $("#"+element_id).text(TRANSLATION[element_id][lang]);
                        }
                    } else {
                        $("#"+element_id).text("#"+lang+" missing#");
                    }
                });
                display(".main_menu");
                $("body").css("background-image", "url(background.jpg)");
            });
        });

        // Exit Button
        $('#btn_quit').click( function(){
            if (preventMultipleClick("btn_quit")) return;
            RobotUtils.onService(function (ALMemory) {
                ALMemory.raiseEvent("BarcodeReader/exit", 1);
            });
        });

        // Manual barcode form
        $('#send_barcode').click( function(){
            if (preventMultipleClick("send_barcode")) return;
            $("#input_barcode").blur();
            var value = $("#input_barcode").val();
            if (value){
                RobotUtils.onService(function (ALMemory) {
                    ALMemory.raiseEvent("BarcodeReader/Barcode", value);
                });
            }
        });

        $("#input_barcode").on("keydown",function(event){
            if (event.keyCode == 9 || event.keyCode == 13 ) {
                $("#send_barcode").click();
            }
        });

        RobotUtils.subscribeToALMemoryEvent("BarcodeReader/Barcode", insertBarcode);

        // Display product infos
        RobotUtils.subscribeToALMemoryEvent("product-information/product-data-available", function() {
            RobotUtils.onService(function (ALMemory) {
                Promise.all( [  ALMemory.getData("product-information/image1").then( function(value) { $('#product-image-1').attr('src', 'products/'+value); }),
                                ALMemory.getData("product-information/image2").then( function(value) { $('#product-image-2').attr('src', 'products/'+value); }),
                                ALMemory.getData("product-information/title").then( function(value) { $('#product-title').text(value); }),
                                ALMemory.getData("product-information/textweb").then( function(value) { $('#product-blabla').html(value); }),
                                ALMemory.getData("product-information/price").then( function(value) { $('#product-price').text(value); })
                             ]).then(function() {
                                document.activeElement.blur();
                                $('#left-panel').animate({left: "-700px"});
                                $("body").css("background-image", "none");
                                $("#product-detail").fadeIn();
                            });
            });
        });

        setInterval(toggleProductImages, 10000);

        // Camera
        RobotUtils.onService(function (ALVideoDevice) {
                theVideoDevice = ALVideoDevice;
                VideoUtils.unsubscribeAllHandlers(theVideoDevice, subscriberName+"_camera").then(function() {VideoUtils.startVideo(theVideoDevice, "videoBuffer", 0, 10, 0) });
            }
        );

        window.onbeforeunload = function() {
            VideoUtils.unsubscribeCamera(theVideoDevice, handle)(subscriberName).then(function() {console.log("exited +");}, function() {console.log("exited -");});
        };

        // Load left panel
        RobotUtils.onService(function (ALMemory) {
            Promise.all( [  ALMemory.getData("product-information/generic-product/image1").then( function(value) { $('#input_nao_image1').css('background-image', 'url(products/'+value+')'); }),
                            ALMemory.getData("product-information/generic-product/image2").then( function(value) { $('#input_nao_image2').css('background-image', 'url(products/'+value+')'); }),
                            ALMemory.getData("product-information/generic-product/title").then( function(value) { $('#input_nao_title').val(value); }),
                            ALMemory.getData("product-information/generic-product/speech").then( function(value) { $('#input_nao_speech').text(value); }),
                            ALMemory.getData("product-information/generic-product/textweb").then( function(value) { $('#input_nao_blabla').html(value); }),
                            ALMemory.getData("product-information/generic-product/price").then( function(value) { $('#input_nao_price').val(value); })
                         ]);
        });

        $("body").swiperight(function() {
            $('#left-panel').animate({
                left: "0px"
            });
            $("#input_nao_title").focus();
        });

        $("body").swipeleft(function() {
            $('#left-panel').animate({
                left: "-700px"
            });
        });

        $("#nao_modif_form").submit(function(e) {
            e.preventDefault();
            RobotUtils.onService(function (ALMemory) {
                Promise.all( [  ALMemory.insertData("product-information/generic-product/title", $('#input_nao_title').val()),
                                ALMemory.insertData("product-information/generic-product/speech", $('#input_nao_speech').val()),
                                ALMemory.insertData("product-information/generic-product/textweb", $('#input_nao_blabla').val()),
                                ALMemory.insertData("product-information/generic-product/price", $('#input_nao_price').val())
                             ]).then(function() {
                                $('#left-panel').animate({
                                    left: "-700px"
                                });
                                RobotUtils.onService(function (ALMemory) {
                                    ALMemory.raiseEvent("BarcodeReader/Barcode", "test-generic");
                                });
                            });
            });
        });

        $("#input_nao_title").focus(function() {
            $('#left-panel').animate({ scrollTop: 0 }, 500);
        });
        $("#input_nao_blabla").focus(function() {
            $('#left-panel').animate({ scrollTop: 350 }, 500);
        });
        $("#input_nao_speech").focus(function() {
            $('#left-panel').animate({ scrollTop: 500 }, 500);
        });
        $("#input_nao_price").focus(function() {
            $('#left-panel').animate({ scrollTop: 630 }, 500);
        });


        RobotUtils.onService(function (ALMemory) {
            ALMemory.raiseEvent("BarcodeReader/WebpageReady", 1);
        });
    }

    var onError = function(){
        console.error('Qimessaging: disconnected!');
        stateChanged();
    }

    RobotUtils.connect(onConnected, onError);
};
