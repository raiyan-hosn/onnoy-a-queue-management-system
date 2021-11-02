// getting date

const d = new Date();
let weekday;
let monthName;
function today() {
  if (d.getDay() == 0) {
    weekday = "Sun";
  } else if (d.getDay() == 1) {
    weekday = "Mon";
  } else if (d.getDay() == 2) {
    weekday = "Tue";
  } else if (d.getDay() == 3) {
    weekday = "Wed";
  } else if (d.getDay() == 4) {
    weekday = "Thu";
  } else if (d.getDay() == 5) {
    weekday = "Fri";
  } else {
    weekday = "Sat";
  }

  const date = `${weekday} ${d.toLocaleDateString()}`;

  return date;
}

switch (d.getMonth()) {
  case 1:
    monthName = "Jan";
    break;
  case 2:
    monthName = "Feb";
    break;
  case 3:
    monthName = "Mar";
    break;
  case 4:
    monthName = "Apr";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "Jun";
    break;
  case 7:
    monthName = "Jul";
    break;
  case 8:
    monthName = "Aug";
    break;
  case 9:
    monthName = "Sep";
    break;
  case 10:
    monthName = "Oct";
    break;
  case 11:
    monthName = "Nov";
    break;
  case 12:
    monthName = "Dec";
    break;
}

document.getElementById("time").innerText = today();

let createDate = document.getElementById("create-date");
createDate.value = `${d.getDate()}-${monthName}-${d.getFullYear()}`;
