Webcam.set
({
    width: 350,
    height: 300,
    image_format:'png',
    png_qualtiy:'90'
});

camera = document.getElementById("webcam");

Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_photo' src='"+data_uri+"'>"
    });
}
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-jEBKZ3hE/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}
function identify_snapshot()
{
    img = document.getElementById("captured_photo");
    classifier.classify(img, got_result);
}

function speak()
{
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The first prediction is "+prediction_1;
    speak_data_2 = "And the second prediction is "+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function got_result(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("name").innerHTML = results[0].label;
        document.getElementById("name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "happy")
        {
            document.getElementById("emoji").innerHTML = "&#128512";
        }
        if(results[0].label == "sad")
        {
            document.getElementById("emoji").innerHTML = "&#128542";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("emoji").innerHTML = "&#128545";
        }

        if(results[1].label == "happy")
        {
            document.getElementById("emoji_2").innerHTML = "&#128512";
        }
        if(results[1].label == "sad")
        {
            document.getElementById("emoji_2").innerHTML = "&#128542";
        }
        if(results[1].label == "angry")
        {
            document.getElementById("emoji_2").innerHTML = "&#128545";
        }
    }
}

