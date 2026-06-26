//For Loop
let w = "";
for (i = 0; i < 10; i++){ 
  w +='For loop Answer is : ' +  i + "<br>";

  document.getElementById("a1").innerHTML = w;
}    

const array1 = [56, 998, 38, 55, 66];

//For in
let w1 = "";
for (let k in array1) {
    w1 +='For in loop Answer is : ' + array1[k] +"<br>";

    document.getElementById("a2").innerHTML = w1;
}

const stud1 = {
  firstname: "rajesh",
  Lastname: "kumar",
  age: 19,
  course:"Full-stack-java"
}

//For of
let w2 = "";
for(let j in stud1) {
  w2 +='For of loop Answer is : ' + stud1[j] + "<br>";

  document.getElementById("a3").innerHTML = w2;
}

//For each
let w3 = "";
array1.forEach(f1);
function f1(value, index, array) {
  w3 +='For each loop Answer is : ' + value + "<br>";
  
  document.getElementById("a4").innerHTML = w3;
}

//while
let w4 = "";
while (i<20) {
  w4 +='While loop Answer is : ' +  i + "<br>";
  i++;

  document.getElementById("a5").innerHTML = w4;
}

//do while
let w5 = "";
do {
  w5 += 'do While loop Answer is : ' + i + "<br>";
  i++;
  document.getElementById("a6").innerHTML = w5;
} while (i < 30);

//switch case
let w7;
switch (new Date().getDay()) {
  case 0:
    w7 = "sunday"
    break;
  case 1:
    w7 = "monday"
    break;
  case 2:
    w7 = "Tuesday"
    break;
  case 3:
    w7 = "Wednesday"
    break;
  case 4:
    w7 = "Thursday"
    break;
  case 5:
    w7 = "Friday"
    break;
  case 6:
    w7 = "Saturday"
    break;

  default:
    w7 = "enter correct output"
    break;  
  }
  document.getElementById("a7").innerHTML = w7;





