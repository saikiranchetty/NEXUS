//firstChild
const n1 = document.getElementById("a1");
document.getElementById("b1").innerHTML =
  document.getElementById("a1").firstChild.nodeValue;
document.getElementById("b11").innerHTML =
  "This is the nodeType of TEKS ACADEMY ASPIRANTS :- " + n1.nodeType;

//childnodes
document.getElementById("b2").innerHTML =
  document.getElementById("a2").childNodes[0].nodeValue;

//ParentNode LastChild nextSibling previousSibling

const p = document.createElement("p");
const n = document.createTextNode("This is the New text by nodes concept");
p.appendChild(n);
const ch1 = document.getElementById("a4");
const el1 = document.getElementById("dv");
el1.appendChild(p);
el1.insertBefore(p, ch1);
const r = document.getElementById("a5");
r.remove();

const ct = document.getElementsByTagName("pre");
document.getElementById("a6").innerHTML =
  "Number of tags or number total values: " + ct.length;

function f1() {
  const n1 = document.querySelectorAll("p");
  for (let i = 0; i < n1.length; i++) {
    n1[i].style.fontSize = "20px";
    n1[i].style.color = "hsl(240, 100%, 50%)";
  }
}

console.log(navigator.cookieEnabled);
console.log(navigator.languages);
console.log(navigator.language);
console.log(navigator.vendor);
console.log(navigator.vendorSub);
console.log(navigator.appVersion);
console.log(navigator.appCodeName);
console.log(navigator.appName);
console.log(navigator.product);
console.log(navigator.productSub);
console.log(navigator.onLine);
console.log(navigator.platform);
console.log(navigator.javaEnabled());
console.log(navigator.mediaSession);
console.log(window.innerHeight);
console.log(window.innerWidth);
console.log(window.screen.availHeight);
console.log(window.screen.orientation);
console.log(window.history.forward());
console.log(window.history.back());
console.log(window);
