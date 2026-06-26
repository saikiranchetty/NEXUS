var d = 5555515151515151515151151512126543216354n;


document.getElementById("a1").innerHTML ='This is the BigInt by taking n = ' + d;
document.getElementById("a2").innerHTML ='This is the BigInt() = ' + BigInt(d);


const arr1 = [] 
arr1[0] = 'HTML';
arr1[1] = 'CSS'; 
arr1[2] = 'JS'; 
arr1[3] = 'PYTHON'; 
arr1[4] = 'JAVA'; 
arr1[5] = 'SQL'; 
document.getElementById("b1").innerHTML ='This is the arr value = '+ arr1;
document.getElementById("b2").innerHTML ='This is the arr type = ' + typeof(arr1);
document.getElementById("b3").innerHTML = 'This is the arr length = ' + arr1.length;
document.getElementById("b4").innerHTML = 'This is the arr before pop() method = ' + arr1;
arr1.pop();
document.getElementById("b5").innerHTML ='This is the arr after pop(last value will removed) method = ' + arr1;
document.getElementById("b6").innerHTML ='This is the arr before push() method = ' + arr1.push("DJANGO");
document.getElementById("b7").innerHTML ='This is the arr after push(last value will added) method = ' + arr1;
document.getElementById("b8").innerHTML = 'This is the arr before unshift method = ' + arr1; 
arr1.unshift("fullstack");
document.getElementById("b9").innerHTML = 'This is the unshift method = ' + arr1;
document.getElementById("b10").innerHTML ='This is the arr1.indexOf("CSS") method = ' + arr1.indexOf('CSS');
document.getElementById("b11").innerHTML ='This is the arr1.includes("HTML") value = ' + arr1.includes("HTML");




document.getElementById("c4").innerHTML ='This is the Math.min(4,5) value = ' +   Math.min(4,5);
document.getElementById("c5").innerHTML ='This is the Math.max(4,5) value = ' +   Math.max(4,5);
document.getElementById("c6").innerHTML ='This is the Math.random(0 to 1) value = ' +   Math.random();
document.getElementById("c7").innerHTML ='This is the Math.random()*10 value = ' +   Math.random()*10;
document.getElementById("c8").innerHTML ='This is the Math.exp(5) value = ' + Math.exp(5);
document.getElementById("c9").innerHTML ='This is the Math.sign(-50) value = ' + Math.sign(-50);
document.getElementById("c10").innerHTML ='This is the Math.sqrt(25) value = ' + Math.sqrt(25);
document.getElementById("c11").innerHTML ='This is the Math.sin(90) value = ' + Math.sin(90);
document.getElementById("c12").innerHTML ='This is the Math.cos(90) value = ' + Math.cos(90);
document.getElementById("c13").innerHTML ='This is the Math.tan(30) value = ' + Math.tan(30);
document.getElementById("c14").innerHTML ='This is the Math.abs(10.5) value = ' + Math.abs(10.5);
document.getElementById("c15").innerHTML ='This is the Math.PI value = ' +   Math.PI;




