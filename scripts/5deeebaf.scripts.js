window.Modernizr=function(a,b,c){function d(a){o.cssText=a}function e(a,b){return typeof a===b}var f,g,h,i="2.7.2",j={},k=!0,l=b.documentElement,m="modernizr",n=b.createElement(m),o=n.style,p=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),q={},r=[],s=r.slice,t=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,n=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:m+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',m,'">',a,"</style>"].join(""),j.id=m,(k?j:n).innerHTML+=f,n.appendChild(j),k||(n.style.background="",n.style.overflow="hidden",i=l.style.overflow,l.style.overflow="hidden",l.appendChild(n)),g=c(j,a),k?j.parentNode.removeChild(j):(n.parentNode.removeChild(n),l.style.overflow=i),!!g},u={}.hasOwnProperty;h=e(u,"undefined")||e(u.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return u.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=s.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(s.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(s.call(arguments)))};return d}),q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.webgl=function(){return!!a.WebGLRenderingContext},q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",p.join("touch-enabled),("),m,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c};for(var v in q)h(q,v)&&(g=v.toLowerCase(),j[g]=q[v](),r.push((j[g]?"":"no-")+g));return j.addTest=function(a,b){if("object"==typeof a)for(var d in a)h(a,d)&&j.addTest(d,a[d]);else{if(a=a.toLowerCase(),j[a]!==c)return j;b="function"==typeof b?b():b,"undefined"!=typeof k&&k&&(l.className+=" "+(b?"":"no-")+a),j[a]=b}return j},d(""),n=f=null,j._version=i,j._prefixes=p,j.testStyles=t,l.className=l.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(k?" js "+r.join(" "):""),j}(this,this.document),Modernizr.addTest("devicemotion","DeviceMotionEvent"in window),Modernizr.addTest("deviceorientation","DeviceOrientationEvent"in window),function(){Modernizr.addTest("ios",/iPad|iPhone|iPod/.test(window.navigator.userAgent)),Modernizr.addTest("android",/Android/i.test(window.navigator.userAgent)),Modernizr.addTest("winphone",/IEMobile/i.test(window.navigator.userAgent)),Modernizr.addTest("mobile",/iPad|iPhone|iPod|Android|IEMobile/.test(window.navigator.userAgent)),Modernizr.addTest("ff",/Firefox/.test(window.navigator.userAgent)),Modernizr.addTest("ie",/; MSIE/.test(window.navigator.userAgent)),Modernizr.addTest("chrome",/\bChrome\b/.test(window.navigator.userAgent)),Modernizr.addTest("safari",/\bSafari\b/.test(window.navigator.userAgent)&&!/\bChrome\b/.test(window.navigator.userAgent))}(),angular.module("depthyApp",["ngSanitize","ga","visibleClass"]),angular.module("depthyApp").controller("MainCtrl",["$scope","ga",function(a,b){function c(b){a.$watch(b+"Source",function(c){if(a[b+"Size"]=null,c){var d=new Image;d.onload=function(){a[b+"Size"]={width:d.width,height:d.height},d.onload=null,d.src="",a.$apply()},d.src=c}})}var d=this;a.Modernizr=window.Modernizr,this.handleCompoundFile=function(c){var e=function(c){a.imageSource=!1,a.depthSource=!1,a.metadata={},a.compoundError=c,b("send","event","image","error",c)};if("image/jpeg"!==c.type)return void e("Only JPEGs are supported!");var f=new FileReader;f.onload=function(b){a.compoundError="";try{var c=d.parseCompoundImage(b.target.result);a.imageSource=c.imageUri,a.depthSource=c.depthUri,delete c.imageData,delete c.depthData,delete c.imageUri,delete c.depthUri,a.metaData=c}catch(b){e(b)}a.$apply()},f.readAsBinaryString(c);var g=new FileReader;g.onload=function(b){a.compoundSource=b.target.result,a.$apply()},g.readAsDataURL(c)},this.parseCompoundImage=function(a){var c=(a.match(/xmpNote:HasExtendedXMP="(.+?)"/i)||[])[1];c&&(a=a.replace(new RegExp("[\\s\\S]{4}http:\\/\\/ns\\.adobe\\.com\\/xmp\\/extension\\/[\\s\\S]"+c+"[\\s\\S]{8}","g"),""));var d=a.match(/<x:xmpmeta [\s\S]+?<\/x:xmpmeta>/g),e={};if(!d)throw"No XMP metadata found! Did you make this photo using Google Camera?";if(d=d.join("\n",d),e.imageMime=(d.match(/GImage:Mime="(.+?)"/i)||[])[1],e.imageData=(d.match(/GImage:Data="(.+?)"/i)||[])[1],e.depthMime=(d.match(/GDepth:Mime="(.+?)"/i)||[])[1],e.depthData=(d.match(/GDepth:Data="(.+?)"/i)||[])[1],e.imageMime&&e.imageData&&(e.imageUri="data:"+e.imageMime+";base64,"+e.imageData),e.depthMime&&e.depthData&&(e.depthUri="data:"+e.depthMime+";base64,"+e.depthData),!e.depthUri)throw"No depth map found! Did you make this photo using Lens Blur mode?";return e.focalDistance=(d.match(/GFocus:FocalDistance="(.+?)"/i)||[])[1],b("send","event","image","parsed"),e},a.$watch("compoundFiles",function(a){a&&a.length&&d.handleCompoundFile(a[0])}),c("compound"),c("image"),c("depth")}]),angular.module("depthyApp").directive("fileselect",["$parse",function(a){return{restrict:"A",scope:!0,link:function(b,c,d){function e(c){b.$broadcast("fileselect",c),console.log(d.fileselect),d.fileselect&&a(d.fileselect).assign(b,c)}var f=document.createElement("input");f.type="file";var g=function(a){a.stopPropagation(),a.preventDefault()},h=function(a){a.stopPropagation(),a.preventDefault(),console.log(a);var c=a.originalEvent.dataTransfer;console.log(c);var d=c.files;console.log(d),e(d),b.$apply()};b.selectFile=function(a){f.click(),a&&a.preventDefault()},c.on("dragenter",g),c.on("dragover",g),c.on("drop",h),f.addEventListener("change",function(){e(this.files),b.$apply()},!1)}}}]),angular.module("depthyApp").directive("pixi",["$parse","$window",function(a){return{template:"<canvas></canvas>",restrict:"A",scope:!0,link:function(b,c,d){function e(){var a;i&&(a=i(h,j)),requestAnimFrame(e),a!==!1&&j.render(h)}var f=b.$parent,g=a(d.pixi),h=g(f),i=f.$eval(d.pixiAnimate);h||(h=new PIXI.Stage(f.$eval(d.pixiBackground||"0")),g.assign(f,h));var j,k=f.$eval(d.pixiAntialias||"false"),l=f.$eval(d.pixiTransparent||"false"),m=f.$eval(d.pixiRenderer||"auto");switch(m){case"canvas":j=new PIXI.CanvasRenderer(c.width(),c.height(),c[0],l);break;case"webgl":j=new PIXI.WebGLRenderer(c.width(),c.height(),c[0],l,k);break;default:j=PIXI.autoDetectRenderer(c.width(),c.height(),c[0],k,l)}requestAnimFrame(e)}}}]),angular.module("depthyApp").controller("ViewerCtrl",["$scope","$element","$window",function(a,b,c){function d(d,e){var f,g,h,i;a.$watch("[viewerVisible, compoundSource, imageSource, depthSource, viewCompound, compoundSize, imageSize, depthSize, dirty]",function(){if(console.log("Image change",a.imageSize,a.depthSize,a.compoundSize),a.viewerVisible&&a.imageSource&&a.depthSource&&a.imageSize&&a.depthSize&&a.compoundSize){var b=a.compoundSize,j=b.width/b.height,k={width:b.width,height:b.height};k.height>.8*$(c).height()&&(k.height=Math.round(.8*$(c).height()),k.width=k.height*j),k.width>.8*$(c).width()&&(k.width=Math.round(.8*$(c).width()),k.height=k.width/j);var l=k.width/b.width;e.resize(k.width,k.height),h&&d.removeChild(h),f=PIXI.Texture.fromImage(a.viewCompound?a.compoundSource:a.imageSource),g=PIXI.Texture.fromImage(a.depthSource),h=new PIXI.Sprite(f),console.log(f.width,f.baseTexture.width);var m=new PIXI.BlurFilter;m.blur=10,i=new PIXI.DepthmapFilter(g),h.filters=[i],h.scale=new PIXI.Point(l,l),d.addChild(h),a.update=!0}},!0),b.on("mousemove",function(c){var d=b.offset(),e=b.width(),f=b.height(),g=(c.pageX-d.left)/e,h=(c.pageY-d.top)/f;g=.1*(2*g-1),h=.1*(2*h-1),i&&(i.offset={x:g,y:h},a.update=!0)}),$(c).on("resize",function(){a.dirty++,a.$apply()})}a.stage=null,a.viewCompound=!0,a.dirty=0,a.update=!0;var e=!1;a.pixiAnimate=function(b,c){return e?a.update?void(a.update=!1):!1:(d(b,c),e=!0,void a.$apply())}}]),PIXI.DepthmapFilter=function(a){PIXI.AbstractFilter.call(this),this.passes=[this],this.uniforms={displacementMap:{type:"sampler2D",value:a},scale:{type:"2f",value:{x:.15,y:.15}},offset:{type:"2f",value:{x:0,y:0}},mapDimensions:{type:"2f",value:{x:1,y:5112}},dimensions:{type:"4fv",value:[0,0,0,0]}},a.baseTexture.hasLoaded?(this.uniforms.mapDimensions.value.x=a.width,this.uniforms.mapDimensions.value.y=a.height):(this.boundLoadedFunction=this.onTextureLoaded.bind(this),a.baseTexture.on("loaded",this.boundLoadedFunction)),this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D displacementMap;","uniform sampler2D uSampler;","uniform vec2 scale;","uniform vec2 offset;","uniform vec4 dimensions;","uniform vec2 mapDimensions;","void main(void) {","   vec2 mapCords = vTextureCoord;","   mapCords.y *= -1.0;","   mapCords.y += 1.0;","   float map = texture2D(displacementMap, mapCords).r;","   map = map * -1.0 + 0.5;","   vec2 disCords = vTextureCoord;","   disCords += offset * vec2(1.0, -1.0) * map * scale;","   gl_FragColor = texture2D(uSampler, disCords) * vColor;","}"]},PIXI.DepthmapFilter.prototype=Object.create(PIXI.AbstractFilter.prototype),PIXI.DepthmapFilter.prototype.constructor=PIXI.DepthmapFilter,PIXI.DepthmapFilter.prototype.onTextureLoaded=function(){this.uniforms.mapDimensions.value.x=this.uniforms.displacementMap.value.width,this.uniforms.mapDimensions.value.y=this.uniforms.displacementMap.value.height,this.uniforms.displacementMap.value.baseTexture.off("loaded",this.boundLoadedFunction)},Object.defineProperty(PIXI.DepthmapFilter.prototype,"map",{get:function(){return this.uniforms.displacementMap.value},set:function(a){this.uniforms.displacementMap.value=a}}),Object.defineProperty(PIXI.DepthmapFilter.prototype,"scale",{get:function(){return this.uniforms.scale.value},set:function(a){this.uniforms.scale.value=a}}),Object.defineProperty(PIXI.DepthmapFilter.prototype,"offset",{get:function(){return this.uniforms.offset.value},set:function(a){this.uniforms.offset.value=a}}),angular.module("visibleClass",[]).factory("VisibleClassService",["$window",function(a){function b(){var b,d,e=$(a),f=0,g=e.height(),h=f+g;_.each(c,function(a){b=a.el[0].getBoundingClientRect(),d=b.top<h&&b.bottom>f,a.v!==d&&(d?(a.cls&&a.el.addClass(a.cls),a.eval&&a.eval(d),a.v=d):a.sticky||(a.cls&&a.el.removeClass(a.cls),a.eval&&a.eval(d),a.v=d))})}var c=[];$(a).on("scroll",function(){b()});var d={addTarget:function(a){c.push(a)},doUpdate:b,update:_.throttle(b,25)};return d}]).directive("visibleClass",["VisibleClassService",function(a){return{restrict:"A",link:function(b,c,d){a.addTarget({el:c,cls:d.visibleClass})}}}]).directive("shownClass",["VisibleClassService",function(a){return{restrict:"A",link:function(b,c,d){a.addTarget({el:c,cls:d.shownClass,sticky:!0})}}}]).directive("shownEval",["VisibleClassService",function(a){return{restrict:"A",link:function(b,c,d){var e=d.shownEval;a.addTarget({el:c,eval:function(a){b.$eval(e,{$visible:a}),b.$apply()},sticky:!0})}}}]);