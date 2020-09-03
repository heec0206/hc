import hello_word from "./hello.js";
import world_word from "./world.js";
import _ from "loadsh";
import css from './wbCommon.css';
document.querySelector("#root").innerHTML = _.join( [hellow_word, world_word], '' );

console.log('css',css);
