let json_load = ['fish', 'bug', 'misc']

let fish = []
let fishGen = []
let bugs = []
let bugsGen = []
let misc = []
let miscGen = []
fishi = 2
bugsi = 2
misci = 2
fishn = 2
bugsn = 2
miscn = 2

// const fishTemplate = document.querySelector('#fishTemplate');
const fishTable = document.querySelector('#fish')
const bugsTable = document.querySelector('#bugs')
const miscTable = document.querySelector('#misc')

function loadJSON(callback, table) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    if (table == 'fish') {
        xobj.open('GET', './dist/js/fishTable.json', true);
    } else if (table == 'bug') {
        xobj.open('GET', './dist/js/bugTable.json', true);
    } else if (table == 'misc') {
        xobj.open('GET', './dist/js/miscTable.json', true);
    }
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
};

//initializes function chain to pull info out of json file, when complete fires triggered
function init(table) {
    loadJSON(function (response) {
        let actual_JSON = JSON.parse(response);
        triggered(actual_JSON, table);
    }, table);
};

// loads json info to fusions variable and then loads table once parse is final
function triggered(json, table) {
    if (table == 'fish') {
        fish = json;
    } else if (table == 'bug') {
        bugs = json;
    } else if (table == 'misc') {
        misc = json;
    }
    if (fish.length > 0 && bugs.length > 0 && misc.length > 0) {
        // fishGen = fish
        // bugsGen = bugs
        // miscGen = misc
        fish.forEach(element => {
            fishGen.push(element)
        });
        bugs.forEach(element => {
            bugsGen.push(element)
        });
        misc.forEach(element => {
            miscGen.push(element)
        });

        fishGen.forEach(element => {
            genFish(element);
        });
        bugsGen.forEach(element => {
            genBugs(element)
        });
        miscGen.forEach(element => {
            genMisc(element)
        });

        // fish = fishGen
        // bugs = bugsGen
        // misc = miscGen
    }
};

//begins process of pulling json data
for (x in json_load) {
    init(json_load[x]);
}

function genFish(element) {
    let i = 0;
    const fishTemp = document.importNode(fishTemplate.content, true);

    //fish: name, image, price, location, shadow, time, month1-12
    const name = fishTemp.querySelector('#name');
    name.textContent = element[i];
    i++;

    const image = fishTemp.querySelector('#image');
    image.style.backgroundImage = "url('" + element[i] + "')";
    i++;

    const price = fishTemp.querySelector('#price');
    price.textContent = element[i];
    i++;

    const location = fishTemp.querySelector('#location');
    location.textContent = element[i];
    i++;

    const shadow = fishTemp.querySelector('#shadow');
    shadow.textContent = element[i];
    i++;

    const time = fishTemp.querySelector('#time');
    time.textContent = element[i];
    i++;

    fishTable.appendChild(fishTemp);
}

function genBugs(element) {
    let i = 0;
    const bugsTemp = document.importNode(bugsTemplate.content, true);

    //bugs: name, image, price, location, time, month1-12
    const name = bugsTemp.querySelector('#name');
    name.textContent = element[i];
    i++;

    const image = bugsTemp.querySelector('#image');
    image.style.backgroundImage = "url('" + element[i] + "')";
    i++;

    const price = bugsTemp.querySelector('#price');
    price.textContent = element[i];
    i++;

    const location = bugsTemp.querySelector('#location');
    location.textContent = element[i];
    i++;

    const time = bugsTemp.querySelector('#time');
    time.textContent = element[i];
    i++;

    bugsTable.appendChild(bugsTemp);
}

function genMisc(element) {
    let i = 0;
    const miscTemp = document.importNode(miscTemplate.content, true);

    //misc: name, image, source, price
    const name = miscTemp.querySelector('#name');
    name.textContent = element[i];
    i++;

    const image = miscTemp.querySelector('#image');
    image.style.backgroundImage = "url('" + element[i] + "')";
    i++;
    if (element.length != 3) {
        const source = miscTemp.querySelector('#source');
        source.textContent = element[i];
        i++;
    } else {
        const source = miscTemp.querySelector('#source');
        source.textContent = '';

        const price = miscTemp.querySelector('#price');
        price.textContent = element[i];
    }

    const price = miscTemp.querySelector('#price');
    price.textContent = element[i];
    i++;

    miscTable.appendChild(miscTemp);
}

function sortPrice(element) {
    if (element == 'fish') {
        const genFishTable = document.querySelectorAll('#fishTab')

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });

        fishGen.sort(function(a, b) {
            if (fishi % 2 == 0){
                return b[2] - a[2];
            } else {
                return a[2] - b[2];
            }
        })

        fishi % 2 == 0 ? fishi -= 1 : fishi +=1

        fishGen.forEach(element => {
            genFish(element)
        });
    }

    if (element == 'bugs') {
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        bugsGen.sort(function(a, b) {
            if (bugsi % 2 == 0){
                return b[2] - a[2];
            } else {
                return a[2] - b[2];
            }
        })

        bugsi % 2 == 0 ? bugsi -= 1 : bugsi +=1

        bugsGen.forEach(element => {
            genBugs(element)
        });
    }

    if (element == 'misc') {
        const genMiscTable = document.querySelectorAll('#miscTab')

        genMiscTable.forEach(element => {
            miscTable.removeChild(element)
        });

        miscGen.sort(function(a, b) {
            if (misci % 2 == 0){
                if(b[3] != undefined && a[3] != undefined){
                    return b[3] - a[3];
                } else if (a[3] != undefined) {
                    return b[2] - a[3];
                } else if (b[3] != undefined) {
                    return b[3] - a[2];
                } else{
                    return b[2] - a[2]
                }
            } else {
                if(a[3] != undefined && b[3] != undefined){
                    return a[3] - b[3];
                } else if (a[3] != undefined) {
                    return a[3] - b[2];
                } else if (b[3] != undefined) {
                    return a[2] - b[3];
                } else{
                    return a[2] - b[2]
                }
            }
        })

        misci % 2 == 0 ? misci -= 1 : misci +=1

        miscGen.forEach(element => {
            genMisc(element)
        });
    }
}

function sortName(element) {
    if (element == 'fish') {
        const genFishTable = document.querySelectorAll('#fishTab')

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });

        fishGen.sort(function(a, b) {
            if (fishn % 2 == 0){
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
            } else {
                return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
            }
        })

        fishn % 2 == 0 ? fishn -= 1 : fishn +=1

        fishGen.forEach(element => {
            genFish(element)
        });
    }

    if (element == 'bugs') {
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        bugsGen.sort(function(a, b) {
            if (bugsn % 2 == 0){
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
            } else {
                return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
            }
        })

        bugsn % 2 == 0 ? bugsn -= 1 : bugsn +=1

        bugsGen.forEach(element => {
            genBugs(element)
        });
    }

    if (element == 'misc') {
        const genMiscTable = document.querySelectorAll('#miscTab')

        genMiscTable.forEach(element => {
            miscTable.removeChild(element)
        });

        miscGen.sort(function(a, b) {
            if (miscn % 2 == 0){
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
            } else {
                return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
            }
        })

        miscn % 2 == 0 ? miscn -= 1 : miscn +=1

        miscGen.forEach(element => {
            genMisc(element)
        });
    }
}

function clearTable(element) {
    if (element == 'fish') {
        const genFishTable = document.querySelectorAll('#fishTab')

        fishGen = []
        fish.forEach(element => {
            fishGen.push(element)
        });

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });
        
        fishGen.forEach(element => {
            genFish(element) 
        });
        fishi = 2
        fishn = 2
    }

    if (element == 'bugs') {
        const genBugsTable = document.querySelectorAll('#bugsTab')

        bugsGen = []
        bugs.forEach(element => {
            bugsGen.push(element)
        });

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });
        
        bugsGen.forEach(element => {
            genBugs(element) 
        });

        bugsi = 2
        bugsn = 2
    }

    if (element == 'misc') {
        const genMiscTable = document.querySelectorAll('#miscTab')

        miscGen = []
        misc.forEach(element => {
            miscGen.push(element)
        });

        genMiscTable.forEach(element => {
            miscTable.removeChild(element)
        });
        
        miscGen.forEach(element => {
            genMisc(element) 
        });
        
        miscn = 2
        misci = 2
    }
}

//fish: name, image, price, location, shadow, time, month1-12

//bugs: name, image, price, location, time, month1-12

//misc: name, image, source, price