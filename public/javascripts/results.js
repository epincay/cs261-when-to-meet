var times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00"]
var days = { "0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday" };

window.addEventListener('load', function() {
    var obj = new XMLHttpRequest();
    var urlID = "http://example.com/results?id=DSF123";
    var id = urlID.substring(urlID.lastIndexOf('=') + 1);
    console.log(id);
    var url = new URL("https://goldingaustin.github.io/CIT261-Group-Project/json/test.json");
    obj.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var meetup = JSON.parse(this.responseText);
            var matches = findCommon(meetup);
            var days = parseDates(meetup);
            makeTable(days);
            addMatches(matches);
        }
    };
    obj.open("GET", url, true);
    obj.send();
});

function parseDates(meetup) {
    var day = new Date(meetup.meetup.members[0].days[0].date);
    var firstDay = day.getDay();
    return firstDay;
}

function findCommon(meetup) {
    var memb = [];
    meetup = meetup.meetup;
    for (var x in meetup.members[0].days) {
        memb['day'+x] = [];
        for (var i in meetup.members) {
            memb['day'+x].push(meetup.members[i].days[x].hours);
        }
    }
    var dayMatch = [];
    for (var x = 0; x < meetup.members[0].days.length; x++) {
        var compare = memb['day'+x].shift().reduce(function(matches, y) {
            if (matches.indexOf(y) === -1 && memb['day'+x].every(function(z) {
                return z.indexOf(y) !== -1;
                })) matches.push(y);
            return matches;
        }, []);
        dayMatch.push(compare);
    }
    return dayMatch;
}

function makeTable(firstDay) {
    var table = document.createElement("table");
    var numDays = displayDays(firstDay);
    table = addDays(table, numDays);
    for (var i = 0, x = 0; i < times.length; x++, i++) {
        table = addTimes(times[i], table, i);
    }
    var rep = document.getElementById("form").querySelector("table");
    document.getElementById("form").replaceChild(table, rep);
}

function displayDays(firstDay){
    var day = [];
    for (var i = 0; i < 3; i++, firstDay++) {
        if (firstDay > 6) {
            firstDay = 0;
        }
        day.push(firstDay);
    }
    return day;
}

function addDays(table, day) {
    var placehold = document.createElement("th");
    var day1 = document.createElement("th");
    var day2 = document.createElement("th");
    var day3 = document.createElement("th");
    var tr = document.createElement("tr");
    var day1Text = document.createTextNode(days[day[0]]);
    var day2Text = document.createTextNode(days[day[1]]);
    var day3Text = document.createTextNode(days[day[2]]);
    day1.appendChild(day1Text);
    day2.appendChild(day2Text);
    day3.appendChild(day3Text);
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
    day1.setAttribute("class", position);
    day2.setAttribute("class", position);
    day3.setAttribute("class", position);
    time.setAttribute("class", "time");
    var timeText = document.createTextNode(tempTime);
    time.appendChild(timeText);
    tr.appendChild(time);
    day1.style.backgroundColor = "#000000";
    day2.style.backgroundColor = "#000000";
    day3.style.backgroundColor = "#000000";
    tr.appendChild(day1);
    tr.appendChild(day2);
    tr.appendChild(day3);
    table.appendChild(tr);
    return table;
}

function addMatches(times) {
    for (var i = 0; i < times.length; i++) {
        for (var x = 0; x < times[i].length; x++) {
            var temp = document.getElementsByClassName(times[i][x]);
            temp[i].style.backgroundColor = "#4fff63";
        }
    }
}
