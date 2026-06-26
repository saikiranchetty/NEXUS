console.log(window.location.host);
console.log(window.location.ancestorOrigins);
console.log(window.location.pathname);
console.log(window.location.port);
console.log(window.location.href);
console.log(window.location.origin);
console.log(window);
console.log(navigator.geolocation.getCurrentPosition(sp));
const a1 = document.getElementById("b1");
function sp(pos) {
  a1.innerHTML =
    "latitude " +
    pos.coords.latitude +
    "<br>" +
    "longtitude " +
    pos.coords.longitude;
}

function f1() {
  alert("This is 5 seconds of set time out!");
}

function f2(a, b) {
  return a * b;
}
console.log(f2(5, 6));

let f3 = (a, b) => {
  return a * b;
};
console.log(f3(3, 6));

setInterval(f4, 1000);
function f4() {
  const g = new Date();
  document.getElementById("b2").innerHTML = g.toLocaleTimeString();
}

function f41() {
  const inp = document.getElementById("v1");
  if (!inp.checkValidity()) {
    document.getElementById("ou").innerHTML = "enter between 100 to 200";
  } else {
    document.getElementById("ou").innerHTML = "input is fine";
  }
}

localStorage.setItem("name", "Raju");
localStorage.setItem("course", "full stack");
localStorage.setItem("age", 14);
localStorage.setItem("email", "Raju@teksacademy.com");
document.getElementById("lc").innerHTML =
  localStorage.getItem("name") +
  "<br>" +
  localStorage.getItem("course") +
  "<br>" +
  localStorage.getItem("age") +
  "<br>" +
  localStorage.getItem("email");
