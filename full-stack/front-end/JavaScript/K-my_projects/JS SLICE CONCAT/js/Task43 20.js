const arr = ['kumar', 'rama', 'suresh', 45, true, false, 'sudha', 'manu', 'somu', 'dhoni', 'kohli', 'rohith'];

// -12      -11     -10   -9  -8   -7     -6      -5     -4     -3      -2      -1
//'kumar','rama','suresh',45,true,false,'sudha','manu','somu','dhoni','kohli','rohith'
//  0       1       2      3   4    5      6       7      8      9      10      11

document.getElementById("b1").innerHTML ='This is the arr values = '+ arr;
document.getElementById("b2").innerHTML ='This is the arr type = ' + typeof(arr);
document.getElementById("b3").innerHTML = 'This is the arr length = ' + arr.length;

document.getElementById("b4").innerHTML ='This is the arr.slice(-10,7) answer = ' + arr.slice(-10,7); // suresh,45,true,false,sudha
document.getElementById("b5").innerHTML ='This is the arr.slice(9,10) answer = ' + arr.slice(9,10); // dhoni
document.getElementById("b6").innerHTML ='This is the arr.slice(-12,-7) answer = ' + arr.slice(-12,-7); // kumar,rama,suresh,45,true
document.getElementById("b7").innerHTML = 'This is the arr.slice(1,-7) answer = ' + arr.slice(1, 7); // rama,suresh,45,true,false,sudha

const arr1 = ['ramesh', 'suresh', 'karthik'];

document.getElementById("c1").innerHTML = 'This is the arr1 values = ' + arr1; 
arr1.shift()
document.getElementById("c2").innerHTML = 'This is the shift() Method = ' + arr1; 
arr1.unshift("venkat");
document.getElementById("c3").innerHTML = 'This is the unshift() Method = ' + arr1;


const arr2 = [332, 43, 43, 43, 4, 4, 45, 'yy', 7, 787654];


document.getElementById("d1").innerHTML ='This is the  arr2 values = ' + arr2;
document.getElementById("d2").innerHTML ='This is the arr1.concat(arr2) method = ' + arr1.concat(arr2);
document.getElementById("d3").innerHTML = 'This is the arr2.concat(arr1) method = ' + arr2.concat(arr1);
document.getElementById("d4").innerHTML = 'This is the before delete arr2[0] method = ' + arr2;
delete arr2[0];
document.getElementById("d5").innerHTML ='This is the after delete arr2[0] method = ' + arr2;



