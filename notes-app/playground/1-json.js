// import fs from "fs";
// import chalk from "chalk";

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJson = dataBuffer.toString();
// const data = JSON.parse(dataJson);
// data.map((e) => {
//   console.log("Name:", chalk.blue.bold(e.name));
//   console.log("Species:", chalk.yellow.bold(e.species));
//   console.log("likes:", chalk.greenBright.bold(e.foods.likes));
//   console.log("dislikes:", chalk.redBright.bold(e.foods.dislikes));
//   console.log("***************************************************");
// });


import fs from "fs"
const dataBuffer = fs.readFileSync("1-json.json")
const dataJson = dataBuffer.toString()
const data = JSON.parse(dataJson)
data.name = "SJ"
data.age = 100
const userJson = JSON.stringify(data)
fs.writeFileSync("1-json.json",userJson)

// data.map((e)=>{
//   console.log("Name:", chalk.blue.bold(e.name));
//     console.log("Species:", chalk.yellow.bold(e.species));
//     console.log("likes:", chalk.greenBright.bold(e.foods.likes));
//     console.log("dislikes:", chalk.redBright.bold(e.foods.dislikes));
//     console.log("***************************************************");
// })