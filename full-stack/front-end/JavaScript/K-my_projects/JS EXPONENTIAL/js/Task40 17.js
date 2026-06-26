var d = 987.2535;

var e = 0.5678945;

document.getElementById('a0').innerHTML = 'var 987.2535';

document.getElementById('a1').innerHTML ='This is d.toExponential(0) = ' + d.toExponential(0);// 9e+2 10e+2

document.getElementById('a2').innerHTML ='This is d.toExponential(1) = '+ d.toExponential(1);// 9.9e+2 9.9

document.getElementById("a3").innerHTML ='This is d.toExponential(2) = '+ d.toExponential(2);// 9.98e+2 9.97

document.getElementById("a4").innerHTML ='This is d.toExponential(3) = ' + d.toExponential(3);//9.8 9.983 9.973

document.getElementById("a5").innerHTML ='This is d.toExponential(4) = ' + d.toExponential(4);//9.9835 9.9735 

document.getElementById("a6").innerHTML ='This is d.toExponential(8) = ' + d.toExponential(8);//9.98354 9.973500

document.getElementById("a7").innerHTML = 'This is d.toExponential(10) = ' + d.toExponential(10);//9.9883540 9.9735450000

document.getElementById("a8").innerHTML = 'var 0.5678945';

document.getElementById('a9').innerHTML ='This is d.toExponential(0) = ' + e.toExponential(0);// 1e+0

document.getElementById('a10').innerHTML ='This is d.toExponential(1) = '+ e.toExponential(1);// 0.6 e-1

document.getElementById("a11").innerHTML ='This is d.toExponential(2) = '+ e.toExponential(2);// 0.57

document.getElementById("a12").innerHTML ='This is d.toExponential(3) = ' + e.toExponential(3);// 0.568

document.getElementById("a13").innerHTML ='This is d.toExponential(4) = ' + e.toExponential(4);// 0.5679 

document.getElementById("a14").innerHTML ='This is d.toExponential(5) = ' + e.toExponential(8);// 0.56789450

document.getElementById("a15").innerHTML ='This is d.toExponential(6) = ' + e.toExponential(10);// 0.5678945000







