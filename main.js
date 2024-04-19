function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideLaunchPage() {
    document.getElementById('launchPage').style.display='none';
    document.getElementById('loadingScreen').style.cssText = "display: block; visibility: visible;";
    document.getElementById('title').style.display='block';
    loadingBar()
}

function loadingBar() {
    var loader = document.getElementById("progressBar__Loader")
    var width = 1;
    var id = setInterval(frame, 30);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            loader.style.width = width + '%'
            loader.innerHTML = width + '%'
        }

    }
    sleep(3000).then(() =>
    document.getElementById('loadingScreen').style.cssText = "display: none; visibility: hidden;").then(() => 
    document.getElementById('story').style.display='block').then(() => start())
}

function start() {
    var story = document.getElementById('story__Stuff')
    fetch("Stories/start.txt")
    .then((response) => response.text())
    .then((text) => story.innerHTML(text))
    .then(()=> window.alert(story))
}





function setOptionOne() {
    var option = 1;
    partOne ()
}

function setOptionTwo () {
    var option = 2;
}

function setOptionTwo () {
    var option = 3;
}

function setOptionFour () {
    var option = 4;
}

function partOne () {
    if (option = 1){
        document.getElementById("story__Stuff").innerHTML = "You chose option 1"
    }
}