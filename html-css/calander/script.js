const newDate = new Date;
const dateArea = document.getElementById("date--");
const eventListArea = document.querySelector(".list-of-events");
const thisMonth = newDate.getMonth();
const thisYear = newDate.getFullYear();
const allDateContainer = document.getElementById("all-date-container")
const yearip = document.getElementById("year");
const currentYear = newDate.getFullYear();
const startYear = currentYear - 99;
const yearArray = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

let eventList = { 1: ["helo", "venna", "haa"] };
dateArea.innerHTML = newDate.getDate();
if (eventList[newDate.getDate()]) {
    createEventAdder(newDate.getDate())
} else {
    eventListArea.innerHTML = `<div class="no-event"><p><i class="fa-regular fa-calendar-plus"></i></p><p>Add Event</p></div>`;
}

for (const iterator of yearArray) {
    const opti = document.createElement("option");
    opti.setAttribute("value", iterator);
    opti.innerHTML = iterator;
    yearip.appendChild(opti);
}

document.getElementById("year").value = thisYear;
document.getElementById("month").value = thisMonth;
createCalendar();



function createCalendar() {
    let dayAndDateObj = getGivenYearAndMonth();
    // console.log(dayAndDateObj)
    let dayHere = dayAndDateObj.day;

    if (dayAndDateObj.day == 0) {
        dayHere = 7;
        createDummy(dayHere);
    } else if (dayAndDateObj.day > 1) {
        createDummy(dayHere);
    } else {
        dayHere = 2;
    }
    animateCalendar(1, dayAndDateObj.date, dayHere);

}

function createDateElement(addDate, event) {
    // creating a div for date and event
    let givenDetails = getGivenYearAndMonth();
    let dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
    if (((addDate == newDate.getDate()) && givenDetails.year == newDate.getFullYear()) && givenDetails.month - 1 == newDate.getMonth()) {
        dateContainer.id = "today";
    }

    // creating a div for date
    let dateBox = document.createElement("div");
    dateBox.classList.add("date");
    dateBox.innerHTML = addDate;
    // creating a div for event
    let eventBox;
    if ((givenDetails.month - 1 >= newDate.getMonth()) && (givenDetails.year >= newDate.getFullYear())) {
        eventBox = document.createElement("div");
        eventBox.classList.add("event");
        eventBox.innerHTML = event ? event : `<p><i class="fa-regular fa-calendar-plus"></i></p><p>Add Event</p>`;
    } else {
        dateContainer.style.alignItems = "center";
        dateContainer.style.fontSize = "1.5em";
    }

    // appending created div to the div created for date and event
    dateContainer.appendChild(dateBox);
    if (eventBox) {
        dateContainer.appendChild(eventBox);
    }
    dateContainer.addEventListener('click', () => { clicked(dateContainer) });
    return dateContainer;
}

function getGivenYearAndMonth() {
    let givenYear = Number(document.getElementById("year").value);
    let givenMonth = Number(document.getElementById("month").value) + 1;

    // creating a date with given year and month to get no of days in that month
    let yearAndMonth = new Date(givenYear, givenMonth, 0);

    // creating a date with given year and month to get day of the 1st day of the month
    let toGet1stDay = `${givenYear},${givenMonth < 10 ? '0' + givenMonth : givenMonth},01`;
    let dayOf1stDate = new Date(toGet1stDay);

    return { year: givenYear, month: givenMonth, date: yearAndMonth.getDate(), day: dayOf1stDate.getDay() };
}

document.getElementById("month").addEventListener('change', () => {
    let childs = document.querySelectorAll(".date-container,.dummy");
    if (childs) {
        for (let i of childs) {
            allDateContainer.removeChild(i);
        }
    }
    createCalendar();
});
document.getElementById("year").addEventListener('change', () => {
    let childs = document.querySelectorAll(".date-container,.dummy");
    if (childs) {
        removeChildsWithDelay(childs, 0);
    }
});

function removeChildsWithDelay(childs, index) {
    if (index < childs.length) {
        setTimeout(() => {
            allDateContainer.removeChild(childs[index]);
            removeChildsWithDelay(childs, index + 1);
        }, 5);
    } else {
        createCalendar();
    }

}
function animateCalendar(index, endPoint, noOfday) {
    let firstEvent = eventList[index] ? `<ol><li style="list-style-position: inside;">${eventList[index][0]}</li><li style="list-style-position: inside;">click here for more</li></ol>` : "";

    if (index <= endPoint) {
        setTimeout(() => {
            allDateContainer.appendChild(createDateElement(index, firstEvent));
            animateCalendar(index + 1, endPoint, noOfday);
        }, 2)
    } else {
        colorSunday(noOfday);
        return 1;
    }
}

function colorSunday(noOfday) {
    const container = document.querySelectorAll(`.date-container:nth-child(${7}n+${9 - noOfday}):not(#today)`);
    for (let i of container) {
        i.style.backgroundColor = "#ff9988";
    }
}
function createDummy(dayHere) {
    let dateContainer = document.createElement("div");
    dateContainer.style.gridArea = `1/1/1/${dayHere}`;
    dateContainer.classList.add("dummy");
    allDateContainer.appendChild(dateContainer);
}


let clicked = (element) => {
    console.log(element.firstElementChild.innerHTML);
    dateArea.innerHTML = element.firstElementChild.innerHTML;
    createEventAdder(element.firstElementChild.innerHTML);
}

function createEventAdder(index) {
    eventListArea.innerHTML = `<div class="add-event" onclick="createEventContainer(0)"><p><i class="fa-regular fa-calendar-plus"></i></p><p>Add Event</p></div>`
    createEventContainer(index)
}

function createEventContainer(index) {
    let listIndex = 0;
    if (index == 0) {
        listIndex = document.querySelector(".event-container").childElementCount;
        console.log(listIndex);
        document.querySelector(".event-container").appendChild(createEvent("",listIndex));
    } else {
        if (document.querySelector(".event-container")) {
            eventListArea.removeChild(document.querySelector(".event-container"));
        }
        listIndex=0
        let container = document.createElement("ol");
        container.classList.add("event-container");
        container.setAttribute("index", index);
        if (eventList[index]) {
            for (let eventText of eventList[index]) {
                console.log(listIndex);
                container.appendChild(createEvent(eventText,listIndex));
                listIndex++;
            }
        } else {
            console.log(listIndex);
            container.appendChild(createEvent("",listIndex));
        }
        eventListArea.appendChild(container);
    }
}
function createEvent(eventText,listIndex) {
    let liTag = document.createElement("li");
    liTag.classList.add("event-list");
    liTag.setAttribute("list-index",`${listIndex}`);
    liTag.innerHTML = `<div class="event-of-the-day"><textarea class="event-text" cols="3" rows="1" placeholder="type something">${eventText}</textarea>
<div class="event-action-buttons">
    <h6 class="save-event" onclick="saveEvent(this)">Save</h6>
    <h6 class="delete-event" onclick="deleteEvent(this)">Delete</h6>
</div>
</div>`
    return liTag;
}

let deleteEvent = element => {
    alert(element.parentElement.parentElement.parentElement.getAttribute("index"));
    element.parentElement.parentElement.remove();
}
let saveEvent = element => {
    let list = eventList[element.parentElement.parentElement.parentElement.parentElement.getAttribute("index")];
    alert(element.parentElement.previousElementSibling.value);
    list[element.parentElement.parentElement.parentElement.getAttribute("list-index")]= element.parentElement.previousElementSibling.value;
}

if (document.querySelector(".no-event")) {
    document.querySelector(".no-event").addEventListener('click', () => {
        createEventAdder(newDate.getDate());
    })
}
// document.querySelectorAll(".edit-event").forEach(element=>{
//     element.addEventListener('click',event=>{
//         event.preventDefault();
//         alert(element.parentElement.previousElementSibling.innerHTML);
//     })
// })







const hourContainer = document.getElementById("hour");
const minContainer = document.getElementById("min");
const secContainer = document.getElementById("sec");
const meriridianContainer = document.getElementById("meridian-indicator");

function setCurrentTime() {
    let currentTime = getCurrentTime();
    let railwayTime = currentTime.hour;
    let normalTime = (currentTime.hour > 12) ? currentTime.hour - 12 : currentTime.hour;
    hourContainer.innerHTML = addZero(normalTime);
    minContainer.innerHTML = addZero(currentTime.minute);
    secContainer.innerHTML = addZero(currentTime.second);
    meriridianContainer.innerHTML = (currentTime.hour >= 12) ? "PM" : "AM";
}
function addZero(num) {
    return ((num < 10) && (num >= 0)) ? "0" + num : num
}
function getCurrentTime() {
    let currentTime = new Date();
    return {
        hour: currentTime.getHours(),
        minute: currentTime.getMinutes(),
        second: currentTime.getSeconds(),
    };
}



setInterval(setCurrentTime, 1000);