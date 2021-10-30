let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

let backgroundstyle = -1;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "Same Beef",
     path: "audio/song1.mp3",
     img: "image/img1.jpg",
     singer: "Sidhu Moose Wala / Bohemia"
   },
   {
     name: "These Days",
     path: "audio/song2.mp3",
     img: "image/img2.jpg",
     singer: "Sidhu Moose Wala / Bohemia"
   },
   {
     name: "Yaariyan",
     path: "audio/song3.mp3",
     img: "image/img3.jpg",
     singer: "Sidhu Moose Wala"
   },
   {
     name: "Yaar Jatt de",
     path: "audio/song4.mp3",
     img: "image/img4.jpg",
     singer: "Karan Aujla"
   },
   {
     name: "12 Bande",
     path: "audio/song5.mp3",
     img: "image/img5.jpg",
     singer: "Varinder brar"
   }
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
    }
	// else{
	// 	index_no = 0;
	// 	load_track(index_no);
	// 	playsong();

	// }
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}
    // else{
	// 	index_no = All_song.length;
	// 	load_track(index_no);
	// 	playsong();
	// }
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
}

const playlist = document.querySelector(".playlist");

let num = All_song.length;
index_no = 0;

while(num-- > 0){
    let song = document.createElement("div");
    song.classList.add(index_no);
    song.classList.add("song");
    song.innerHTML = `<div class="srno">${index_no + 1}</div>
    <div class="songName">${All_song[index_no].name}</div>
    <div class="artist">${All_song[index_no].singer}</div>`;

    playlist.append(song);
    index_no++;
}

let song = document.querySelectorAll(".song");
let serialNo = document.querySelectorAll(".song .srno");
for(let i = 0;i < song.length;i++){
    song[i].addEventListener("click",function(e){
        console.log(backgroundstyle)
        song[i].style.background = "linear-gradient(315deg, #e23456 0%, #be761f 74%)";
        if(backgroundstyle != -1){
          song[backgroundstyle].style.removeProperty("background");
        }
        backgroundstyle = i;
        index_no = serialNo[i].innerText - 1;
        load_track(index_no);
        playsong();
    });
}