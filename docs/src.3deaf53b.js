parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({6:[function(require,module,exports) {
"use strict";var t,e=(t=t||Object.create(null),{on:function(e,i){(t[e]||(t[e]=[])).push(i)},off:function(e,i){t[e]&&t[e].splice(t[e].indexOf(i)>>>0,1)},emit:function(e,i){(t[e]||[]).slice().map(function(t){t(i)}),(t["*"]||[]).slice().map(function(t){t(e,i)})}}),i=function(t,e){var i;t.index===e.current?i="current":t.index===e.next?i="next":t.index===e.prev?i="prev":t.index>e.current?i="next":t.index<e.current&&(i="prev"),function(t){var e=t.target,i=t.targetClass,n=t.initialClasses,s=t.classNames,a=t.reset,r="next"===t.direction?"is-next":"is-prev";(o=e.classList).add.apply(o,s);var o,c=Array.from(e.classList).filter(function(t){if(t===i||s.includes(t)||n.includes(t))return t});(s.includes(r)||a)&&c.push("is-instant"),e.classList=c.join(" ")}({target:t.element,targetClass:t.className,initialClasses:t.initialClasses,classNames:["is-"+i],direction:e.direction,reset:e.reset})},n=function(t){void 0===t&&(t={}),Object.assign(this,t),this.sectionIndex=t.parentSection.index,this.className=this.parentSection.className+"-slide",this.init()};n.prototype.init=function(){var t=this;if(this.initialClasses=Array.from(this.element.classList),this.element.classList.add(this.className),0===this.parentSection.state.slideLength)return this.element.classList.add("is-current");e.on("navigateSlide",function(e){return t._onNavigate(e)})},n.prototype._onNavigate=function(t){var e=t.direction,n=this.parentSection.state;this.sectionIndex!==t.current&&e||i(this,{current:n.currentSlide,direction:e,next:n.next,prev:n.prev,reset:t.reset})};var s=function(t){void 0===t&&(t={}),Object.assign(this,t),this.className=this.slideshow.baseSelector+"__section",this.state={currentSlide:0},this.init()};s.prototype.init=function(){var t=this;this.initialClasses=Array.from(this.element.classList),this.element.classList.add(this.className),this._initSlides(),this.state.next=this.slides.length&&1,this.state.prev=this.slides.length&&this.slides.length-1,e.on("navigate",function(e){return t._onNavigate(e)})},s.prototype.getCurrentSlide=function(){return this.slides[this.state.currentSlide].element},s.prototype._initSlides=function(){var t=this,e=Array.from(this.slideSelector?this.element.querySelectorAll(this.slideSelector):this.element.children);if(2===e.length){var i=e[0].cloneNode(!0);this.element.appendChild(i),e.push(i)}this.state.slideLength=e.length-1;var s=Array.from(e).map(function(e,i){return new n({parentSection:t,element:e,index:i})});this.slides=s},s.prototype._onNavigate=function(t){i(this,t)};var a=function(t){var e=t.state,i=t.currentKey,n=t.direction,s=t.currentIndex,a=t.length;if(Number.isInteger(n))e[i]=n;else switch(e.direction=n,n){case"next":s!==a?e[i]+=1:e[i]=0;break;case"prev":0!==s?e[i]-=1:e[i]=a}e.next=e[i]===a?0:e[i]+1,e.prev=0===e[i]?a:e[i]-1},r=function(t,e){t.preventDefault(),t.stopPropagation(),e.currentTime=(new Date).getTime();var i=e.currentTime-(e.prevTime||0),n=Math.sign(t.deltaY)>0?"next":"prev",s=Math.sign(t.deltaX)>0?"next":"prev";if(e.prevTime=e.currentTime,!e.state.isAnimating&&i>40){var a=Math.abs(t.deltaY)&&Math.abs(t.deltaX)<=1,r=Math.abs(t.deltaX)&&Math.abs(t.deltaY)<=1;if(a)return e.navigate("section",n);if(r)return e.navigate("slide",s)}},o=function(t){return void 0===t&&(t=""),t.split(" ").join("-").toLowerCase()},c=function(t){Object.assign(this,t),this.baseSelector="js-deck3000",this.element=document.querySelector("."+this.baseSelector),this.emitter=e,this.state={current:0,next:1},this.init()};c.prototype.init=function(){var t=this,i=this.state.current,n=Array.from(this.element.children).map(function(e,i,n){var r=window.location.pathname.split("/")[1];return t.state.sectionLength=t.state.prev=n.length-1,t.updateURL&&r&&(r!==o(e.dataset.title)&&r!==i.toString()||a({state:t.state,currentKey:"current",currentIndex:i,length:t.state.sectionLength,direction:i})),new s({slideshow:t,slideSelector:t.slideSelector,element:e,index:i})});this.sections=n,e.emit("navigate",this.state),e.emit("navigateSlide",{current:i}),setTimeout(function(){t.element.classList.add("is-init"),t.transitionDuration=1e3*parseFloat(getComputedStyle(t.sections[0].element).transitionDuration),t._attachEventHandlers()},0)},c.prototype._attachEventHandlers=function(){var t,e,i,n,s,a=this;this.scrolls=[],this.prevTime=(new Date).getTime(),this.element.addEventListener("mousewheel",function(t){r(t,a)}),this.element.addEventListener("DOMMouseScroll",function(t){r(t,a)}),t=this,e=0,i=0,n=0,s=0,("ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints)&&(t.element.addEventListener("touchstart",function(t){e=t.changedTouches[0].screenX,i=t.changedTouches[0].screenY},!1),t.element.addEventListener("touchend",function(a){n=a.changedTouches[0].screenX,s=a.changedTouches[0].screenY;var r=Math.abs(n-e)>=100,o=Math.abs(s-i)>=100;return n<=e&&r?t.navigate("slide","next"):n>=e&&r?t.navigate("slide","prev"):s>=i&&o?t.navigate("section","prev"):s<=i&&o?t.navigate("section","next"):void 0},!1)),this.keyboardEvents&&window.addEventListener("keyup",function(t){if(!a.state.isAnimating)switch(t.keyCode){case 38:a.navigate("section","prev");break;case 40:a.navigate("section","next");break;case 37:a.navigate("slide","prev");break;case 39:a.navigate("slide","next")}})},c.prototype.disableEvents=function(t){this.noEvents=t},c.prototype.navigate=function(t,i,n,s){var r=this;if(void 0===n&&(n=!0),!this.noEvents&&!this.state.isAnimating){this.state.isAnimating=!0;var o=this.state,c=o.current,l=o.sectionLength,h=this.sections[c],d="section"===t;if(this.state.direction=i,"section"===t&&(a({state:this.state,currentKey:"current",currentIndex:c,length:l,direction:i}),e.emit("navigate",this.state)),"slide"===t){if(0===h.state.slideLength)return;var u=h.state;a({state:h.state,currentKey:"currentSlide",currentIndex:u.currentSlide,length:u.slideLength,direction:i}),e.emit("navigateSlide",{current:c,direction:i,reset:s})}this.resetSlides?(d&&this.navigate("slide",0,!1,!0),this.state.isAnimating=!1):h.element.addEventListener("transitionend",function(t){return r._onTransitionEnd(t)}),n&&this.callback(t)}},c.prototype.callback=function(t){var e=this.sections[this.state.current],i={section:this.state,slide:e.state,currentSectionElem:e.element,currentSlideElem:e.getCurrentSlide()},n="section"===t,s=n?this.onSectionStart:this.onSlideStart,a=n?this.onSectionEnd:this.onSlideEnd;s&&s(i),a&&a(i)},c.prototype._onTransitionEnd=function(t){var e,i,n,s=t.target.dataset.title;this.state.isAnimating=!1,this.updateURL&&(e=this.state,n=o(((i=s)||e.current).toString()),history.replaceState(e,i,n)),t.target.removeEventListener("transitionend",this._onTransitionEnd)},module.exports=c;
},{}],3:[function(require,module,exports) {
"use strict";var e=require("../../dist/deck3000"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}var d=new t.default({resetSlides:!0,keyboardEvents:!0,updateURL:!0});
},{"../../dist/deck3000":6}]},{},[3], null)