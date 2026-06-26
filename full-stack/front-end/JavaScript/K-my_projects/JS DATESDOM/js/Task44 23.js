var dt = new Date();


document.getElementById("a1").innerHTML ='This is new Date() = ' + dt;
document.getElementById("a2").innerHTML ='This is dt.toDateString() = ' + dt.toDateString();
document.getElementById("a3").innerHTML ='This is dt.toISOString = ' + dt.toISOString();
document.getElementById("a4").innerHTML ='This is dt.toLocaleDateString() = ' + dt.toLocaleDateString();
document.getElementById("a5").innerHTML ='This is dt.toLocaleTimeString() = ' + dt.toLocaleTimeString();
document.getElementById("a6").innerHTML ='This is dt.toUTCString() = ' + dt.toUTCString();
document.getElementById("a7").innerHTML ='This is dt.toTimeString() = ' + dt.toTimeString();
document.getElementById("a8").innerHTML = "This is dt.toJSON() = " + dt.toJSON();
document.getElementById("a9").innerHTML ='This is dt.setFullYear() = ' + dt.setFullYear(2005);
document.getElementById("a10").innerHTML ='This is dt.setHours() = ' + dt.setHours(12);
document.getElementById("a11").innerHTML = 'This is dt.setMinutes() = ' + dt.setMinutes(54);


//DOM - Document Object Model

const student1 = {
    firstName: "Raju",
    lastName: "Bhai",
    age: 18,
    phoneNo:9547812369,
}

document.getElementById("a12").innerHTML ='This is firstName = ' + student1.firstName;
document.getElementById("a13").innerHTML ='This is lastName = ' + student1.lastName;
document.getElementById("a14").innerHTML ='This is age = ' + student1.age;
document.getElementById("a15").innerHTML ='This is phoneNo = ' + student1.phoneNo;