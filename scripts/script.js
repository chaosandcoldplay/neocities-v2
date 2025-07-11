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

var mouseoversound = createsoundbite("https://files.catbox.moe/c23vyj.mp3");
var clicksound = createsoundbite("https://files.catbox.moe/i9vbgs.mp3");
var popsound = createsoundbite("https://files.catbox.moe/6l7okm.mp3");

/* frame load */
function loadInNestedIframe(url) {
    const mainFrame = document.getElementsByClassName("page")[0];
    if (mainFrame && mainFrame.contentWindow) {
        const innerFrame = mainFrame.contentWindow.document.getElementsByClassName("mainbox")[0];
        if (innerFrame) {
            innerFrame.src = url;
        } else {
            console.error("nested iframe not found!");
        }
    } else {
        console.error("main iframe or its contentWindow not found!");
    }
}

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
