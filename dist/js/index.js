const month = document.querySelector('#month');
const hour = document.querySelector('#hour');
const time = document.querySelector('.time');

let adjustedTime = false;

function updateTime() {
    let datetime = new Date();
    let curMonth = datetime.getMonth();
    let curHour = datetime.getHours();

    time.textContent = datetime;
    if (!adjustedTime) {
        month.selectedIndex = curMonth;
        hour.selectedIndex = curHour;
    }
};

updateTime();

let json_load = ['fish', 'bugs', 'misc', 'sea'];

let fish = [];
let fishGen = [];
let bugs = [];
let bugsGen = [];
let misc = [];
let miscGen = [];
let sea = [];
let seaGen = [];
fishi = 2;
bugsi = 2;
misci = 2;
seai = 2;
fishn = 2;
bugsn = 2;
miscn = 2;
sean = 2;
fishl = 2;
bugsl = 2;

const fishTable = document.querySelector('#fishPush')
const bugsTable = document.querySelector('#bugsPush')
// const miscTable = document.querySelector('#miscPush')
const seaTable = document.querySelector('#seaPush')

function loadJSON(callback, table) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    switch (table) {
        case 'fish':
            xobj.open('GET', './dist/js/fishTable.json', true);
            break;

        case 'bugs':
            xobj.open('GET', './dist/js/bugTable.json', true);
            break;

        case 'misc':
            xobj.open('GET', './dist/js/miscTable.json', true);
            break;
        case 'sea':
            xobj.open('GET', './dist/js/seaTable.json', true);
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
    switch (table) {
        case 'fish':
            fish = json;
            break;

        case 'bugs':
            bugs = json;
            break;

        case 'misc':
            misc = json;
            break;

        case 'sea':
            sea = json;
    }

    if (fish.length > 0 && bugs.length > 0 && misc.length > 0) {
        sea.sort(function (a, b) {
            return a.num < b.num ? -1 : a.num > b.num ? 1 : 0;
        });

        miscGen = [...misc];
        seaGen = [...sea];

        hourMonthFilter('fish');
        hourMonthFilter('bugs');
        hourMonthFilter('sea');

        // miscGen.forEach(element => {
        //     genMisc(element)
        // });

        // seaGen.forEach(element => {
        //     genSea(element);
        // });

        // tableListeners('fish');
        // tableListeners('bugs');
        // tableListeners('sea');
    }
};

//begins process of pulling json data
for (x in json_load) {
    init(json_load[x]);
}

function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function genFish(element) {
    let i = 0;
    const fishTemp = document.importNode(fishTemplate.content, true);

    const fishGroup = fishTemp.querySelector('#fishTab')
    if(localStorage.getItem(element[0])){
        fishGroup.style.backgroundColor = '#0878c248';
    }

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

    const bugsGroup = bugsTemp.querySelector('#bugsTab')
    if(localStorage.getItem(element[0])){
        bugsGroup.style.backgroundColor = '#21c74b48';
    }

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

    const source = miscTemp.querySelector('#source');
    switch (element.length) {
        case 3:
            source.textContent = '';
            break;
        case 4:
            source.textContent = element[i];
            i++;
    };

    const price = miscTemp.querySelector('#price');
    price.textContent = element[i];
    i++;

    miscTable.appendChild(miscTemp);
}

function genSea(element) {
    const seaTemp = document.importNode(seaTemplate.content, true);

    //
    //Playing around with adding colors on click to represent
    //donations if apps are not updated
    //
    const seaGroup = seaTemp.querySelector('#seaTab')
    if(localStorage.getItem(element.name)){
        seaGroup.style.backgroundColor = '#7c21c748';
    }

    //sea: name, image, price, time, month1-12
    const name = seaTemp.querySelector('#name');
    name.textContent = uppercaseFirstLetter(element.name);

    const image = seaTemp.querySelector('#image');
    image.style.backgroundImage = "url('" + element.iconImage + "')";

    const price = seaTemp.querySelector('#price');
    price.textContent = element.sell;

    const time = seaTemp.querySelector('#time');
    elementNorth = element.activeMonths.northern[0];
    if (elementNorth.isAllDay === true) {
        time.textContent = 'All day';
    } else {
        let hourStart = parseInt(elementNorth.activeHours[0][0], 10);
        let hourEnd = parseInt(elementNorth.activeHours[0][1], 10);
        hourStart > 12 ? hourStart = hourStart - 12 + ' PM' : hourStart += ' AM';
        hourEnd > 12 ? hourEnd = hourEnd - 12 + ' PM' : hourEnd += ' AM';
        time.textContent = hourStart + ' - ' + hourEnd;
    };

    seaTable.appendChild(seaTemp);
}

function sortLocation(element) {
    switch (element) {
        case 'fish':
            fishTable.innerHTML = '';

            fishGen.sort(function (a, b) {
                if (fishl % 2 == 0) {
                    return a[3] < b[3] ? -1 : a[3] > b[3] ? 1 : 0;
                } else {
                    return b[3] < a[3] ? -1 : b[3] > a[3] ? 1 : 0;
                }
            });

            fishl % 2 == 0 ? fishl -= 1 : fishl += 1;
            fishn = 2;
            fishi = 2;

            fishGen.forEach(element => {
                genFish(element)
            });
            break;

        case 'bugs':
            bugsTable.innerHTML = '';

            bugsGen.sort(function (a, b) {
                if (bugsl % 2 == 0) {
                    return a[3] < b[3] ? -1 : a[3] > b[3] ? 1 : 0;
                } else {
                    return b[3] < a[3] ? -1 : b[3] > a[3] ? 1 : 0;
                }
            });

            bugsl % 2 == 0 ? bugsl -= 1 : bugsl += 1;
            bugsn = 2;
            bugsi = 2;

            bugsGen.forEach(element => {
                genBugs(element)
            });
    };
}

function sortPrice(element) {
    switch (element) {
        case 'fish':
            fishTable.innerHTML = '';

            fishGen.sort(function (a, b) {
                if (fishi % 2 == 0) {
                    return b[2] - a[2];
                } else {
                    return a[2] - b[2];
                }
            });

            fishi % 2 == 0 ? fishi -= 1 : fishi += 1;
            fishn = 2;
            fishl = 2;

            fishGen.forEach(element => {
                genFish(element)
            });
            tableListeners('fish');
            break;

        case 'bugs':
            bugsTable.innerHTML = '';

            bugsGen.sort(function (a, b) {
                if (bugsi % 2 == 0) {
                    return b[2] - a[2];
                } else {
                    return a[2] - b[2];
                }
            });

            bugsi % 2 == 0 ? bugsi -= 1 : bugsi += 1;
            bugsn = 2;
            bugsl = 2;

            bugsGen.forEach(element => {
                genBugs(element);
            });
            tableListeners('bugs');
            break;

        case 'misc':
            miscTable.innerHTML = '';

            miscGen.sort(function (a, b) {
                if (misci % 2 == 0) {
                    if (b[3] != undefined && a[3] != undefined) {
                        return b[3] - a[3];
                    } else if (a[3] != undefined) {
                        return b[2] - a[3];
                    } else if (b[3] != undefined) {
                        return b[3] - a[2];
                    } else {
                        return b[2] - a[2];
                    }
                } else {
                    if (a[3] != undefined && b[3] != undefined) {
                        return a[3] - b[3];
                    } else if (a[3] != undefined) {
                        return a[3] - b[2];
                    } else if (b[3] != undefined) {
                        return a[2] - b[3];
                    } else {
                        return a[2] - b[2];
                    }
                }
            });

            misci % 2 == 0 ? misci -= 1 : misci += 1;
            miscn = 2;

            miscGen.forEach(element => {
                genMisc(element);
            });
            break;
            
        case 'sea':
            seaTable.innerHTML = '';

            seaGen.sort(function (a, b) {
                if (seai % 2 == 0) {
                    return b.sell - a.sell;
                } else {
                    return a.sell - b.sell;
                }
            });

            seai % 2 == 0 ? seai -= 1 : seai += 1;
            sean = 2;

            seaGen.forEach(element => {
                genSea(element);
            });

            tableListeners('sea');
            break;

        default:
            alert('No valid case for price sort')
    }
}

function sortName(element) {
    switch (element) {
        case 'fish':
            fishTable.innerHTML = '';

            fishGen.sort(function (a, b) {
                if (fishn % 2 == 0) {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                } else {
                    return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
                }
            });

            fishn % 2 == 0 ? fishn -= 1 : fishn += 1;
            fishi = 2;
            fishl = 2;

            fishGen.forEach(element => {
                genFish(element);
            });

            tableListeners('fish');
            break;

        case 'bugs':
            bugsTable.innerHTML = '';

            bugsGen.sort(function (a, b) {
                if (bugsn % 2 == 0) {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                } else {
                    return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
                }
            })

            bugsn % 2 == 0 ? bugsn -= 1 : bugsn += 1;
            bugsi = 2;
            bugsl = 2;

            bugsGen.forEach(element => {
                genBugs(element);
            });

            tableListeners('bugs');
            break;

        case 'misc':
            miscTable.innerHTML = '';

            miscGen.sort(function (a, b) {
                if (miscn % 2 == 0) {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                } else {
                    return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
                }
            });

            miscn % 2 == 0 ? miscn -= 1 : miscn += 1;
            misci = 2;

            miscGen.forEach(element => {
                genMisc(element);
            });
            break;

        case 'sea':
            seaTable.innerHTML = '';

            seaGen.sort(function (a, b) {
                aName = a.name.toLowerCase();
                bName = b.name.toLowerCase();
                if (sean % 2 == 0) {
                    return aName < bName ? -1 : aName > bName ? 1 : 0;
                } else {
                    return bName < aName ? -1 : bName > aName ? 1 : 0;
                }
            });

            sean % 2 == 0 ? sean -= 1 : sean += 1;
            seai = 2;

            seaGen.forEach(element => {
                genSea(element);
            });

            tableListeners('sea');
            break;

        default:
            alert('No valid case for name sort');
    }
}

function clearTable(element) {
    switch (element) {
        case 'fish':
            fishGen = [...fish];

            fishTable.innerHTML = '';

            fishGen.forEach(element => {
                genFish(element)
            });
            fishi = 2;
            fishn = 2;
            fishl = 2;
            tableListeners('fish');
            break;

        case 'bugs':
            bugsGen = [...bugs];

            bugsTable.innerHTML = '';

            bugsGen.forEach(element => {
                genBugs(element)
            });

            bugsi = 2;
            bugsn = 2;
            bugsl = 2;
            tableListeners('bugs');
            break;

        case 'misc':
            miscGen = [...misc];

            miscTable.innerHTML = '';

            miscGen.forEach(element => {
                genMisc(element)
            });

            miscn = 2;
            misci = 2;
            break;

        case 'sea':
            seaGen = [...sea];

            seaTable.innerHTML = '';

            seaGen.forEach(element => {
                genSea(element)
            });

            seai = 2;
            sean = 2;
            tableListeners('sea');
            break;
        
        default:
            alert('No applicable case for clear table');
    }
    adjustedTime = false;
}

function monthFilter(element) {
    switch (element) {
        case 'fish':
            fishTable.innerHTML = '';

            fishGen = [];

            fish.forEach(element => {
                if (element[6 + Number(month.value)] == "✓") {
                    fishGen.push(element);
                }
            });

            fishGen.forEach(element => {
                genFish(element);
            });

            fishi = 2;
            fishn = 2;
            fishl = 2;
            tableListeners('fish')
            break;

        case 'bugs':
            bugsTable.innerHTML = '';

            bugsGen = [];

            bugs.forEach(element => {
                if (element[5 + Number(month.value)] == "✓") {
                    bugsGen.push(element);
                }
            });

            bugsGen.forEach(element => {
                genBugs(element);
            });

            bugsi = 2;
            bugsn = 2;
            bugsl = 2;
            tableListeners('bugs')
            break;

        case 'sea':
            seaTable.innerHTML = '';

            seaGen = [];

            sea.forEach(element => {
                element.activeMonths.northern.forEach(elem => {
                    if (elem.month == month.value) {
                        seaGen.push(element);
                    }
                });

                // for (i = 0; i < element.activeMonths.northern.length; i++) {
                //     if (element.activeMonths.northern[i].month == month.value) {
                //         seaGen.push(element)
                //     }
                // }
            });

            seaGen.forEach(element => {
                genSea(element);
            });

            seai = 2;
            sean = 2;
            tableListeners('sea')
            break;

        default:
            alert('No filter for that option');
    }
}

function hourFilter(element) {
    switch (element) {
        case 'fish':
            fishTable.innerHTML = '';

            fishGen = [];

            fish.forEach(element => {
                if (element[6].includes(Number(hour.value))) {
                    fishGen.push(element);
                }
            });

            fishGen.forEach(element => {
                genFish(element);
            });

            fishi = 2;
            fishn = 2;
            fishl = 2;
            tableListeners('fish')
            break;

        case 'bugs':
            bugsTable.innerHTML = '';

            bugsGen = [];

            bugs.forEach(element => {
                if (element[5].includes(Number(hour.value))) {
                    bugsGen.push(element);
                }
            });

            bugsGen.forEach(element => {
                genBugs(element);
            });

            bugsi = 2;
            bugsn = 2;
            bugsl = 2;
            tableListeners('bugs')
            break;

        case 'sea':
            seaTable.innerHTML = '';

            seaGen = [];

            sea.forEach(element => {
                let start = Number(element.activeMonths.northern[0].activeHours[0][0]);
                let end = Number(element.activeMonths.northern[0].activeHours[0][1]);

                let PMStart = false;
                let AMEnd = false;

                if (element.activeMonths.northern[0].isAllDay == true) {
                    seaGen.push(element)
                } else {
                    if (start > 12) { PMStart = true }
                    if (end < 13) { AMEnd = true }

                    // console.log(start + ' | ' + Number(hour.value) + ' | ' + end)
                    // console.log(AMStart + ' ' + PMStart + ' ' + AMEnd + ' ' + PMEnd)


                    if (PMStart && AMEnd) {
                        if (Number(hour.value) < 13) {
                            if (Number(hour.value) < end) {
                                seaGen.push(element);
                            }
                        } else {
                            if (Number(hour.value) >= start) {
                                seaGen.push(element);
                            }
                        }
                    } else {
                        if (start < Number(hour.value) && Number(hour.value) < end) {
                            seaGen.push(element);
                        }
                    }
                }
            });

            seaGen.forEach(element => {
                genSea(element);
            });

            seai = 2;
            sean = 2;
            tableListeners('sea')
            break;

        default:
            alert('No filter for that option');
    }
}

function hourMonthFilter(element) {
    switch (element) {
        case 'fish':
            fishTable.innerHTML = '';

            fishGen = [];

            fish.forEach(element => {
                if (element[6 + Number(month.value)] == "✓" && element[6].includes(Number(hour.value))) {
                    fishGen.push(element);
                }
            });

            fishGen.forEach(element => {
                genFish(element);
            });

            fishi = 2;
            fishn = 2;
            fishl = 2;
            tableListeners('fish')
            break;

        case 'bugs':
            bugsTable.innerHTML = '';

            bugsGen = [];

            bugs.forEach(element => {
                if (element[5 + Number(month.value)] == "✓" && element[5].includes(Number(hour.value))) {
                    bugsGen.push(element);
                }
            });

            bugsGen.forEach(element => {
                genBugs(element);
            });

            bugsi = 2;
            bugsn = 2;
            bugsl = 2;
            tableListeners('bugs')
            break;

        case 'sea':
            seaTable.innerHTML = '';

            seaGen = [];

            sea.forEach(element => {
                let start = Number(element.activeMonths.northern[0].activeHours[0][0]);
                let end = Number(element.activeMonths.northern[0].activeHours[0][1]);

                let PMStart = false;
                let AMEnd = false;

                if (element.activeMonths.northern[0].isAllDay == true) {
                    element.activeMonths.northern.forEach(elem => {
                        if (elem.month == month.value) {
                            seaGen.push(element);
                        }
                    });
                } else {
                    if (start > 12) { PMStart = true }
                    if (end < 13) { AMEnd = true }

                    // console.log(start + ' | ' + Number(hour.value) + ' | ' + end)
                    // console.log(AMStart + ' ' + PMStart + ' ' + AMEnd + ' ' + PMEnd)


                    if (PMStart && AMEnd) {
                        if (Number(hour.value) < 13) {
                            if (Number(hour.value) < end) {
                                element.activeMonths.northern.forEach(elem => {
                                    if (elem.month == month.value) {
                                        seaGen.push(element);
                                    }
                                });
                            }
                        } else {
                            if (Number(hour.value) >= start) {
                                element.activeMonths.northern.forEach(elem => {
                                    if (elem.month == month.value) {
                                        seaGen.push(element);
                                    }
                                });
                            }
                        }
                    } else {
                        if (start < Number(hour.value) && Number(hour.value) < end) {
                            element.activeMonths.northern.forEach(elem => {
                                if (elem.month == month.value) {
                                    seaGen.push(element);
                                }
                            });
                        }
                    }
                }
            });

            seaGen.forEach(element => {
                genSea(element);
            });

            seai = 2;
            sean = 2;
            tableListeners('sea')
            break;

        default:
            alert('No filter for that option')
    }
}

function tableListeners(str) {
    switch(str) {
        case "fish":
            fishMouse = document.querySelectorAll('#fishTab')

            fishMouse.forEach(element => {
                element.addEventListener("click", () => {
                    fish.forEach(element2 => {
                        if (element2.includes(element.children[0].textContent)) {
                            //console.log(element2)
                            //console.log(element2[0])
                            if(!localStorage.getItem(element2[0])){
                                localStorage.setItem(element2[0], true);
                                element.style.backgroundColor = '#0878c248';
                            } else {
                                element.style.backgroundColor = '';
                                localStorage.removeItem(element2[0]);
                            }
                            let testString = ''
                            for (i = 7; i < element2.length; i++) {
                                testString += element2[i]
                            }
                            //console.log(testString)
                        }
                    });
                })
            });
        break;

        case "bugs":
            bugsMouse = document.querySelectorAll('#bugsTab')

            bugsMouse.forEach(element => {
                element.addEventListener("click", () => {
                    bugs.forEach(element2 => {
                        if (element2.includes(element.children[0].textContent)) {
                            //console.log(element2)
                            //console.log(element2[0])
                            if(!localStorage.getItem(element2[0])){
                                localStorage.setItem(element2[0], true);
                                element.style.backgroundColor = '#21c74b48';
                            } else {
                                element.style.backgroundColor = '';
                                localStorage.removeItem(element2[0]);
                            }
                            let testString = ''
                            for (i = 6; i < element2.length; i++) {
                                testString += element2[i]
                            }
                            //console.log(testString)
                        }
                    });
                })
            });
        break;

        case "sea":
            seaMouse = document.querySelectorAll('#seaTab')

            seaMouse.forEach(element => {
                element.addEventListener("click", () => {
                    let name = '';
                    sea.forEach(element2 => {
                        name = element2.name;
                        if (name.toLowerCase().includes(element.children[0].textContent.toLowerCase())) {
                            // element2.colors = 'purple';
                            if(!localStorage.getItem(element2.name)){
                                localStorage.setItem(element2.name, true);
                                element.style.backgroundColor = '#7c21c748';
                            } else {
                                element.style.backgroundColor = '';
                                localStorage.removeItem(element2.name);
                            }
                            //console.log(element2.name)
                            //console.log(element2.activeMonths);
                            let testString = '';
                            element2.activeMonths.northern.forEach(element3 => {
                                testString += element3.month;
                            });
                            //console.log(testString);
                        }

                        
                        
                    });
                    // if(localStorage.getItem(name)){
                    //     element.style.backgroundColor = '#7c21c748';
                    // } else {
                    //     element.style.backgroundColor = ''
                    // }
                })
            });
        break;

        default:
            alert("No listener case");

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let constLoop = true;
async function update() {
    constLoop = true;
    while (constLoop == true) {
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