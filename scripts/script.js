/* frame link */
var mainFrame;
var firstLoad = true;
var updateTitle = true;
var pageParam = "z";
var titlePrefix = "";
var hitCounterFunction = undefined;

//Event to handle first page load - Also sets up the mainFrame
window.addEventListener("DOMContentLoaded", (e) => {
    mainFrame = document.getElementById("mainframe");
    mainFrame.addEventListener("load", updateHistory, false);
    setMainFrame();
});

//Event to handle back button presses
window.addEventListener("popstate", function (e) {
    if (e.state !== null) {
        setMainFrame();
    }
});

//Checks to see if a page parameter exists and sets the mainframe src to that page.
function setMainFrame() {
    let params = new URLSearchParams(window.location.search);
    let page = params.get(pageParam);
    if (page != null) {
        page = page.replace("javascript:", ""); // Security to stop url scripts
        mainFrame.src = page;
    }
}

//Updates the browser history with the current page, causing the URL bar to update
async function updateHistory() {
    let title = titlePrefix + mainFrame.contentDocument.title;

    // Stops the page getting into an infinate loop reloading itself
    if (firstLoad) {
        firstLoad = false;
        if (updateTitle) {
            document.title = title;
        }
        if (hitCounterFunction != undefined) {
            hitCounterFunction();
        }
        return;
    }

    history.replaceState({}, title, "?" + pageParam + "=" + mainFrame.contentWindow.location.pathname);

    if (updateTitle) {
        document.title = title;
    }

    //Save a hit - Optionally run this if a hit counter has been defined
    if (hitCounterFunction != undefined) {
        hitCounterFunction();
    }
}

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

var mouseoversound = createsoundbite("https://file.garden/ZxOOS50ya2Lt0FdH/snips/c23vyj.mp3");
var clicksound = createsoundbite("https://file.garden/ZxOOS50ya2Lt0FdH/snips/i9vbgs.mp3");
var popsound = createsoundbite("https://file.garden/ZxOOS50ya2Lt0FdH/snips/6l7okm.mp3");

/* next button */
/* 1-buttons */
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

/* 2-picrews */
const images2 = [
    "assets/images/about/picrews/download20250801182440.png",
    "assets/images/about/picrews/download20250806132905.png",
    "assets/images/about/picrews/download20250806124555.png",
    "assets/images/about/picrews/download20250805212936.png",    
    "assets/images/about/picrews/download20250806154856.png",
    "assets/images/about/picrews/download20251003174500.png",
    "assets/images/about/picrews/download20250806123729.png",
    "assets/images/about/picrews/download20250806133907.png",
    "assets/images/about/picrews/download20250806130636.png",
    "assets/images/about/picrews/download20250806135233.png",
    "assets/images/about/picrews/download20250105184336.png",
    "assets/images/about/picrews/download20250806140726.png",
    "assets/images/about/picrews/download20250806133606.png",
    "assets/images/about/picrews/download20250806160847.png",
    "assets/images/about/picrews/download20251003193048.png",
    "assets/images/about/picrews/download20250806131846.png",
    "assets/images/about/picrews/download20250806135717.png",
    "assets/images/about/picrews/download20250806124207.png",
    "assets/images/about/picrews/download20250101112706.png",
    "assets/images/about/picrews/download20250801182946.png",
    "assets/images/about/picrews/download20250806134643.png",
    "assets/images/about/picrews/1873485_ngkfiTzJ.png",
    "assets/images/about/picrews/download20250805210946.png",
    "assets/images/about/picrews/download20250805202945.png",
    "assets/images/about/picrews/download20250805204204.png",
    "assets/images/about/picrews/download20250805204216.png",
    "assets/images/about/picrews/download20250805200106.png",
    "assets/images/about/picrews/download20250805210255.png",
    "assets/images/about/picrews/download20250805192511.png",
    "assets/images/about/picrews/download20250805204209.png",
    "assets/images/about/picrews/tumblr_f43617c12f3da718e8c63da63ac9b1e6_4a437760_500.jpg",
    "assets/images/about/picrews/download20250805194914.png",
    "assets/images/about/picrews/download20250805193746.png",
    "assets/images/about/picrews/download20250805204941.png",
    "assets/images/about/picrews/download20250105170354.png",
    "assets/images/about/picrews/download20250105180445.png",
    "assets/images/about/picrews/download20250105173632.png",
    "assets/images/about/picrews/download20250200131128.png",
    "assets/images/about/picrews/download20251003212157.png",
    "assets/images/about/picrews/download20251003215616.png",
    "assets/images/about/picrews/my-meiker-1759335637882557.png",
    "assets/images/about/picrews/download20251004181327.png",
    "assets/images/about/picrews/download20251004133714.png",
    "assets/images/about/picrews/download20251004180419.png",
    "assets/images/about/picrews/download20251004002529.png",
    "assets/images/about/picrews/download20251004002043.png",
    "assets/images/about/picrews/download20240700201922.png"
  ];
const links2 = [
    "https://picrew.me/en/image_maker/2112607",
  "https://picrew.me/ja/image_maker/2470419",
  "https://picrew.me/en/image_maker/19569",
  "https://picrew.me/en/image_maker/2300487",  
  "https://picrew.me/en/image_maker/1549525",
  "https://picrew.me/en/image_maker/2321144/",
  "https://picrew.me/en/image_maker/2730397",
  "https://picrew.me/ja/image_maker/261388",
  "https://picrew.me/en/image_maker/2244143",
  "https://picrew.me/en/image_maker/1710941",
  "https://picrew.me/ja/image_maker/9971",
  "https://picrew.me/en/image_maker/2130282",
  "https://picrew.me/ja/image_maker/16079",
  "https://picrew.me/en/image_maker/606067",
  "https://picrew.me/en/image_maker/1679",
  "https://picrew.me/ja/image_maker/1413742",
  "https://picrew.me/en/image_maker/16952",
  "https://picrew.me/en/image_maker/285726",
  "https://picrew.me/en/image_maker/2212965/",
  "https://picrew.me/en/image_maker/365981",
  "https://picrew.me/en/image_maker/1996436",
  "https://picrew.me/en/image_maker/1873485",
  "https://picrew.me/ja/image_maker/173830",
  "https://picrew.me/en/image_maker/1506792",
  "https://picrew.me/en/image_maker/1643225",
  "https://picrew.me/en/image_maker/8654",
  "https://picrew.me/en/image_maker/1729225",
  "https://picrew.me/ja/image_maker/9889",
  "https://picrew.me/en/image_maker/610761",
  "https://picrew.me/en/image_maker/54076",
  "https://picrew.me/en/image_maker/549603",
  "https://picrew.me/en/image_maker/84797",
  "https://picrew.me/en/image_maker/1482749",
  "https://picrew.me/en/image_maker/2423166",
  "https://picrew.me/en/image_maker/2452633",
  "https://picrew.me/ja/image_maker/1904634",
  "https://picrew.me/en/image_maker/36849",
  "https://picrew.me/en/image_maker/1988752",
  "https://picrew.me/en/image_maker/1510232/",
  "https://picrew.me/en/image_maker/30472/",
  "https://meiker.io/play/15622/online.html",
  "https://picrew.me/en/image_maker/41709/",  
  "https://picrew.me/en/image_maker/2546261/",
  "https://picrew.me/en/image_maker/258388/",
  "https://picrew.me/en/image_maker/1908798",
  "https://picrew.me/en/image_maker/257033",
  "https://picrew.me/en/image_maker/2406143"
];
let currentIndex2 = 0;

function nextImage2() {
    currentIndex2 = (currentIndex2 + 1) % images2.length;
    document.getElementById("picrewImage").src = images2[currentIndex2];
    document.getElementById("picrewLink").href = links2[currentIndex2];
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

/* image toggle */
function filterByTag(tag) {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach(cell => {
    if (cell.dataset.tag === tag) {
      cell.style.display = "flex";
    } else {
      cell.style.display = "none";
    }
  });
}

function showAll() {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach(cell => {
    cell.style.display = "flex";
  });
}
