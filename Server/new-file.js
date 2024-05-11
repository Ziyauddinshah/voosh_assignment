// const a={"b":1};
// const c=a;
// c.b=5;
// console.log(a);

const b = {
    "b":1,
    "c":2,
    "d":3,
    "e":4,
};

// for(let i=0;i<10;i++){
//     setTimeout(()=>{
//       console.log(i);
//     },3000);
//   }

var data = {
  Name: "Abhi",
  Age: 25,
}

for(const key in data){
  if(data.hasOwnProperty(key)){
    console.log(`${key}: -> ${data[key]}`);
  }
}