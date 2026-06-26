var b = '      Teks Academy Aspirants     ';

document.getElementById("a1").innerHTML =
  "This is the length of Teks Academy Aspirants = " + b.length;

var b1 = b.trimStart();

document.getElementById("a2").innerHTML =
  "This is the trimStart() of Teks Academy Aspirants = " + b1.length;

var b2 = b.trimEnd();

document.getElementById("a3").innerHTML =
  "This is the trimEnd() of Teks Academy Aspirants = " + b2.length;

var b3 = b.trim();

document.getElementById("a4").innerHTML =
  "This is the trim() of Teks Academy Aspirants = " + b3.length;

var b4 = 'Developers';

document.getElementById("a5").innerHTML =
  "This is the padStart(25,'Teks') of Teks Academy Aspirants = " +
  b4.padStart(25, "Teks");

var b5 = 'FULL STACK';

document.getElementById("a6").innerHTML =
  "This is the padEnd(25, 'developers') of Teks Academy Aspirants = " + b5.padEnd(25, "developers");

var b6 = b.replace('Aspirants','Developers');

document.getElementById("a7").innerHTML =
  "This is the replace('Aspirants','Developers') of Teks Academy Aspirants = " +
  b6;

var b7 = b.indexOf('Teks');

document.getElementById("a8").innerHTML =
  "This is the indexOf('Teks') of Teks Academy Aspirants = " + b7;

var b8 = b.lastIndexOf('Aspirants');

document.getElementById("a9").innerHTML =
  "This is the lastIndexOf('Aspirants') of Teks Academy Aspirants = " +
  b8;
  
var c ="      Teks Academy Aspirants Teks Academy Aspirants  Teks Academy Aspirants    ";
var b9 = c.match(/Academy/ig);

document.getElementById("a10").innerHTML =
  "This is the match('Academy') of Teks Academy Aspirants = " + b9;

var b10 = c.search('s');

document.getElementById("a11").innerHTML =
  "This is the search('s') of Teks Academy Aspirants = " + b10;

var b11 = 'Ramesh Suresh Ramu Raghu';

document.getElementById("a12").innerHTML =
  "This is the substring(0,10) of Teks Academy Aspirants = " +
  b11.substring(0, 10);
