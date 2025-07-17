/* click + hover sounds */
var html5_audiotypes = {
    mp3: "audio/mpeg",
    mp4: "audio/mp4",
    ogg: "audio/ogg",
    wav: "audio/wav"
};

function createsoundbite(sound) {
    var html5audio = document.createElement("audio");
    if (html5audio.canPlayType) {
        for (var i = 0; i < arguments.length; i++) {
            var sourceel = document.createElement("source");
            sourceel.setAttribute("src", arguments[i]);
            if (arguments[i].match(/\.(\w+)$/i)) sourceel.setAttribute("type", html5_audiotypes[RegExp.$1]);
            html5audio.appendChild(sourceel);
        }
        html5audio.load();
        html5audio.playclip = function () {
            html5audio.pause();
            html5audio.currentTime = 0;
            html5audio.play();
        };
        return html5audio;
    } else {
        return {
            playclip: function () {
                throw new Error("your browser doesn't support HTML5 audio unfortunately");
            }
        };
    }
}

var mouseoversound = createsoundbite("https://file.garden/ZxOOS50ya2Lt0FdH/c23vyj.mp3");
var clicksound = createsoundbite("https://file.garden/ZxOOS50ya2Lt0FdH/i9vbgs.mp3");
var popsound = createsoundbite("https://file.garden/ZxOOS50ya2Lt0FdH/6l7okm.mp3");

/* next button */
const images = [
    "assets/buttons/button3.gif",
    "assets/buttons/button2.gif",
    "assets/buttons/button.gif"
  ];
let currentIndex = 0;

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("sliderImage").src = images[currentIndex];
}

/* draggable elements */
$(function () {
    $(".draggable").draggable();
});

/* toggle windows */
document.addEventListener("DOMContentLoaded", (event) => {
    const showImages = document.getElementsByClassName("showimage");
    const hideImages = document.getElementsByClassName("hideimage");
    const toggleDivs = document.getElementsByClassName("toggle");

    for (let i = 0; i < showImages.length; i++) {
        showImages[i].addEventListener("click", () => {
            toggleDivs[i].classList.remove("hidden");
        });

        hideImages[i].addEventListener("click", () => {
            toggleDivs[i].classList.add("hidden");
        });
    }
});

/* hashtag toggle */
$(document).ready(function () {
    $("main .toggled").hide();
    $("main.showall .toggled").show();
    $("#togglenavi a").click(function () {
        $("main .toggled").hide();

        var toggleId = $(this).attr("href").substr(1);
        $("." + toggleId).toggle();
    });

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        $("main .toggled").hide();
        $(".toggled." + hash).show();
    } else {
    $("main .toggled").hide();
    $(".toggled.home").show(); // or use your default class name
    window.location.hash = "#home"; // sets the visible hash in the URL
}
});
