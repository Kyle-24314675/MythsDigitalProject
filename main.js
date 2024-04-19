function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideLaunchPage() {
    document.getElementById('launchPage').style.display= 'none';
    document.getElementById('loadingScreen').style.cssText = "display: block; visibility: visible;";
    document.getElementById('title').style.display = 'block';
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
    sleep(3000)
    .then(() => document.getElementById('loadingScreen').style.cssText = "display: none; visibility: hidden;")
    .then(() => document.getElementById('story').style.display = 'block')
    .then(() => document.getElementById('title').style.display = 'none')
    .then(() => part1())
}

function control(part){
    document.getElementById('story__Choose').style.display = 'block';
    let currentPart = part + '.txt';
    fetch("Stories/" + currentPart)
    .then((response) => response.text())
    .then((text) => currentPartArray = text.split("|"))
    .then(() => console.log(currentPartArray))
    .then(() => document.getElementById('part__Title').innerHTML = currentPartArray[0])
    .then(() => document.getElementById('story__OptionOne').innerHTML = currentPartArray[1])
    .then(() => document.getElementById('story__OptionTwo').innerHTML = currentPartArray[2])
    .then(() => document.getElementById('story__OptionThree').innerHTML = currentPartArray[3])
    .then(() => document.getElementById('story__OptionFour').innerHTML = currentPartArray[4])
    .then(() => document.getElementById('story__Stuff').innerHTML = currentPartArray[5])
}


function part1() {
    part = 'part1'
    control(part)
}

function choice1() {
    document.getElementById('story__Choose').style.display = 'block';
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
}