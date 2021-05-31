Webcam.set({
    width: 450,
    height: 400,
    image_format: 'png',
    png_quality: 100,
});
camera = document.getElementById("webcam");

Webcam.attach(camera);

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='selfie' src='" + data_uri + "'>";
    });
}
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uqn4a-6cM/model.json", modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}
function numbertotxt(){
    if(results >=0.75){
        document.getElementById("object-txt").innerHTML = "Strong";
        document.getElementById("objext-txt").style.color = "hsl(122, 69%, 54%)";
    }
    else if(results <=0.75 && results >= 0.45){
        document.getElementById("object-txt").innerHTML = "Somewhat Ok";
        document.getElementById("objext-txt").style.color = "hsl(58, 88%, 57%)";
    }
    else{
        document.getElementById("object-txt").innerHTML = "Not Ok";
        document.getElementById("objext-txt").style.color = "hsl(0, 88%, 57%)";
    }
}
function check(){
    img = document.getElementById("selfie");
    classifier.classify(img, gotResult);
    numbertotxt();
}
function gotResult(error, results){
    if(error){
    console.error(error);    
    }
    else{
        console.log(results);
        document.getElementById("object-name").innerHTML = results[0].label;
        results = results[0].confidence.toFixed(2);
        document.getElementById("object-accuracy").innerHTML = results;
    }
}