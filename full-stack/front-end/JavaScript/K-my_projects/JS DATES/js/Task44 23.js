var s = new Date();


document.getElementById("a1").innerHTML ='This is new Date() = ' + Date();
document.getElementById("a2").innerHTML ='This is new Date(string) = ' + new Date("12/10/2001");
document.getElementById("a3").innerHTML ='This is new Date(year, month) = ' + new Date("2001/12");
document.getElementById("a4").innerHTML ='This is new Date(year, month, day) = ' + new Date("2001/12/10");
document.getElementById("a5").innerHTML ='This is s.getTime() = ' + s.getTime();
document.getElementById("a6").innerHTML ='This is s.getFullYear() = ' + s.getFullYear();
document.getElementById("a7").innerHTML ='This is s.getMonth() = ' + s.getMonth();
document.getElementById("a8").innerHTML ='This is s.getDay() = ' + s.getDay();
document.getElementById("a9").innerHTML ='This is s.getHours() = ' + s.getHours();
document.getElementById("a10").innerHTML ='This is s.getMinutes() = ' + s.getMinutes();
document.getElementById("a11").innerHTML ='This is s.getMilliseconds() = ' + s.getMilliseconds();
document.getElementById("a12").innerHTML ='This is s.getTimezoneOffset() = ' + s.getTimezoneOffset();
document.getElementById("a13").innerHTML ='This is s.getUTCDate() = ' + s.getUTCDate();
document.getElementById("a14").innerHTML ='This is s.getTime() = ' + s.getTime();
document.getElementById("a15").innerHTML ='This is s.toUTCString() = ' + s.toUTCString();
