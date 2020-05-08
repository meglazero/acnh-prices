let json_load = ['fish', 'bug', 'misc']

let fish = []
let bugs = []
let misc = []

// const fishTemplate = document.querySelector('#fishTemplate');
const fishTable = document.querySelector('#fish')
const bugsTable = document.querySelector('#bugs')
const miscTable = document.querySelector('#misc')

console.log('start')
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
        // console.log(fish)
    } else if (table == 'bug') {
        bugs = json;
        // console.log(bugs)
    } else if (table == 'misc') {
        misc = json;
        // console.log(misc)
    }
    if (fish.length > 0 && bugs.length > 0 && misc.length > 0) {
        fish.forEach(element => {
            genFish(element);
        });
        bugs.forEach(element => {
            genBugs(element)
        });
        misc.forEach(element => {
            genMisc(element)
        });
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

//fish: name, image, price, location, shadow, time, month1-12

//bugs: name, image, price, location, time, month1-12

//misc: name, image, source, price