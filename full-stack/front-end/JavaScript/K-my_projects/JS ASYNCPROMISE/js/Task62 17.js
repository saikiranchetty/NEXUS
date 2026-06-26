class Stud {
  constructor(name, course, year) {
    this.name = name;
    this.course = course;
    this.year = year;
  }
  age() {
    const date = new Date();
    return date.getFullYear() - this.year;
  }
}
const stud1 = new Stud("suman", "full-stack python", 2002);
const stud2 = new Stud("rabi", "full-stack java", 2004);

const b1 = document.getElementById("a1");
b1.innerHTML =
  stud1.name + "<br><br>" + stud1.course + "<br><br>" + stud1.age();
const b2 = document.getElementById("a2");
b2.innerHTML =
  stud2.name + "<br><br>" + stud2.course + "<br><br>" + stud2.age();

class Bike {
  constructor(brand) {
    this.carnm = brand;
  }
  pres() {
    return "i have " + this.carnm;
  }
}
class Model extends Bike {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  outp() {
    return this.pres() + " it is a " + this.model;
  }
}
const bike1 = new Model("BMW", "maybach");
document.getElementById("a3").innerHTML = bike1.outp();

class Fam {
  constructor(name) {
    this.name = name;
  }
  static nm1(b) {
    return "Welcome Family " + b.name;
  }
}
const fam1 = new Fam("First family");
document.getElementById("a4").innerHTML = Fam.nm1(fam1);

function oup(pr) {
  document.getElementById("a5").innerHTML = pr;
}

function f1() {
  oup("Teks Academy");
}
function f2() {
  oup("Full Stack developers");
}
function f3() {
  oup("Front end Stack developers");
}
f1();
f2();
f3();

//async --i will finish later
setTimeout(f4, 3000);
function f4() {
  document.getElementById("a6").innerHTML =
    "Async setTimeout Executed successfully";
}
setInterval(f5, 4000);
function f5() {
  document.getElementById("a7").innerHTML =
    "Async setInterval Executed successfully";
}

//promise--compulsory we will get result
function f6(pm) {
    document.getElementById('a8').innerHTML = pm;
}
const prom1=new Promise(function(res,rej){
    let h=5;
    if (h==5){
        res('output is expected')
    }else{
        rej('error')
    }
});
prom1.then(
    function(val){f7(val);},
    function(error){f7(error);}
)

function f8(params) {
    document.getElementById('a9').innerHTML = params;
}
async function f9() {
    return ' Hello World!'
}
f9().then(
    function(valu){f8(valu)}
)