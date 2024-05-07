  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function hideLaunchPage() {
    document.getElementById('launchPage').style.display= 'none';
    document.getElementById('loadingScreen').classList.remove('hidden')//style.cssText = "display: block; visibility: visible;";
    document.getElementById('title').classList.remove('hidden')//style.display = 'block';
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
    // DW this definetly does something. dont look too deep into it
    await sleep(3000);
    
    document.getElementById('loadingScreen').classList.add('hidden')//style.cssText = "display: none; visibility: hidden;";
    document.getElementById('story').classList.remove('hidden')//style.display = 'block';
    document.getElementById('title').classList.add('hidden')//style.display = 'none';
    //document.getElementById('part__Title').classList.remove('hidden')//style.display = 'block';
    control()
};

function control(){
    document.getElementById('story__Choose').classList.remove('hidden')//style.display = 'block';
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

        //console.log(currentPartArray[0])
        document.getElementById('part__Title').innerHTML = currentPartArray[0];
        document.getElementById('story__Stuff').innerHTML = currentPartArray[5];
    });
};
async function setOption(option) {
    let currentPart = document.getElementById('part__ID').innerHTML; 
    let nextPart = currentPart + "-" + option;
    
    await checkPart(nextPart)

    fetch("Stories/" + nextPart + '.txt').then(async (response) => {
        const text = await response.text();
        //console.log(text)
        if (text.includes(`Cannot GET /Stories/${nextPart}`)) return control()

        document.getElementById('part__ID').innerHTML = nextPart
    
        control();
    })
};

async function checkPart(nextPart){
    if (nextPart == "part_1-1-1-1"){
        console.log('working')
        await chooseArgonauts()
        await(5000)
    }

}

async function chooseArgonauts(){
    document.getElementById("story__Choose").style.display = 'hidden';
    document.getElementById("chooseArgonauts").classList.remove('hidden')
    await argonautsSubmitted(0)
    return
}

async function argonautsSubmitted(x){
    console.log('hello')
    if (x == 1){
    return
}
}