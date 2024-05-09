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
            if (document.getElementById('cps').innerHTML <= 7 && currentPart == "part_1-1-1-1-1-1-1-2-2-1-1" && i == 0){
                //console.log(options[i])
                options[i] = '*' + options[i]
                //console.log(options[i])
                optionElement.innerHTML = options[i]
            }else if (currentPart == "part_1-1-1-1-1" && (document.getElementById('zetes').innerHTML == 'false'|| document.getElementById('calais').innerHTML === 'false') && i == 0){ //|| document.getElementById('calais').innerhtml) === 'false'){
                options[i] = '*' + options[i];
                console.log('zetes/calais')
                console.log(options[i])
                optionElement.innerHTML = options[i];
            }
            
            else{
            optionElement.innerHTML = options[i]
            }

            if (options[i] == "Zero") {
                optionElement.classList.add('hidden');
            }else if (options[i].startsWith("*") === true){
                optionElement.classList.remove('hidden')
                optionElement.classList.remove('story__Button')
                optionElement.classList.add('story__Button__Disable')
                //optionElement.disabled = true
            } 
            
            else {
                optionElement.classList.remove('story__Button__Disable');
                //optionElement.disabled = False
                optionElement.classList.add('story__Button')
                optionElement.classList.remove('hidden');
            }
            
        }

        //console.log(currentPartArray[0])
        document.getElementById('part__Title').innerHTML = currentPartArray[0];
        document.getElementById('story__Stuff').innerHTML = currentPartArray[5];

        checkPart(currentPart)
    });
};
async function setOption(option) {
    document.getElementById('story__Choose').classList.remove('hidden')
    let currentPart = document.getElementById('part__ID').innerHTML; 
    let nextPart = currentPart + "-" + option;
    console.log(nextPart)
    
    // CPS Test
    if (nextPart === 'part_1-1-1-1-1-1-1-2-2-1'){
        primeCPSTest()
    }

    fetch("Stories/" + nextPart + '.txt').then(async (response) => {
        const text = await response.text();
        //console.log(text)
        if (text.includes(`Cannot GET /Stories/${nextPart}`)) return control()

        document.getElementById('part__ID').innerHTML = nextPart
    
        control(currentPart);
    })
};

async function checkPart(currentPart){
    if (currentPart == "part_1-1-1-1"){
        console.log('working')
        chooseArgonauts()
    }else if(currentPart == "part_1-2-1"){
        console.log("1-2-1")
        document.getElementById('part__ID').innerHTML = "part_1-1-1";
    }else if (currentPart == "part_1-2-2-1"){
        document.getElementById('part__ID').innerHTML = "part_1-1";
    }else if(currentPart == "part_1-1-2"){
        document.getElementById('part__ID').innerHTML = "part_1-1-1"
    }else if (currentPart == "part_1-1-1-1-1-2"){
        document.getElementById('part__ID').innerHTML = "part_1-1-1-1-1-1"
    }else if (currentPart == 'part_1-1-1-1-1-1-2'){
        document.getElementById('part__ID').innerHTML = "part_1-1-1-1-1-1-1"
    }else if(currentPart == "part_1-1-1-1-1-1-1-2-2-3"){
        document.getElementById('part__ID').innerHTML = "part_1-1-1-1-1-1-1-2-2"
    }else if(currentPart == "part_1-1-1-1-1-1-1-2-2-2"){
        document.getElementById('part__ID').innerHTML = 'part_1-1-1-1-1-1-1-2-2-1'
    }else if(currentPart == "part_1-1-1-1-1"){
        argonautsQuests()
    }
    
    else{
        return
    }
}



// --- Argonauts --- //

async function chooseArgonauts(){
    document.getElementById("story__Choose").classList.add('hidden')
    document.getElementById("chooseArgonauts").classList.remove('hidden')
}

async function argonautsSubmitted(){
    document.getElementById("chooseArgonauts").classList.add('hidden');

    const chosenArgonauts = [0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < 10; i++){
        chosenArgonauts[i] = await document.getElementById(`box${i + 1}`).checked;
    };

    console.table(chosenArgonauts);

    document.getElementById('heracles').innerHTML = chosenArgonauts[0];
    document.getElementById('orpheus').innerHTML = chosenArgonauts[1];
    document.getElementById('calais').innerHTML = chosenArgonauts[2];
    document.getElementById('zetes').innerHTML = chosenArgonauts[3];

    amount = chosenArgonauts.filter(Boolean).length;
    if (amount > 4){
        setOption('3');
    }else{
    setOption('1');
}}

async function argonautsQuests(){
    if (document.getElementById('heracles').innerHTML === 'false'){
        document.getElementById('part__Title').innerHTML = "No-one Strong Enough";
        document.getElementById('story__Stuff').innerHTML = "The argonauts set sail to see the world and experience new things, but none could know the life changing events this journey would bring them, and that some of them would not return. On their journey they crossed hellespont and landed at Propontis to re-supply. The king Cyzicus welcomed them with open arms but forgot to warn them of the six armed beast, Gegenees, that inhabited to area. The Argo was attacked while many of the argonauts were away resupplying and the argonauts left to defend were not strong enough to repel them. The argo was destroyed and their journey came to an end.";
        document.getElementById('story__Choose').classList.add('hidden');
    }
    else{
        return;
    }//)};
}



// --- CPS Test --- //

function primeCPSTest(){
    document.getElementById('launchPage__Text').classList.add('hidden');
    document.getElementById('collumns').classList.remove('hidden')
    document.getElementById('launchPage').style.display='block';


    document.getElementById('story__Main').classList.add('hidden');
    document.getElementById('cpsTest').classList.remove('hidden');
}

async function startCPSTest(){
    document.getElementById('cps__Start').classList.add('hidden')
    document.getElementById('CPSShade').classList.add('hidden')

    document.getElementById('cps__Test').classList.remove('hidden')
    await sleep(5000)
    console.log('hello')
    checkCPS()
}

function CPSTest(){
    clicks = Number(document.getElementById('clicks').innerHTML) + 1
    //console.log(clicks)
    document.getElementById('clicks').innerHTML = clicks
}

function checkCPS(){
    clicks = document.getElementById('clicks').innerHTML
    cps = Number(clicks)/5
    console.log(cps)
    document.getElementById('cpsTest').classList.add('hidden')
    document.getElementById('collumns').classList.add('hidden')
    document.getElementById('cps').innerHTML = cps
    if (cps >= 5){
        document.getElementById('story__Main').classList.remove('hidden')
    }else{
        console.log('too slow')
        document.getElementById('story__Main').classList.remove('hidden')
        document.getElementById('part__ID').innerHTML = 'part_1-1-1-1-1-1-1-2-2'
        setOption(3)
    }

}