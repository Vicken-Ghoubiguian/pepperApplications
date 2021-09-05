define(['./module'], function (controllers) {
    'use strict';
    
    controllers.controller('MoodSmoothie', ['$scope', '$qi', function($scope, $qi) {
    
      var mood = new TimeSeries();
      var speech = new TimeSeries();
      var speech1 = new TimeSeries();
      var speech2 = new TimeSeries();
      var speech3 = new TimeSeries();
      var speech4 = new TimeSeries();
      var speech5 = new TimeSeries();
      var speech6 = new TimeSeries();
      var speech7 = new TimeSeries();
      var smoothie = new SmoothieChart( {maxValue:1, minValue: -1, 
          grid: { strokeStyle: 'rgb(119, 202, 237)', fillStyle: 'rgb(61, 162, 217)', 
          lineWidth: 1, millisPerLine: 10000000000, verticalSections: 1},
          horizontalLines: [ {value:-0.2, color:'rgb(119, 202, 237)', lineWidth:2}, 
                             {value:0.2, color:'rgb(119, 202, 237)', lineWidth:2}], 
        }
        );

      var speechSeriesOptions;
      var moodSeriesOptions;
      var isSpeaking = 0;
      var isRunning = true;
      var currentMood = 0.0;
      var currentConfidence = 0.0;
      var ctx = document.getElementById('smileycanvas').getContext('2d');
      var ctxbg = document.getElementById('backgroundcanvas').getContext('2d');
      var ctxperson = document.getElementById('personcanvas').getContext('2d');
      var ctxquestion = document.getElementById('questioncanvas').getContext('2d');
      var ctxText=document.getElementById('wordcanvas').getContext('2d');

      var smileyImg = new Image();
      var questionImg = new Image();
      var detectedEmotion = "unknown";
      var detectedWords = "hello world!";
      var utteranceIndex = 0;
      var textClearTimeout = 0;
      
      // Initialize ?? which is placed beneath the smileys 
      questionImg.onload = function (){
        ctxquestion.drawImage(questionImg,1250,360,300,300);
      };

      // Initialize smiley image, which disappears when confidence is low
      smileyImg.onload = function (){
        ctx.drawImage(smileyImg,1190,295,425,425);
      };

      ctxbg.rect(1200,0,500,1000);
      ctxbg.fillStyle="rgb(61, 162, 217)";
      ctxbg.fill();
      ctxbg.beginPath();
      ctxbg.moveTo(1200,0);
      ctxbg.lineTo(1200,1000);
      ctxbg.lineWidth = 15;
      ctxbg.strokeStyle = '#ffffff';
      ctxbg.stroke();

       // Main code for mood
      smoothie.addTimeSeries(mood, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 15 });
      smoothie.addTimeSeries(speech, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech1, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech2, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech3, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech4, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech5, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech6, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});
      smoothie.addTimeSeries(speech7, { strokeStyle: 'rgb(255, 255, 255)', lineWidth: 25});

      var utterances = [speech, speech1, speech2, speech3, speech4, speech5, speech6, speech7];
      
      smoothie.streamTo(document.getElementById("smoothiecanvas"), 1000);


       // Get Mood Options
      for (var i = 0; i < smoothie.seriesSet.length; i++){
        if (smoothie.seriesSet[i].timeSeries === mood){
          moodSeriesOptions = smoothie.seriesSet[i].options;
          break;
        }
      }

      function updatePerson() {
        $qi.call(function(ALMemory) {
			  ALMemory.getData("UserSession/FocusedUser").done(showUser);});
      } // End 

      // ---------- Update mood ---------------
      function updateMood() {
        questionImg.src = 'img/question.png';
        $qi.call(function(ALMood) 
	{
		ALMood.currentPersonState().done(function(personState) 
		{
			$scope.$apply(function () 
			{
				if (personState) 
				{
				      	currentConfidence = personState["valence"]["confidence"];
				      	if (currentConfidence < 0.1) 
					{
						console.log("Low Conf")
						$scope.message = "Confidence low: "+currentConfidence;
						moodSeriesOptions.lineWidth = 2;
						ctx.clearRect(0, 0, smileycanvas.width, smileycanvas.height);
						ctxperson.clearRect(0, 0, personcanvas.width, personcanvas.height);
						ctxText.clearRect(0,0, wordcanvas.width, wordcanvas.height);
				      	}
				      	else 
					{
						console.log("High Conf")
				   		currentMood = personState["valence"]["value"]; 						
						if (currentMood > 0.2) {
					  		smileyImg.src = 'img/happy.png?t='+Math.random(); }
						else if (currentMood < -0.2) {
					  		smileyImg.src = 'img/sad.png?t='+Math.random(); }
						else {
					  		smileyImg.src = 'img/neutral.png?t='+Math.random(); }
					      	mood.append(new Date().getTime(), currentMood);
				   		$scope.message = "Hello, your mood is " + currentMood + " with conf. " + currentConfidence;
						moodSeriesOptions.lineWidth = 15;
						updatePerson();
			      		}
			    	}
	        	});
		});
  	});
      } // End updateMood ----------------------
      

      // Update speech --------------------------
      function updateSpeech() {
        if (isSpeaking)
          utterances[utteranceIndex].append(new Date().getTime(), -0.98);
        else
          utterances[utteranceIndex].append(new Date().getTime(), -1.2);
      }

      setInterval(updateMood, 500); // Timer for mood updates
      setInterval(updateSpeech, 500);


      // On Speech Detected -----------------
      function toggleSpeech (speaking) {
        if ( (isSpeaking == 1) && (speaking == 0) ) { // End utterance
          utteranceIndex = utteranceIndex + 1;
          if (utteranceIndex > 7) {
            utteranceIndex = 0;
          }
        }
        for (var i = 0; i < smoothie.seriesSet.length; i++){
          if (smoothie.seriesSet[i].timeSeries === utterances[utteranceIndex]){
            speechSeriesOptions = smoothie.seriesSet[i].options;
            break;
          }
        }
        speechSeriesOptions.strokeStyle = 'rgb(255, 255, 255)';
        isSpeaking = speaking;
      }

      function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function drawText(text, canvasname, context, x, y, font) {
        context.clearRect(0, 0, canvasname.width, canvasname.height);
        context.font=font;
        context.fillStyle = 'white';
        var capText;
        capText = capitaliseFirstLetter(text);
        context.fillText(capText, x,y);
      }

      // Update words on screen
      function showWords(words){
      	$scope.$apply(function () {
          //ctxText.clearRect(30,30,canvas.width,canvas.height);
	  $scope.wordsDetected = "I heard " + words + " (" + words.length + ")";
          if (words.length > 0) { 
            if (detectedEmotion == "sorrow") {
              words = words + " :("
            }
            else if (detectedEmotion == "anger"){
              words = words + " >.<"
            }
            else if (detectedEmotion == "joy") {
              words = words + " :)"
            }
            detectedWords = words;
	    if (textClearTimeout != 0) {
	      clearTimeout(textClearTimeout);
	    }
            drawText(words, wordcanvas, ctxText, 700, 900, "35px Calibri");
	    textClearTimeout = setTimeout (clearText, 8000 );
	    detectedEmotion = "unknown";
	  }
	});
      }

      function clearText() {
          ctxText.clearRect(0,0,wordcanvas.width, wordcanvas.height);
      }

      function voiceEmotionRecognized(emotion) {
      	$scope.$apply(function () {
          //isSpeaking = 0;
          // Get Series Options
          for (var i = 0; i < smoothie.seriesSet.length; i++){
            if (smoothie.seriesSet[i].timeSeries === utterances[utteranceIndex-1]){
              speechSeriesOptions = smoothie.seriesSet[i].options;
              break;
            }
          }
          if (emotion[0][0] == 1) {
            detectedEmotion = "calm";
            speechSeriesOptions.strokeStyle = 'rgb(100, 100, 100)';
          }
          else if (emotion [0][0] == 2) {
            detectedEmotion = "anger";
            speechSeriesOptions.strokeStyle = 'rgb(255, 0, 0)';
          }
          else if (emotion [0][0] == 3) {
            detectedEmotion = "joy";
            speechSeriesOptions.strokeStyle = 'rgb(0, 255, 0)';
          }
          else if (emotion [0][0] == 4) {
            detectedEmotion = "sorrow";
            speechSeriesOptions.strokeStyle = 'rgb(0, 0, 255)';
          }
					$scope.emotionalVoiceDetected= "I detected " + detectedEmotion;
				});
      }

      function showUser (userID) {
          if (userID) {
            if (userID >= 0) {
              drawText(userID.toString(), personcanvas, ctxperson, 1375, 730, "40px Calibri");
            }
          }
      }
      $qi.subscribeEvent("SpeechDetected", toggleSpeech);
      $qi.subscribeEvent("ALVoiceEmotionAnalysis/EmotionRecognized", voiceEmotionRecognized);
      $qi.subscribeEvent("Dialog/LastInput", showWords);
    }]);

});

