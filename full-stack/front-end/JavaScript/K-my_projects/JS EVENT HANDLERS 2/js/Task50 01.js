const doc = document.getElementById('text')

function changeColorOnHover() {
  doc.style.backgroundColor = 'blue';
  doc.style.color = 'white';
}

function RestoreColorOnExit() {
  doc.style.backgroundColor = 'white';
  doc.style.color = 'black';
}

doc.addEventListener("mouseenter", changeColorOnHover);
doc.addEventListener("mouseleave", RestoreColorOnExit);


function show() {
  doc.style.display = 'block';
}

function hide() {
  doc.style.display = 'none';
}


function a1() {
  document.getElementById("container").style.animation = "ani1 0.5s infinite";
}

doc.addEventListener("animationstart", a2);
doc.addEventListener("animationend", a3);

function a2() {
  document.getElementById("container").style.animation = "ani1 0.5s infinite";
}
function a3() {
  document.getElementById("container").style.animation = "ani1 0.5s infinite";
}