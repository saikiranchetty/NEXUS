//Method 1 Creating Object
const student1 = {
        firstName:"Raju",
        lastName:"Bhai",
        bloodgroup:"O+",
        age:22,
        phoneNo:9547812369,
}

//Method 1 Creating Object
const student2 = {}
student2.firstName="ramesh";
student2.lastName="reddy";
student2.age=23;
student2.course="full stack java";


    

document.getElementById("a1").innerHTML ='This is student1. firstName = ' + student1.firstName;
document.getElementById("a2").innerHTML ='This is student1.lastName = ' + student1.lastName;
document.getElementById("a3").innerHTML ='This is student1.bloodgroup = ' + student1.bloodgroup;
document.getElementById("a4").innerHTML ='This is student1.age = ' + student1.age;
document.getElementById("a5").innerHTML ='This is student1.phoneNo = ' + student1.phoneNo;

document.getElementById("a6").innerHTML ='This is student2. firstName = ' + student2.firstName;
document.getElementById("a7").innerHTML ='This is student2.lastName = ' + student2.lastName;
document.getElementById("a9").innerHTML ='This is student2.age = ' + student2.age;
document.getElementById("a10").innerHTML ='This is student2.course = ' + student2.course;