(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(34)},19:function(e,n,t){},32:function(e,n,t){},34:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),i=t(8),u=t.n(i),l=(t(19),t(4)),s=t(9),o=t(10),c=t(12),h=t(11),v=t(13),x=t(0),w=(t(32),function(e){function n(e){var t;Object(s.a)(this,n),t=Object(c.a)(this,Object(h.a)(n).call(this,e));var r=x.GridGenerator.hexagon(2);return t.level2hexs=[new x.Hex(0,-2,2),new x.Hex(1,-2,1),new x.Hex(2,-2,0),new x.Hex(2,-1,-1),new x.Hex(2,0,-2),new x.Hex(1,1,-2),new x.Hex(0,2,-2),new x.Hex(-1,2,-1),new x.Hex(-2,2,0),new x.Hex(-2,0,2),new x.Hex(-1,-1,2)],t.level1hexs=[new x.Hex(0,-1,1),new x.Hex(1,-1,0),new x.Hex(1,0,-1),new x.Hex(0,1,-1),new x.Hex(-1,1,0),new x.Hex(-1,0,1)],t.state={hexagons:r,turns:{},turnsMade:0,turn:1,result:null,winCombination:[]},t}return Object(v.a)(n,e),Object(o.a)(n,[{key:"makeTurn",value:function(e,n){var t=this.state,r=t.turns,a=t.turn,i=t.turnsMade,u={};u[x.HexUtils.getID(e)]=a;var s=Object.assign(u,r),o=i+1,c=this.checkResult(s,o),h=Object(l.a)(c,2),v=h[0],w=h[1];this.setState({result:v,winCombination:w,turn:null===v?(a+1)%2:void 0,turns:s,turnsMade:o})}},{key:"checkResult",value:function(e,n){if(n<7)return[null,[]];var t,r,a=this.checkRound(e,this.level1hexs),i=Object(l.a)(a,2);if(t=i[0],r=i[1],null!==t)return[t,r];var u=this.checkRound(e,this.level2hexs),s=Object(l.a)(u,2);if(t=s[0],r=s[1],null!==t)return[t,r];var o=this.checkDiagonals(e),c=Object(l.a)(o,2);return t=c[0],r=c[1],null!==t?[t,r]:[n>=19?-1:null,[]]}},{key:"checkRound",value:function(e,n){for(var t=this.getTurn(e,n[0]),r=void 0===t?[]:[n[0]],a=1;a<n.length+4-1;++a){var i=n[a%n.length],u=this.getTurn(e,i);if(t===u){if(void 0!==t&&(r.push(i),r.length>=4))return[t,r]}else r=void 0===(t=u)?[]:[i]}return[null,[]]}},{key:"checkDiagonals",value:function(e){for(var n=0;n<this.level2hexs.length;++n){var t=this.level2hexs[n],r=this.getTurn(e,t);if(void 0!==r){var a=[t],i=this.level1hexs[Math.trunc(n/2)];if(this.getTurn(e,i)===r){a.push(i);for(var u=x.HexUtils.subtract(i,t),l=0;l<2&&(i=x.HexUtils.add(i,u),this.getTurn(e,i)===r);++l)a.push(i);if(a.length>=4)return[r,a]}}}return[null,[]]}},{key:"hexLevel",value:function(e){return Math.max(Math.max(Math.abs(e.q),Math.abs(e.r)),Math.abs(e.s))}},{key:"getTurn",value:function(e,n){return e[x.HexUtils.getID(n)]}},{key:"render",value:function(){var e=this,n=this.state,t=n.hexagons,r=n.turns,i=n.result,u=n.winCombination,l=n.turn;return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,null!==i?0===i?"O wins":1===i?"X wins":"Draw":0===l?"O's turn":"X's turn"),a.a.createElement(x.HexGrid,{width:"100%",viewBox:"-50 -50 100 100"},a.a.createElement(x.Layout,{size:{x:10,y:10},flat:!0,spacing:1.01,origin:{x:0,y:0}},t.map(function(n,t){return a.a.createElement(x.Hexagon,{key:t,q:n.q,r:n.r,s:n.s,className:["level".concat(e.hexLevel(n)),u.find(function(e){return x.HexUtils.equals(e,n)})?"winner":""].join(" "),onClick:void 0===e.getTurn(r,n)&&null===i?function(){return e.makeTurn(n,t)}:void 0},a.a.createElement(x.Text,null,1===e.getTurn(r,n)?"X":0===e.getTurn(r,n)?"O":null))}))))}}]),n}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(a.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,2,1]]]);
//# sourceMappingURL=main.68670afe.chunk.js.map