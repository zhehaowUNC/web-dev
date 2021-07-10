
var status = "pause";
var x = document.querySelector('.myAudio');
var audio = document.getElementsByClassName('myAudio');
var myVar;

function music(current){
	myVar = setInterval(addopacity,15);
	if (x !== undefined) {
		x.currentTime = 0;
		x.pause();

	}
	x = current.querySelector(".myAudio");

	status = "play";
	document.querySelector('.playbtn').innerHTML = "pause";
	document.querySelector('#playercontainer').style.visibility = "visible"; 
	document.querySelector('.playercover').src = current.querySelector('.circle').src;
	document.querySelector('#currentsongname').innerHTML = current.querySelector('.songname').innerHTML;
	document.querySelector('#currentsongartist').innerHTML = document.querySelector('.artist').innerHTML;
	x.play();
	x.addEventListener('timeupdate',updateProgress);
}

function turnstatus(){
	if (document.querySelector('.playbtn').innerHTML === "pause") {
		document.querySelector('.playbtn').innerHTML = "play_arrow";
		status = "pause";
		x.pause()
	}
	else{
		document.querySelector('.playbtn').innerHTML = "pause";
				status = "play";
				x.play()

	}

};
function getindexfornext(){
	for (var i = 0; i < audio.length; i++) {
   		if(audio.item(i).querySelector('source').src ===x.querySelector('source').src){
   			if (i+1>audio.length-1){
   				x = audio.item(0);
   			return;}
   		x = audio.item(i+1);

   		return;
}
}
}



function getindexforprev(){
	for (var i = 0; i < audio.length; i++) {
   		if(audio.item(i).querySelector('source').src ===x.querySelector('source').src){
   			if (i-1<0){
   				x = audio.item(audio.length-1);
   			return;}
   		x = audio.item(i-1);

   		return;
}
}
}


function nextsong(){
	if (x !== undefined) {
		x.currentTime = 0;
		x.pause();

	}

	getindexfornext();
	music(x.parentElement);
	

}
function prevsong(){
	if (x !== undefined) {
		x.currentTime = 0;
		x.pause();

	}

	getindexforprev();
	music(x.parentElement);
	


}
function addopacity(){
	var player = document.getElementById('playercontainer');
	opacity = Number(window.getComputedStyle(player).getPropertyValue("opacity"));

	if(opacity<1){
		opacity+=0.1;
		player.style.opacity = opacity;
	}

else{
	clearInterval(myVar);
}
}
function updateProgress(e){
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime/duration);
	var progressbar = document.getElementById('progress').offsetWidth;
	
	value = progressbar* progressPercent;
	document.getElementById('bar').style.width =`${value}px`;
	document.getElementById('circle').style.left = `${value-1}px`
	if (Math.floor(currentTime%60)<10) {
		document.getElementById('time').innerHTML = `${Math.floor(currentTime/60)}:0${Math.floor(currentTime%60)}`
	}
	else{
	document.getElementById('time').innerHTML = `${Math.floor(currentTime/60)}:${Math.floor(currentTime%60)}`;
}
	if (currentTime === duration){
		turnstatus();
		return;
	}
}
document.getElementById('progress').addEventListener('click', setProgress);
document.getElementById('bar').addEventListener('click', setProgressbar);
function setProgress(e){
	const width = this.offsetWidth;
	
	const clickX = e.offsetX;
	const duration = x.duration;

	x.currentTime = (clickX/width)*duration;
}
function setProgressbar(e){
	const width = document.getElementById('progress').offsetWidth;
	
	const clickX = e.offsetX;
	const duration = x.duration;
	
	x.currentTime = (clickX/width)*duration;
}

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('songs');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelector('.songname');
    b = li[i].querySelector('.album')
    txtValue = a.innerHTML;
    txtValueb = b.innerHTML;
    if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValueb.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }var isnotempty = false;
	for (i = 0; i < li.length; i++) {
		if(li[i].style.display !== "none"){
			isnotempty = true;
		}
	if (!isnotempty){
		input.style.marginBottom = "400px";
	}
	else{
		input.style.marginBottom = "20px";

	}
	}
}
	





var isDown = true;
document.getElementById('circle').addEventListener('mousedown', function(e) {
    isDown = true;
});

document.addEventListener('mouseup', function() {
  isDown = true;
});
console.log(window.getComputedStyle(document.getElementById('circle')).getPropertyValue("left"));
document.addEventListener('mousemove', function(event) {
   event.preventDefault();
   if (isDown) {
   var deltaX = event.movementX;
   document.getElementById('circle').style.left = Number(window.getComputedStyle(document.getElementById('circle')).getPropertyValue("left"))+deltaX + "px";
}})


