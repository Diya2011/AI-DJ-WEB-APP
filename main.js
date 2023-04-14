song=""
scorerightwrist=0
scoreleftwrist=0
leftwristx=0
leftwristy=0
rightwristx=0
rightwristy=0
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
canvas = createCanvas(600,500)
canvas.center()
video = createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded)
posenet.on('pose',gotresult)
}
function modelloaded(){
    console.log("modelisloaded")
}

function gotresult(results){
console.log(results)
scorerightwrist=results[0].pose.keypoints[10].score
scoreleftwrist=results[0].pose.keypoints[9].score
leftwristx=results[0].pose.leftWrist.x
leftwristy=results[0].pose.leftWrist.y
rightwristx=results[0].pose.rightWrist.x
rightwristy=results[0].pose.rightWrist.y
}
function draw(){
    image(video, 0,0,600,500)
    fill("red") 
    if (scoreleftwrist>0.2) {
      circle(leftwristx,leftwristy,20)  
      left=Number(leftwristy)
      removedecimal=floor(left)
      volume=removedecimal/500
      song.setVolume(volume)
      document.getElementById("volume").innerHTML="volume="+volume
    }
    if (scorerightwrist>0.2) {
     circle(rightwristx,rightwristy,20)
        if (rightwristy>0 && rightwristy<100) {
            document.getElementById("speed").innerHTML="speed=0.5x"
            song.rate(0.5)
  
        }
        if (rightwristy>100 && rightwristy<200) {
            document.getElementById("speed").innerHTML="speed=1x"
            song.rate(1)
  
        }
        if (rightwristy>200 && rightwristy<300) {
            document.getElementById("speed").innerHTML="speed=1.5x"
            song.rate(1.5)
  
        }
        if (rightwristy>300 && rightwristy<400) {
            document.getElementById("speed").innerHTML="speed=2x"
            song.rate(2)
  
        } 
        if (rightwristy>400 && rightwristy<500) {
            document.getElementById("speed").innerHTML="speed=2.5x"
            song.rate(2.5)
  
        } 
    }
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
