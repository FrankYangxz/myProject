/**
 * Created by yangxz-nash on 17/6/30.
 */
(new Promise(f1)).then(f2).then(f3);

function f1() {
    console.log(1)
}
function f2() {
    console.log(2)
}
function f3() {
    console.log(2)
}
