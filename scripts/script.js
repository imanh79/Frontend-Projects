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
    source: "https://dl.musicdel.ir/Music/1401/01/imagine_dragons_dream.mp3",
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
}]
console.log(Tracks[0]);
const myAudio = new Audio("https://dl.pinkmusic.ir/uploads/2023/01/Dj-Goja-x-Magic-Phase-Calm-Down-Rema-Cover-.mp3"),
    play = document.querySelector("#playpause"),
    timer = document.querySelector(".time-music"),
    timermusic = document.querySelector(".time-music--org"),
    timehover = document.querySelector(".range-music--hover"),
    progressBar = document.querySelector('.range-music--progress'),
    progressBar2 = document.querySelector('.range-music--progressbar'),
    rangemusic = document.querySelector('.range-music'),
    like = document.querySelector(".fa-heart"),
    next = document.querySelector(".next"),
    backgimage = document.querySelector(".image-side"),
    pervious = document.querySelector(".previous"),
    artist = document.querySelector(".singer"),
    soundname = document.querySelector(".music-name"),
    download = document.querySelector(".downloadclass")


let intervalId = null,
    duration;
let count = 0

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
console.log(next);
console.log(backgimage.style.backgroundImage);
myAudio.addEventListener('canplaythrough', () => {
    duration = myAudio.duration;
});
window.addEventListener("DOMContentLoaded", function() {
        for (let i = 0; i < Tracks.length; i++) {
            const track = Tracks[i];
            const source = track.source;
            const trackAudio = new Audio(source);
            myAudio.appendChild(trackAudio);
        }
        play.setAttribute("class", "fa-solid fa-play")
            // دریافت اطلاعات از localStorage
        const savedData = JSON.parse(localStorage.getItem('musicData'));

        // اگر داده‌ها در localStorage موجود بودند، آنها را به عنوان اطلاعات پیشفرض قرار بدهید
        if (savedData) {
            count = savedData.count;
            myAudio.currentTime = savedData.currentTime;
            Tracksa = savedData.tracks;
            showmusic(count);
        } else {
            // در غیر این صورت، اطلاعات پیشفرض را قرار دهید
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
    })
    // MIN:SEC زمان مشخص شده توسط حرکت موس


// ذخیره آهنگ در local storage
myAudio.addEventListener('timeupdate', function() {
    localStorage.setItem('musicData', JSON.stringify({
        count,
        currentTime: myAudio.currentTime,
        tracks: Tracks
    }));
});

function showmusic(counter) {
    const item = Tracks[counter]
    console.log(item);
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
    console.log(count);

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
    console.log(count);
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

myAudio.addEventListener("timeupdate", () => {
    const duration = myAudio.duration;
    const currentTimee = myAudio.currentTime;
    const width = rangemusic.clientWidth;
    const percentage = (currentTimee / duration) * 100;
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