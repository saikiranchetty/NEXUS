const t = document.getElementById("time");
t.innerHTML = Date();

function a1() {
  return "output";
}
function a2() {
  alert("You had printed successfulyy!!");
}

function a3() {
  const a1 = document.getElementById("a1");
  a1.value = a1.value.toUppercase();
}

function a4() {
  const a2 = document.getElementById("a2").value;
  const b1 = document.getElementById("b1");
  b1.innerHTML = "you had selected this input: " + a2;
}

function a5() {
  const a3 = document.getElementById("a3").value;
  const b2 = document.getElementById("b2");
  b2.innerHTML = "Email id: " + a3;
}

function a6() {
  const a4 = document.getElementById("a4");
  a4.style.backgroundColor = "hsl(25, 20%, 50%)";
  a4.style.border = "10px dashed blue";
  a4.style.padding = "15px";
  a4.style.fontSize = "20px";
  a4.style.fontFamily = "cursive";
}

function a7() {
  const a4 = document.getElementById("a4");
  a4.style.backgroundColor = "hsl(50, 50%, 50%)";
  a4.style.border = "3px solid";
  a4.style.borderRadius = "30px";
  a4.style.padding = "15px";
  a4.style.margin = "15px";
  a4.style.display = "flex";
  a4.style.justifyContent = "center";
  a4.style.alignItems = "center";
  a4.style.fontFamily = "Audiowide, sans-serif";
}

function a8() {
  const a5 = document.getElementById("a5");
  a5.style.border = "3px solid black";
  a5.style.background = "linear-gradient(to left,red,blue)";
  a5.style.color = "white";
  a5.style.textAlign = "center";
}
