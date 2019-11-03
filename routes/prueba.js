const argon2 = require("argon2");

let hash = argon2.hash("12345").then(res => console.log(res));
