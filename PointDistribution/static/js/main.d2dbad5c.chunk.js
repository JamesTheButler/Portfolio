(this["webpackJsonppoint-distribution"]=this["webpackJsonppoint-distribution"]||[]).push([[0],{33:function(t,e,n){},34:function(t,e,n){},35:function(t,e,n){},37:function(t,e,n){},42:function(t,e,n){},43:function(t,e,n){},44:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),r=n(17),s=n.n(r),o=(n(33),n(34),n(6)),l=n(7),c=n(9),u=n(8),d=(n(35),n(23),n(2)),h=function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(d.jsx)("header",{className:"default-header",children:Object(d.jsx)("nav",{className:"navbar",children:Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsx)("a",{className:"button",id:"to-portfolio",href:"http://www.tom.ille-web.de",children:"To Portfolio"})})})})}}]),n}(i.Component),m=n(56),p=(n(37),function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props,e=t.title,n=t.subtitle;return Object(d.jsxs)("div",{className:"default-algorithm-title col-12 p-3",children:[Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"h3",gutterBottom:!0,children:e}),Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"subtitle",gutterBottom:!0,children:n})]})}}]),n}(i.Component)),g=(n(42),n(58)),b=(n(43),function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(){var t;Object(o.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))).state={algTitle:"Fully Random Scatter",algDesc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},t}return Object(l.a)(n,[{key:"onSettingsChanged",value:function(t){null!=this.props.onSettingsChanged&&this.props.onSettingsChanged(t)}},{key:"updateAlgorithmDescription",value:function(t){var e=[{title:"Fully Random Scatter",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},{title:"My Custom Algorithm",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},{title:"Poisson-Disc",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}];t>=e.length||this.setState({algTitle:e[t].title,algDesc:e[t].description})}},{key:"render",value:function(){var t=this;return Object(d.jsx)("div",{className:"main-alg-element col-3",children:Object(d.jsxs)("div",{className:"alg-menu point-distribution-menu",children:[Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"h4",gutterBottom:!0,children:"Settings"}),Object(d.jsxs)("div",{className:"col-12 settings-slider",children:[Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"h5",gutterBottom:!0,children:"Map Size"}),Object(d.jsx)(g.a,{defaultValue:0,min:0,step:1,max:2,marks:[{value:0,label:"Small"},{value:1,label:"Medium"},{value:2,label:"Large"}],className:"col-8",onChange:function(e,n){return t.onSettingsChanged({mapSize:n})}})]}),Object(d.jsxs)("div",{className:"col-12 settings-slider",children:[Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"h5",gutterBottom:!0,children:"Algorithm"}),Object(d.jsx)(g.a,{min:0,step:1,max:2,marks:[{value:0,label:"Fully Random"},{value:1,label:"mine"},{value:2,label:"Poisson-Disc"}],className:"col-8",onChange:function(e,n){t.onSettingsChanged({algorithm:n}),t.updateAlgorithmDescription(n)}})]}),Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"h6",gutterBottom:!0,children:this.state.algTitle}),Object(d.jsx)(m.a,{id:"non-linear-slider",variant:"body1",gutterBottom:!0,children:this.state.algDesc})]})})}}]),n}(i.Component));b.defaultProps={OnSettingsChanged:null};var v=function(t,e){return Math.random()*(e-t)+t},f=function(t,e){var n=0,i=null;for(n=1;n<=t;n++)if(t%n==0){var a=t/n;if(!(null==i||Math.abs(n/a-e)<Math.abs(i[0]/i[1]-e)))break;i=[n,a]}return i},j=(n(44),function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(){var t;return Object(o.a)(this,n),(t=e.call(this)).state={},t}return Object(l.a)(n,[{key:"getSizeRatio",value:function(t){switch(t){case 0:default:return.1;case 1:return.25;case 2:return.45}}},{key:"generatePoints",value:function(t,e,n){var i=Math.floor(e*n*.05);switch(t){case 1:return function(t,e,n){for(var i=[],a=f(n,e/t),r=a[0],s=a[1],o=[t/r,e/s],l=0;l<r;l++)for(var c=0;c<s;c++)i.push([v(c*o[1],(c+1)*o[1]),v(l*o[0],(l+1)*o[0])]);return console.log(n+" points generated with even spacing"),i}(e,n,i);case 2:return function(t,e,n,i){for(var a=[],r=0;r<n;r++)a.push([v(0,e),v(0,t)]);return console.log(n+" random points generated"),a}(e,n,i);case 0:default:return function(t,e,n){for(var i=[],a=0;a<n;a++)i.push([v(0,e),v(0,t)]);return console.log(n+" random points generated"),i}(e,n,i)}}},{key:"drawPoints",value:function(t,e,n,i){var a=this.getSizeRatio(this.props.mapSize),r=e.getContext("2d");r.strokeStyle="#2f528f",r.lineWidth=i,r.clearRect(0,0,e.clientWidth,e.clientHeight);for(var s=0;s<t.length;s++){var o=t[s][1]/a,l=t[s][0]/a;o-n-i>0&&o+n+i<e.clientWidth&&l-n-i>0&&l+n+i<e.clientHeight&&(r.beginPath(),r.arc(o,l,n,0,2*Math.PI),r.stroke())}}},{key:"componentDidUpdate",value:function(){var t=document.getElementById("canvas"),e=this.getSizeRatio(this.props.mapSize),n=Math.floor(t.clientWidth*e),i=Math.floor(t.clientHeight*e),a=this.generatePoints(this.props.algorithm,n,i);this.drawPoints(a,t,.75/e,.5/e)}},{key:"updateCanvasSize",value:function(){var t=document.getElementById("canvas"),e=document.getElementById("canvas").parentElement;t.width=e.offsetWidth-2,t.height=e.offsetHeight-2}},{key:"onWindowResize",value:function(){this.updateCanvasSize(),this.componentDidUpdate()}},{key:"componentDidMount",value:function(){var t=this;window.addEventListener("resize",(function(){return t.onWindowResize()})),this.updateCanvasSize(),this.componentDidUpdate()}},{key:"componentWillUnmount",value:function(){var t=this;window.removeEventListener("resize",(function(){return t.onWindowResize()}))}},{key:"render",value:function(){var t=this;return Object(d.jsx)("div",{className:"col-9 main-alg-element",children:Object(d.jsx)("div",{className:"point-distribution-grid",children:Object(d.jsx)("canvas",{id:"canvas",onClick:function(){return t.componentDidUpdate()}})})})}}]),n}(i.Component));j.defaultProps={mapSize:0,algorithm:0};var y=function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(){var t;return Object(o.a)(this,n),(t=e.call(this)).state={pointNumber:0,mapSize:0,algorithm:"default"},t}return Object(l.a)(n,[{key:"onSettingsChanged",value:function(t){null!=t.pointNumber&&t.pointNumber!=this.state.pointNumber&&this.setState({pointNumber:t.pointNumber}),null!=t.mapSize&&t.mapSize!=this.state.mapSize&&this.setState({mapSize:t.mapSize}),null!=t.algorithm&&t.algorithm!=this.state.algorithm&&this.setState({algorithm:t.algorithm})}},{key:"updateState",value:function(t){this.setState({val:t.target.value})}},{key:"render",value:function(){var t=this;return Object(d.jsxs)("div",{className:"alg-row row "+this.props.className,children:[Object(d.jsx)(j,{pointNumber:this.state.pointNumber,mapSize:this.state.mapSize,algorithm:this.state.algorithm}),Object(d.jsx)(b,{onSettingsChanged:function(e){return t.onSettingsChanged(e)}})]})}}]),n}(i.Component);function O(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(h,{}),Object(d.jsx)(p,{title:"Algorithms for scattering 2D Points"}),Object(d.jsx)(y,{className:"pb-3"}),Object(d.jsx)("div",{className:"container-fluid"})]})}var x=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,60)).then((function(e){var n=e.getCLS,i=e.getFID,a=e.getFCP,r=e.getLCP,s=e.getTTFB;n(t),i(t),a(t),r(t),s(t)}))};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(O,{})}),document.getElementById("root")),x()}},[[45,1,2]]]);
//# sourceMappingURL=main.d2dbad5c.chunk.js.map