const t = document.getElementById("time");
t.innerHTML = Date();

function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}

function dragging(event) {
  document.getElementById("i3").innerHTML = "The element is about to drag";
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("Text");
  event.target.appendChild(document.getElementById(data));
  document.getElementById("i4").innerHTML = "The p element is dropped";
}