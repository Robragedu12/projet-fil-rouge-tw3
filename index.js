// index.js
import dayjs from "dayjs";
import _ from "lodash";

console.log(_.upperCase("bonjour npm"));
console.log(dayjs().format("DD/MM/YYYY"));
console.log(dayjs().unix());
console.log(_.isNil(null) ? "vrai" : "faux");
console.log(_.toFinite(Infinity));