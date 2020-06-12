const month = document.querySelector('#month');
const hour = document.querySelector('#hour');
const time = document.querySelector('.time');

let adjustedTime = false

function updateTime(){
    let datetime = new Date();
    let curMonth = datetime.getMonth();
    let curHour = datetime.getHours();

    time.textContent = datetime;
    if (!adjustedTime && (month.selectedIndex != curMonth || hour.selectedIndex != curHour)){
        month.selectedIndex = curMonth;
        hour.selectedIndex = curHour;
    }
}

updateTime();

let json_load = ['fish', 'bugs', 'misc']

let fish = []
let bugs = []
let misc = []
let mouseoverTest = []
let fishi = 2
let bugsi = 2
let misci = 2
let fishn = 2
let bugsn = 2
let miscn = 2
let fishHour = false
let bugsHour = false
let fishMonth = false
let bugsMonth = false

const fishTable = document.querySelector('#fish')
const bugsTable = document.querySelector('#bugs')
const miscTable = document.querySelector('#misc')

function loadJSON(callback, table) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    if (table == 'fish') {
        xobj.open('GET', './dist/js/fishTable.json', true);
    } else if (table == 'bugs') {
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
        fish = json
    } else if (table == 'bugs') {
        bugs = json;
    } else if (table == 'misc') {
        misc = json;
    }
    if (fish.length > 0 && bugs.length > 0 && misc.length > 0) {
        hourMonthFilter('fish');
        hourMonthFilter('bugs');
        misc.forEach(element => {
            genMisc(element)
        });
    }

    tableListeners();
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

        fishSort = [...fish].sort(function (a, b) {
            if (fishi % 2 == 0) {
                return b[2] - a[2];
            } else {
                return a[2] - b[2];
            }
        })

        fishi % 2 == 0 ? fishi -= 1 : fishi += 1
        fishn = 2
        
        if(fishHour == true && fishMonth == true){
            hourMonthFilter(element, fishSort);
        } else if(fishHour == true) {
            hourFilter(element, fishSort);
        } else if(fishMonth) {
            monthFilter(element, fishSort);
        } else {
            fishSort.forEach(element => {
                genFish(element)
            });
        }
    }

    if (element == 'bugs') {
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        bugsSort = [...bugs].sort(function (a, b) {
            if (bugsi % 2 == 0) {
                return b[2] - a[2];
            } else {
                return a[2] - b[2];
            }
        })

        bugsi % 2 == 0 ? bugsi -= 1 : bugsi += 1
        bugsn = 2

        if(bugsHour == true && bugsMonth == true){
            hourMonthFilter(element, bugsSort);
        } else if(bugsHour == true) {
            hourFilter(element, bugsSort);
        } else if(bugsMonth) {
            monthFilter(element, bugsSort);
        } else {
            bugsSort.forEach(element => {
                genBugs(element)
            });
        }
    }

    if (element == 'misc') {
        const genMiscTable = document.querySelectorAll('#miscTab')

        genMiscTable.forEach(element => {
            miscTable.removeChild(element)
        });

        miscSort = [...misc].sort(function (a, b) {
            if (misci % 2 == 0) {
                if (b[3] != undefined && a[3] != undefined) {
                    return b[3] - a[3];
                } else if (a[3] != undefined) {
                    return b[2] - a[3];
                } else if (b[3] != undefined) {
                    return b[3] - a[2];
                } else {
                    return b[2] - a[2]
                }
            } else {
                if (a[3] != undefined && b[3] != undefined) {
                    return a[3] - b[3];
                } else if (a[3] != undefined) {
                    return a[3] - b[2];
                } else if (b[3] != undefined) {
                    return a[2] - b[3];
                } else {
                    return a[2] - b[2]
                }
            }
        })

        misci % 2 == 0 ? misci -= 1 : misci += 1
        miscn = 2

        miscSort.forEach(element => {
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

        fishSort = [...fish].sort(function (a, b) {
            if (fishn % 2 == 0) {
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
            } else {
                return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
            }
        })

        fishn % 2 == 0 ? fishn -= 1 : fishn += 1
        fishi = 2

        if(fishHour == true && fishMonth == true){
            hourMonthFilter(element, fishSort);
        } else if(fishHour == true) {
            hourFilter(element, fishSort);
        } else if(fishMonth) {
            monthFilter(element, fishSort);
        } else {
            fishSort.forEach(element => {
                genFish(element)
            });
        }
    }

    if (element == 'bugs') {
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        bugsSort = [...bugs].sort(function (a, b) {
            if (bugsn % 2 == 0) {
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
            } else {
                return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
            }
        })

        bugsn % 2 == 0 ? bugsn -= 1 : bugsn += 1
        bugsi = 2

        if(bugsHour == true && bugsMonth == true){
            hourMonthFilter(element, bugsSort);
        } else if(bugsHour == true) {
            hourFilter(element, bugsSort);
        } else if(bugsMonth) {
            monthFilter(element, bugsSort);
        } else {
            bugsSort.forEach(element => {
                genBugs(element)
            });
        }
    }

    if (element == 'misc') {
        const genMiscTable = document.querySelectorAll('#miscTab')

        genMiscTable.forEach(element => {
            miscTable.removeChild(element)
        });

        miscSort = [...misc].sort(function (a, b) {
            if (miscn % 2 == 0) {
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
            } else {
                return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
            }
        })

        miscn % 2 == 0 ? miscn -= 1 : miscn += 1
        misci = 2

        miscSort.forEach(element => {
            genMisc(element)
        });
    }
}

function clearTable(element) {
    if (element == 'fish') {
        const genFishTable = document.querySelectorAll('#fishTab')

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });

        fish.forEach(element => {
            genFish(element)
        });
        fishi = 2
        fishn = 2

        fishHour = false
        fishMonth = false
    }

    if (element == 'bugs') {
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        bugs.forEach(element => {
            genBugs(element)
        });

        bugsi = 2
        bugsn = 2
        
        bugsHour = false
        bugsMonth = false
    }

    if (element == 'misc') {
        const genMiscTable = document.querySelectorAll('#miscTab')

        genMiscTable.forEach(element => {
            miscTable.removeChild(element)
        });

        misc.forEach(element => {
            genMisc(element)
        });

        miscn = 2
        misci = 2
    }
    adjustedTime = false;
}

function monthFilter(element, optional) {
    if(element == 'fish'){
        const genFishTable = document.querySelectorAll('#fishTab')

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });

        if (optional) {
            optional.forEach(element => {
                if (element[6 + Number(month.value)] == "✓") {
                    genFish(element)
                }
            });
        } else {
            fish.forEach(element => {
                if (element[6 + Number(month.value)] == "✓") {
                    genFish(element)
                }
            });
        }

        if (!optional) {
            fishi = 2
            fishn = 2
        }

        fishMonth = true
    }else if(element == 'bugs'){
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        if (optional) {
            optional.forEach(element => {
                if (element[5 + Number(month.value)] == "✓") {
                    genBugs(element)
                }
            });
        } else {
            bugs.forEach(element => {
                if (element[5 + Number(month.value)] == "✓") {
                    genBugs(element)
                }
            });
        }

        if (!optional) {
            bugsi = 2
            bugsn = 2
        }

        bugsMonth = true
    } else {
        alert('No filter for that option')
    }
}

function hourFilter(element, optional) {
    if(element == 'fish'){
        const genFishTable = document.querySelectorAll('#fishTab')

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });

        if (optional) {
            optional.forEach(element => {
                if (element[6].includes(Number(hour.value))) {
                    genFish(element)
                }
            });
        } else {
            fish.forEach(element => {
                if (element[6].includes(Number(hour.value))) {
                    genFish(element)
                }
            });
        }

        if (!optional){
            fishi = 2
            fishn = 2
        }

        fishHour = true
    }else if(element == 'bugs'){
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        if (optional) {
            optional.forEach(element => {
                if (element[5].includes(Number(hour.value))) {
                    genBugs(element)
                }
            });
        } else {
            bugs.forEach(element => {
                if (element[5].includes(Number(hour.value))) {
                    genBugs(element)
                }
            });
        }
        
        if (!optional){
            bugsi = 2
            bugsn = 2
        }

        bugsHour = true
    }else{
        alert('No filter for that option')
    }
}

function hourMonthFilter(element, optional) {
    if(element == 'fish'){
        const genFishTable = document.querySelectorAll('#fishTab')

        genFishTable.forEach(element => {
            fishTable.removeChild(element)
        });

        if (optional){
            optional.forEach(element => {
                if (element[6 + Number(month.value)] == "✓" && element[6].includes(Number(hour.value))) {
                    genFish(element)
                }
            });
        } else {
            fish.forEach(element => {
                if (element[6 + Number(month.value)] == "✓" && element[6].includes(Number(hour.value))) {
                    genFish(element)
                }
            });
        }
        
        if (!optional){
            fishi = 2
            fishn = 2
        }

        fishHour = true
        fishMonth = true
    }else if(element == 'bugs'){
        const genBugsTable = document.querySelectorAll('#bugsTab')

        genBugsTable.forEach(element => {
            bugsTable.removeChild(element)
        });

        if (optional){
            optional.forEach(element => {
                if (element[5 + Number(month.value)] == "✓" && element[5].includes(Number(hour.value))) {
                    genBugs(element)
                }
            });
        } else {
            bugs.forEach(element => {
                if (element[5 + Number(month.value)] == "✓" && element[5].includes(Number(hour.value))) {
                    genBugs(element)
                }
            });
        }
        
        if (!optional){
            bugsi = 2
            bugsn = 2
        }

        bugsHour = true
        bugsMonth = true
    }else{
        alert('No filter for that option')
    }
}

function tableListeners() {
    fishMouse = document.querySelectorAll('#fishTab')
    bugsMouse = document.querySelectorAll('#bugsTab')

    fishMouse.forEach(element => {
        element.addEventListener("click", () => {
            fish.forEach(element2 => {
                if (element2.includes(element.children[0].textContent)){
                    console.log(element2)
                    let testString = ''
                    for (i = 7; i < element2.length; i++){
                        testString += element2[i]
                    }
                    console.log(testString)
                }
            });
        })
    });

    bugsMouse.forEach(element => {
        element.addEventListener("click", () => {
            bugs.forEach(element2 => {
                if (element2.includes(element.children[0].textContent)){
                    console.log(element2)
                    let testString = ''
                    for (i = 6; i < element2.length; i++){
                        testString += element2[i]
                    }
                    console.log(testString)
                }
            });
        })
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let constLoop = true;
async function update() {
    constLoop = true;
    while (constLoop == true){
        updateTime();
        await sleep(1000)
    }
}

window.addEventListener("focus", update);
window.addEventListener("blur", () => constLoop = false);

document.querySelectorAll('.filters').forEach(element => {
    element.addEventListener("focus", () => adjustedTime = true)
});

//fish: name, image, price, location, shadow, time, month1-12

//bugs: name, image, price, location, time, month1-12

//misc: name, image, source, price