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
        //check support for HTML5 audio
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
    // Get the main iframe
    const mainFrame = document.getElementById("page");

    // Ensure the main iframe has loaded content
    if (mainFrame.contentWindow) {
        // Access the nested iframe
        const innerFrame = mainFrame.contentWindow.document.getElementById("mainbox");

        // Change the src of the nested iframe
        if (innerFrame) {
            innerFrame.src = url;
        } else {
            console.error("nested iframe not found!");
        }
    }
}

/* next button */
const images = ["button4.gif", "button2.gif", "button.gif", "button3.png"];
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
    $("#togglenav a").click(function () {
        $("main .toggled").hide();

        var toggleId = $(this).attr("href").substr(1);
        $("." + toggleId).toggle();
    });

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        $("main .toggled").hide();
        $(".toggled." + hash).show();
    } else {
        $("main .overview").show();
    }
});