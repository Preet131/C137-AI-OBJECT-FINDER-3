status = ""
objects = []
function setup(){
    canvas = createCanvas(600, 400);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(600, 400);
    video.hide()

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detected Objects";
    input = document.getElementById("input").value
}

function modelLoaded(){
    console.log("Model Loaded!")
    status = "true";
}

function gotResult(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)
    objects = results
    
}
function draw(){
    image(video, 0, 0, 600, 400)
    if(status != ""){
        objectDetector.detect(video, gotResult)
        for(i = 0; i<objects.length; i++){
            percentage = (objects[i].confidence*100).toFixed(2)
            label = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            text(label+"  "+percentage+"%",x-200, y-55);
            noFill();
            rect(x-200, y-50, width-400, height-100);
            if(label == input){
                video.stop()
                document.getElementById("status").innerHTML = "object mentioned found"
                speech = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("Object mentioned found")
                speech.speak(utterThis)

            }   
            else{
                document.getElementById("status").innerHTML = "object mentioned not found"

            }

        }
    }
}