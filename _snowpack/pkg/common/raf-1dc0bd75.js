import{w as n}from"./index-b555160e.js";var c=0,e={};function t(s){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,r=c++,i=a;function l(){i-=1,i<=0?(s(),delete e[r]):e[r]=n(l)}return e[r]=n(l),r}t.cancel=function(a){a!==void 0&&(n.cancel(e[a]),delete e[a])},t.ids=e;export{t as w};