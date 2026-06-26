var a1 = 'Teks suresh kumar bob robert' ;

var a2 = `Lorem ipsum dolor sit amet, consectetur
adipisicing elit. Nisi quod, soluta odit omnis aperiam ipsam eos fugiat veritatis ipsa. Esse ad veritatis tempora exercitationem nam ea suscipit reprehenderit officiis commodi.`;

var a3 = 36767;

document.getElementById('a1').innerHTML = 'This is single line string with "SINGLE or DOUBLE QUOTATIONS "-- ' + a1;

document.getElementById('a2').innerHTML = 'This is multiple lines string with "BACKTICKS "-- ' + a2;

document.getElementById('a3').innerHTML = 'Every year we are going to have weeks and we are going to have 7 days ';

document.getElementById('a4').innerHTML = ` we are going to have per day ${24 * 60 * 60 * 1000} per day around`

document.getElementById('a5').innerHTML = 'This is Number.MAX_SAFE_INTEGER VALUE = ' + Number.MAX_SAFE_INTEGER;

document.getElementById("a6").innerHTML = 'This is Number.MIN_SAFE_INTEGER VALUE = ' + Number.MIN_SAFE_INTEGER;

document.getElementById("a7").innerHTML = 2 ** 53 - 1;