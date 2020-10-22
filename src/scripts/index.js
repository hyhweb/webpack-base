import person from 'scripts/module'
import common from "scripts/common";
import  'theme/index.css';
import  'theme/main.scss';

window.onresize= function(){
    alert('do')
    require.ensure([], function() {
        var baidumap = require('./index2.js') //baidumap.js放在我们当前目录下
        console.log(baidumap.add(2,3)) ;

    })
}
//alert(common.aaa);
console.log(person.bbb);
/*console.log("6666")
console.log("888888")*/
var root =document.createElement('div');
root.append(document.createTextNode(person.age));
document.getElementById("root").append(document.createTextNode(person.age));
 if (process.env.NODE_ENV !== 'production') {
       console.log('Looks like we are in development mode!');
     }else {
     console.log('Looks like we are in production mode!');
 }
