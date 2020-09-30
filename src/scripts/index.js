import person from 'scripts/module'
import  'theme/index.css';
import  'theme/main.scss';

/*alert(person.party);*/
console.log(person.age);
console.log("6666")
console.log("888888")
var root =document.createElement('div');
root.append(document.createTextNode(person.age));
document.getElementById("root").append(document.createTextNode(person.age));
 if (process.env.NODE_ENV !== 'production') {
       console.log('Looks like we are in development mode!');
     }else {
     console.log('Looks like we are in production mode!');
 }
