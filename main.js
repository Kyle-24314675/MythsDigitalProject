  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function hideLaunchPage() {
    document.getElementById('launchPage').style.display= 'none';
    document.getElementById('loadingScreen').style.cssText = "display: block; visibility: visible;";
    document.getElementById('title').style.display = 'block';
    loadingBar();
};

async function loadingBar() {
    var loader = document.getElementById("progressBar__Loader");
    var width = 1;
    var id = setInterval(frame, 30);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            loader.style.width = width + '%';
            loader.innerHTML = width + '%';
        }
    };
    await sleep(3000);
    
    document.getElementById('loadingScreen').style.cssText = "display: none; visibility: hidden;";
    document.getElementById('story').style.display = 'block';
    document.getElementById('title').style.display = 'none';
    document.getElementById('part__Title').style.display = 'block';
    control()
};

function control(){
    document.getElementById('story__Choose').style.display = 'block';
    let currentPart = document.getElementById('part__ID').innerHTML;
    fetch("Stories/" + currentPart + '.txt')
    .then(async (response) => {
        const text = await response.text();
        const currentPartArray = text.split("|");

        document.getElementById('part__Title').innerHTML = currentPartArray[0];
        
        const options = [currentPartArray[1], currentPartArray[2], currentPartArray[3], currentPartArray[4]];
        optionNames = ["One", "Two", "Three", "Four"]

        for (let i = 0; i < options.length; i++) {
            const optionElement = document.getElementById('story__Option' + optionNames[i]);
            if (options[i] == "Zero") {
                optionElement.classList.add('hidden');
            } else {
                optionElement.classList.remove('hidden');
            }
            optionElement.innerHTML = options[i]
        }

        console.log(currentPartArray[0])
        document.getElementById('part__Title').innerHTML = currentPartArray[0];
        document.getElementById('story__Stuff').innerHTML = currentPartArray[5];
    });
};
function setOption(option) {
    let currentPart = document.getElementById('part__ID').innerHTML; 
    nextPart = currentPart + "-" + option;
    fetch("Stories/" + nextPart + '.txt').then(async (response) => {
        const text = await response.text();
        console.log(text)
        if (text.includes(`Cannot GET /Stories/${nextPart}`)) return control()

    
        document.getElementById('part__ID').innerHTML = nextPart
    
        control();
    })
};