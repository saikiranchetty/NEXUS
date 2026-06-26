var a1 = "Full Stack Python";
var a2 = "Full Stack Python";
var a3 = "Full Stack Python";
var a4 = "Full Stack Python";
var a5 = "Full Stack Python";
var a6 = "Full Stack Python";
var a7 = "Full 'Stack' Python";

document.getElementById("a1").innerHTML = "The string is " + a1;
document.getElementById("a2").innerHTML =
  "The string slice with slice(0,11) is " + a2.slice(0, 11);
document.getElementById("a3").innerHTML =
  "The string indexOf('Stack') " + a3.indexOf("Stack");
document.getElementById("a4").innerHTML =
  "The string to repeat " + a4.repeat(2);
document.getElementById("a5").innerHTML =
  "The string charAt(5) is " + a5.charAt(5);
document.getElementById("a6").innerHTML =
  "The string charCodeAt(6) is " + a6.charCodeAt(6);
document.getElementById("a7").innerHTML =
  "The string  backspace is used to place quotes in same type of quotes " + a7;
