var times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00"]
var days = { "0": "Sun.", "1": "Mon.", "2": "Tue.", "3": "Wed.", "4": "Thu.", "5": "Fri.", "6": "Sat." };

function showWeek() {
    if (document.getElementById("week").style.visibility == "hidden") {
        document.getElementById("week").style.visibility = "visible";
        document.getElementById("makeCal").style.visibility = "visible";
    }
    else {
        document.getElementById("week").style.visibility = "hidden";
    }
}
function makeCalendar() {
    document.getElementById("wrapper").style.visibility = "visible";
    makeTable();
}

function makeTable() {
    var table = document.createElement("table");
    var numDays = displayDays();
    table = addDays(table, numDays);
    var pos = 8;
    for (var i = 0; i < times.length; i++) {
        table = addTimes(times[i], table, pos);
        pos += .5;
    }
    var rep = document.getElementById("form").querySelector("table");
    document.getElementById("form").replaceChild(table, rep);
    listeners();
}

function displayDays(){
    var numDays = document.getElementById("week").value;
    document.getElementById("week").style.visibility = "hidden";
    var day = [];
    for (var i = 0; i < 3; i++, numDays++) {
        if (numDays > 6) {
            numDays = 0;
        }
        day.push(numDays);
    }
    return day;
}

function addDays(table, day) {
    var placehold = document.createElement("th");
    placehold.style.width = "20%";
    var day1 = document.createElement("th");
    var day2 = document.createElement("th");
    var day3 = document.createElement("th");
    var tr = document.createElement("tr");
    var inp1 = document.createElement("input");
    var inp2 = document.createElement("input");
    var inp3 = document.createElement("input");
    inp1.setAttribute("value", day[0]);
    inp2.setAttribute("value", day[1]);
    inp3.setAttribute("value", day[2]);
    inp1.setAttribute("name", "day0");
    inp2.setAttribute("name", "day1");
    inp3.setAttribute("name", "day2");
    inp1.setAttribute("type", "hidden");
    inp2.setAttribute("type", "hidden");
    inp3.setAttribute("type", "hidden");
    var day1Text = document.createTextNode(days[day[0]]);
    var day2Text = document.createTextNode(days[day[1]]);
    var day3Text = document.createTextNode(days[day[2]]);
    day1.appendChild(day1Text);
    day2.appendChild(day2Text);
    day3.appendChild(day3Text);
    day1.appendChild(inp1);
    day2.appendChild(inp2);
    day3.appendChild(inp3);
    tr.appendChild(placehold);
    tr.appendChild(day1);
    tr.appendChild(day2);
    tr.appendChild(day3);
    table.appendChild(tr);
    return table;
}

function addTimes(tempTime, table, position) {
    var time = document.createElement("td");
    var day1 = document.createElement("td");
    var day2 = document.createElement("td");
    var day3 = document.createElement("td");
    var tr = document.createElement("tr");
    day1.setAttribute("class", "input");
    day2.setAttribute("class", "input");
    day3.setAttribute("class", "input");
    var inp1 = document.createElement("input");
    var inp2 = document.createElement("input");
    var inp3 = document.createElement("input");
    inp1.setAttribute("name", position);
    inp2.setAttribute("name", position);
    inp3.setAttribute("name", position);
    inp1.setAttribute("type", "hidden");
    inp2.setAttribute("type", "hidden");
    inp3.setAttribute("type", "hidden");
    time.setAttribute("class", "time");
    var timeText = document.createTextNode(tempTime);
    time.appendChild(timeText);
    tr.appendChild(time);
    day1.style.backgroundColor = "#000000";
    day2.style.backgroundColor = "#000000";
    day3.style.backgroundColor = "#000000";
    day1.appendChild(inp1);
    day2.appendChild(inp2);
    day3.appendChild(inp3);
    tr.appendChild(day1);
    tr.appendChild(day2);
    tr.appendChild(day3);
    table.appendChild(tr);
    return table;
}

function listeners() {
    var x = document.getElementsByClassName("input");
    console.log(x.length);
    for (var i = 0; i < x.length; i++) {
        x[i].onclick = function() {
            console.log(this.style.backgroundColor);
            if (this.style.backgroundColor == "#000000" || this.style.backgroundColor == "rgb(0, 0, 0)") {
                this.querySelector("input").value = this.querySelector("input").name;
                this.style.backgroundColor = "#4fff63";
            } else {
                this.querySelector("input").value = "";
                this.style.backgroundColor = "#000000";
            }
        };
    }
}