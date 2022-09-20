var DateTime = luxon.DateTime;

let inputs = document.querySelectorAll("input");
let startValue;
let endValue;
let diff;
let hours;
let sum = 0;
let monthResult = document.querySelector(".monthResult");

const russianHumanizer = humanizeDuration.humanizer({
  language: "ru",
});

function checkDuration(startValue, endValue) {
  let start = DateTime.fromISO(startValue);
  let end = DateTime.fromISO(endValue);
  diff = end.diff(start);
  hours = russianHumanizer(diff);
}

function onInputChange(elem) {
  let day = elem.closest(".day");
  let startValue = day.querySelector(".start").querySelector("input").value;
  let endValue = day.querySelector(".end").querySelector("input").value;
  checkDuration(startValue, endValue);
  day.querySelector(".resultValue").value = Number(diff.milliseconds);
  day.querySelector(".result span").textContent = `${hours}`;
}

function summarize() {
  sum = 0;
  let days = document.querySelectorAll(".day");
  console.log(sum);
  for (let i = 0; i < days.length; i++) {
    sum += Number(days[i].querySelector(".resultValue").value);
    console.log(sum);
  }
}

function addDayList() {
  let cloneDay = document.querySelector(".day").cloneNode(true);
  cloneDay.querySelectorAll("input").forEach((input) => {
    input.value = "";
    input.addEventListener("change", ()=> {
        onInputChange(input)
    });
  });
  cloneDay.querySelector(".result span").textContent = "";
  document.querySelector(".list").appendChild(cloneDay);
}



inputs.forEach((input) => {
  input.addEventListener("change", () => {
    onInputChange(input)
  });
});

document.querySelector(".addDay").addEventListener("click", () => {
  addDayList();
});

document.querySelector(".resultButton").addEventListener("click", () => {
  summarize();
  monthResult.querySelector('.resultDefault').textContent = `${russianHumanizer(sum)}`;
  monthResult.querySelector('.resultInHours').textContent = `${russianHumanizer(sum, {units: ['h', 'm']})}`;
});
