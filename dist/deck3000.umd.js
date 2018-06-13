!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Deck3000=e()}(this,function(){"use strict";var t,e=(t=t||Object.create(null),{on:function(e,i){(t[e]||(t[e]=[])).push(i)},off:function(e,i){t[e]&&t[e].splice(t[e].indexOf(i)>>>0,1)},emit:function(e,i){(t[e]||[]).slice().map(function(t){t(i)}),(t["*"]||[]).slice().map(function(t){t(e,i)})}}),i=function(t,e){var i;t.index===e.current?i="current":t.index===e.next?i="next":t.index===e.prev?i="prev":t.index>e.current?i="next":t.index<e.current&&(i="prev"),function(t){var e=t.target,i=t.targetClass,n=t.initialClasses,s=t.classNames,a=t.reset,r="next"===t.direction?"is-next":"is-prev";(o=e.classList).add.apply(o,s);var o,c=Array.from(e.classList).filter(function(t){if(t===i||s.includes(t)||n.includes(t))return t});(s.includes(r)||a)&&c.push("is-instant"),e.classList=c.join(" ")}({target:t.element,targetClass:t.className,initialClasses:t.initialClasses,classNames:["is-"+i],direction:e.direction,reset:e.reset})},n=function(t){void 0===t&&(t={}),Object.assign(this,t),this.sectionIndex=t.parentSection.index,this.className=this.parentSection.className+"-slide",this.init()};n.prototype.init=function(){var t=this;if(this.initialClasses=Array.from(this.element.classList),this.element.classList.add(this.className),0===this.parentSection.state.slideLength)return this.element.classList.add("is-current");e.on("navigateSlide",function(e){return t._onNavigate(e)})},n.prototype._onNavigate=function(t){var e=t.direction,n=this.parentSection.state;this.sectionIndex!==t.current&&e||i(this,{current:n.currentSlide,direction:e,next:n.next,prev:n.prev,reset:t.reset})};var s=function(t){void 0===t&&(t={}),Object.assign(this,t),this.className=this.slideshow.baseSelector+"__section",this.state={currentSlide:0},this.init()};s.prototype.init=function(){var t=this;this.initialClasses=Array.from(this.element.classList),this.element.classList.add(this.className),this._initSlides(),this.state.next=this.slides.length&&1,this.state.prev=this.slides.length&&this.slides.length-1,e.on("navigate",function(e){return t._onNavigate(e)})},s.prototype.getCurrentSlide=function(){return this.slides[this.state.currentSlide].element},s.prototype._initSlides=function(){var t=this,e=Array.from(this.slideSelector?this.element.querySelectorAll(this.slideSelector):this.element.children);if(2===e.length){var i=e[0].cloneNode(!0);this.element.appendChild(i),e.push(i)}this.state.slideLength=e.length-1;var s=Array.from(e).map(function(e,i){return new n({parentSection:t,element:e,index:i})});this.slides=s},s.prototype._onNavigate=function(t){i(this,t)};var a=function(t){var e=t.state,i=t.currentKey,n=t.direction,s=t.currentIndex,a=t.length;if(Number.isInteger(n))e[i]=n;else switch(e.direction=n,n){case"next":s!==a?e[i]+=1:e[i]=0;break;case"prev":0!==s?e[i]-=1:e[i]=a}e.next=e[i]===a?0:e[i]+1,e.prev=0===e[i]?a:e[i]-1},r=function(t,e){t.preventDefault(),e.currentTime=(new Date).getTime();var i=e.currentTime-(e.prevTime||0),n=Math.sign(t.deltaY)>0?"next":"prev",s=Math.sign(t.deltaX)>0?"next":"prev";if(e.prevTime=e.currentTime,!e.state.isAnimating&&i>80){var a=Math.abs(t.deltaY)&&Math.abs(t.deltaX)<=1,r=Math.abs(t.deltaX)&&Math.abs(t.deltaY)<=1;if(a)return e.navigate("section",n);if(r)return e.navigate("slide",s)}},o=function(t){return void 0===t&&(t=""),t.split(" ").join("-").toLowerCase()},c=function(t){Object.assign(this,t),this.baseSelector="js-deck3000",this.element=document.querySelector("."+this.baseSelector),this.emitter=e,this.state={current:0,next:1},this.init(),this._onTransitionEnd=this._onTransitionEnd.bind(this)};return c.prototype.init=function(){var t=this,i=this.state.current,n=Array.from(this.element.children).map(function(e,i,n){var r=window.location.pathname.split("/")[1];return t.state.sectionLength=t.state.prev=n.length-1,t.updateURL&&r&&(r!==o(e.dataset.title)&&r!==i.toString()||a({state:t.state,currentKey:"current",currentIndex:i,length:t.state.sectionLength,direction:i})),new s({slideshow:t,slideSelector:t.slideSelector,element:e,index:i})});this.sections=n,e.emit("navigate",this.state),e.emit("navigateSlide",{current:i}),setTimeout(function(){t.element.classList.add("is-init"),t.transitionDuration=1e3*parseFloat(getComputedStyle(t.sections[0].element).transitionDuration),t._attachEventHandlers()},0)},c.prototype._attachEventHandlers=function(){var t,e,i,n,s,a=this;this.scrolls=[],this.prevTime=(new Date).getTime(),this.element.addEventListener("mousewheel",function(t){r(t,a)}),this.element.addEventListener("DOMMouseScroll",function(t){r(t,a)}),t=this,e=0,i=0,n=0,s=0,("ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints)&&(t.element.addEventListener("touchstart",function(t){e=t.changedTouches[0].screenX,i=t.changedTouches[0].screenY},!1),t.element.addEventListener("touchend",function(a){n=a.changedTouches[0].screenX,s=a.changedTouches[0].screenY;var r=Math.abs(n-e)>=100,o=Math.abs(s-i)>=100;return n<=e&&r?t.navigate("slide","next"):n>=e&&r?t.navigate("slide","prev"):s>=i&&o?t.navigate("section","prev"):s<=i&&o?t.navigate("section","next"):void 0},!1)),this.keyboardEvents&&window.addEventListener("keyup",function(t){if(!a.noEvents&&!a.state.isAnimating)switch(t.keyCode){case 38:a.navigate("section","prev");break;case 40:a.navigate("section","next");break;case 37:a.navigate("slide","prev");break;case 39:a.navigate("slide","next")}})},c.prototype.disableEvents=function(t){this.noEvents=t},c.prototype.navigate=function(t,i,n,s){var r=this;if(!this.noEvents&&!this.state.isAnimating){var c=this.state,l=c.current,d=c.sectionLength,h=this.sections[l],u=this.sections[c.prev],v=this.sections[c.next],m="section"===t,p=m?h.element:h.slides[h.state.currentSlide].element,f={section:this.state,slide:h.state,currentSectionElem:h.element,currentSlideElem:h.getCurrentSlide()},g=m?this.onSectionStart:this.onSlideStart,S=m?this.onSectionEnd:this.onSlideEnd;if(this.state.isAnimating=!n,this.state.direction=i,g&&g(f),m)a({state:this.state,currentKey:"current",currentIndex:l,length:d,direction:i}),this.updateURL&&function(t,e){var i=o((e||t.current).toString());history.replaceState(t,e,i)}(this.state,this.sections[l].element.dataset.title),e.emit("navigate",this.state);else{if(0===h.state.slideLength)return;var x=h;n&&(x="next"===s?u:v);var y=x.state;a({state:x.state,currentKey:"currentSlide",currentIndex:y.currentSlide,length:y.slideLength,direction:i}),e.emit("navigateSlide",{current:l,direction:i,reset:n})}n||(clearTimeout(this.timeout),this.timeout=setTimeout(function(){r._onTransitionEnd({element:p,onEnd:S,callbackState:f,isSection:m,direction:i})},this.transitionDuration))}},c.prototype._onTransitionEnd=function(t){var e=t.onEnd,i=t.callbackState,n=t.isSection,s=t.direction;this.state.isAnimating=!1,n&&this.resetSlides&&this.navigate("slide",0,!0,s),e&&t.onEnd(i)},c});
//# sourceMappingURL=deck3000.umd.js.map
