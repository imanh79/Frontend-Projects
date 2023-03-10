const Tracks = [{
    name: "Moral of the Story",
    artist: "Ashe",
    cover: "photo_2023-03-07_09-54-12.jpg",
    source: "https://ts2.tarafdari.com/contents/user379001/content-sound/ashe_-_moral_of_the_story.mp3",
    link: "http://81.4.110.89/Ashe-Moral-of-the-Story-320.mp3",
    favorited: false
}, {
    name: "Dream",
    artist: "Imagine Dragons",
    cover: "dream-imagine-drogons.jpg",
    source: "https://ts1.tarafdari.com/contents/user147168/content-sound/09_dream.mp3",
    link: "http://81.4.110.89/Imagine-Dragons-Dream-320.mp3",
    favorited: false
}, {
    name: "Calm Down",
    artist: "Selena Gomez",
    cover: "Calm-Down\ selena\ gomes.jpg",
    source: "https://ts12.tarafdari.com/contents/user760078/content-sound/rema_selena_gomez_-_calm_down320.mp3",
    link: "http://81.4.110.89/Rema-Selena-Gomez-Calm-Down-320.mp3",
    favorited: false
}, {
    name: "Unholy",
    artist: "Sam Smith Kim Petras",
    cover: "photo_2023-03-07_09-59-16.jpg",
    source: "https://ts12.tarafdari.com/contents/user300048/content-sound/sam_smith_unholy_ft_kim_petras.mp3",
    link: "http://81.4.110.89/Sam-Smith-Kim-Petras-Unholy-320.mp3",
    favorited: false
}, {
    name: "Heart Wants What It Wants",
    artist: "Selena Gomez",
    cover: "photo_2016-06-07_23-02-12.jpg",
    source: "https://ts1.tarafdari.com/contents/user196737/content-sound/01_the_heart_wants_what_it_wants.mp3",
    link: "http://81.4.110.89/Selena-Gomez-The-Heart-Wants-What-It-Wants-320.mp3",
    favorited: false
}, {
    name: "Saved My Life",
    artist: "Sia",
    cover: "photo_2021-02-12_11-03-21.jpg",
    source: "https://ts5.tarafdari.com/contents/user628719/content-sound/sia_-_saved_my_life.mp3",
    link: "http://81.4.110.89/Sia-Saved-My-Life-320.mp3",
    favorited: false
}];


const myAudio = new Audio();
const play = document.querySelector("#playpause");
const timer = document.querySelector(".time-music");
const timermusic = document.querySelector(".time-music--org");
const timehover = document.querySelector(".range-music--hover");
const progressBar = document.querySelector('.range-music--progress');
const progressBar2 = document.querySelector('.range-music--progressbar');
const rangemusic = document.querySelector('.range-music');
const like = document.querySelector(".fa-heart");
const next = document.querySelector(".next");
const backgimage = document.querySelector(".image-side");
const pervious = document.querySelector(".previous");
const artist = document.querySelector(".singer");
const soundname = document.querySelector(".music-name");
const download = document.querySelector(".downloadclass");

let intervalId = null;
let duration;
let count = 0;

const loader = document.querySelector(".parent-loader");

loader.style.display = "block";


window.addEventListener("load", (e) => {
    const checkLoadInterval = setInterval(() => {
        if (timermusic.innerHTML !== "") {
            clearInterval(checkLoadInterval);
            loader.style.display = "none";
            showmusic(count);
        }
    }, 50);

});


if (timermusic.innerHTML) {
    showmusic(count);
    clearInterval(checkLoadInterval);
}

window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('musicData'));

    if (savedData) {
        count = savedData.count;
        myAudio.currentTime = savedData.currentTime;
        Tracksa = savedData.tracks;
        showmusic(count);
    } else {
        const item = Tracks[count];
        soundname.innerHTML = item.name;
        artist.innerHTML = item.artist;
        backgimage.style.backgroundImage = "url('./images/" + item.cover + "')";
        myAudio.src = item.source;
    }

    const likeStatus = localStorage.getItem("likeStatus");

    if (likeStatus !== null) {
        const parsedLikeStatus = JSON.parse(likeStatus);

        if (parsedLikeStatus) {
            like.classList.add("likebtn");
        }
    }

    console.log("loaded");
};




// Code to load content goes here
// setTimeout(function() {
//     document.querySelector('.loading-container').style.display = 'none';
//     // Code to display content goes here
// }, 3000); // Set timeout to simulate loading time

download.addEventListener("click", () => {
    const downloadButton = document.querySelector(".download");
    downloadButton.style.color = "#068d20";
    setTimeout(() => {
        downloadButton.style.color = "#acb8cc";
    }, 1000);
});
timer.addEventListener("click", function(event) {
    event.stopPropagation();
});

myAudio.addEventListener('canplaythrough', () => {
    duration = myAudio.duration;
});
window.addEventListener("DOMContentLoaded", function() {
    play.setAttribute("class", "fa-solid fa-play")
    myAudio.addEventListener('timeupdate', function() {
        localStorage.setItem('musicData', JSON.stringify({
            count,
            currentTime: myAudio.currentTime,
            tracks: Tracks
        }));
    });
})

function showmusic(counter) {
    const item = Tracks[counter]
    soundname.innerHTML = item.name
    artist.innerHTML = item.artist
    backgimage.style.backgroundImage = "url('./images/" + item.cover + "')";
    myAudio.src = item.source
    download.setAttribute("href", item.link)
    myAudio.currentTime = 0;
    myAudio.pause();
    myAudio.load();
    // play.setAttribute("class", "fa-solid fa-pause"); // تغییر آیکون دکمه پخش به "fa-solid fa-pause"
    myAudio.addEventListener('ended', function() {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    });
}


next.addEventListener("click", () => {
    count++;
    if (count > Tracks.length - 1) {
        count = 0;
    }

    myAudio.pause();
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
    showmusic(count)
})
pervious.addEventListener("click", () => {
    count--;
    if (count < 0) {
        count = Tracks.length - 1;
    }
    showmusic(count)
})

function saveLikeStatus() {
    localStorage.setItem("likeStatus", JSON.stringify(like.classList.contains("likebtn")));
}

function likes() {
    like.classList.toggle("likebtn");
    saveLikeStatus();
}

startProgressBar()
rangemusic.addEventListener("click", (e) => {
    var rect = rangemusic.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var width = rect.width;
    var duration = myAudio.duration;
    var currentTimee = (x / width) * duration;
    myAudio.currentTime = currentTimee;

});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
// مقدار مشخص شده توسط حرکت موس توسط هاور کردن
rangemusic.addEventListener('mousemove', e => {
    const rect = rangemusic.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX >= 0 && mouseX <= rangemusic.clientWidth) {
        timehover.style.display = 'block';
        const percentage = (mouseX / rangemusic.clientWidth) * 100;
        const currentTime = (duration / 100) * percentage;
        timehover.innerHTML = formatTime(currentTime.toFixed(2));
        progressBar2.style.width = `${percentage}%`;
        timehover.style.left = `${percentage}%`;
    } else {
        timehover.style.display = 'none';
    }
});


rangemusic.addEventListener('mouseleave', () => {
    progressBar2.style.width = '0%';
    timehover.style.display = 'none';
});
play.addEventListener('click', () => {
    if (play.classList.contains('fa-play')) {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
        myAudio.play(); // شروع پخش آهنگ
    } else {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
        myAudio.pause(); // متوقف کردن پخش آهنگ
    }
});

function startProgressBar() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        var progress = (myAudio.currentTime / myAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }, 100);
}

var update = setInterval(function() {
    var mins = Math.floor(myAudio.currentTime / 60);
    var secs = Math.floor(myAudio.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    timer.innerHTML = mins + ':' + secs;
    // timehover.innerHTML = mins + ':' + secs;
}, 10);

///////////////////////////////////////////////// timeer music ///////////////////////////////////////////
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var remainingSeconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));

    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }

    if (hours) {
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return hours + ':' + minutes + ':' + remainingSeconds;
    } else {
        return minutes + ':' + remainingSeconds;
    }
}
myAudio.onloadedmetadata = function() {
    var totalAudioTime = myAudio.duration;
    var formattedTime = formatTime(totalAudioTime);
    // مقدار کل زمان صدا به فرمت ساعتی (hh:mm:ss)
    timermusic.innerHTML = formattedTime

}