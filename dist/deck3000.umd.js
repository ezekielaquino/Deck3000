!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Deck3000=e()}(this,function(){"use strict";var t,e=(t=t||Object.create(null),{on:function(e,i){(t[e]||(t[e]=[])).push(i)},off:function(e,i){t[e]&&t[e].splice(t[e].indexOf(i)>>>0,1)},emit:function(e,i){(t[e]||[]).slice().map(function(t){t(i)}),(t["*"]||[]).slice().map(function(t){t(e,i)})}}),i=function(t,e){var i;t.index===e.current?i="current":t.index===e.next?i="next":t.index===e.prev?i="prev":t.index>e.current?i="next":t.index<e.current&&(i="prev"),function(t){var e=t.target,i=t.targetClass,n=t.initialClasses,s=t.classNames,r=t.reset,a="next"===t.direction?"is-next":"is-prev";(c=e.classList).add.apply(c,s);var c,o=Array.from(e.classList).filter(function(t){if(t===i||s.includes(t)||n.includes(t))return t});(s.includes(a)||r)&&o.push("is-instant"),e.classList=o.join(" ")}({target:t.element,targetClass:t.className,initialClasses:t.initialClasses,classNames:["is-"+i],direction:e.direction,reset:e.reset})},n=function(t){void 0===t&&(t={}),Object.assign(this,t),this.sectionIndex=t.parentSection.index,this.className=this.parentSection.className+"-slide",this.init()};n.prototype.init=function(){var t=this;if(this.initialClasses=Array.from(this.element.classList),this.element.classList.add(this.className),0===this.parentSection.state.slideLength)return this.element.classList.add("is-current");e.on("navigateSlide",function(e){return t._onNavigate(e)})},n.prototype._onNavigate=function(t){var e=t.direction,n=this.parentSection.state;this.sectionIndex!==t.current&&e||i(this,{current:n.currentSlide,direction:e,next:n.next,prev:n.prev,reset:t.reset})};var s=function(t){void 0===t&&(t={}),Object.assign(this,t),this.className=this.slideshow.baseSelector+"__section",this.state={currentSlide:0},this.init()};s.prototype.init=function(){var t=this;this.initialClasses=Array.from(this.element.classList),this.element.classList.add(this.className),this._initSlides(),this.state.next=this.slides.length&&1,this.state.prev=this.slides.length&&this.slides.length-1,e.on("navigate",function(e){return t._onNavigate(e)})},s.prototype.getCurrentSlide=function(){return this.slides[this.state.currentSlide].element},s.prototype._initSlides=function(){var t=this,e=Array.from(this.slideSelector?this.element.querySelectorAll(this.slideSelector):this.element.children);if(2===e.length){var i=e[0].cloneNode(!0);this.element.appendChild(i),e.push(i)}this.state.slideLength=e.length-1;var s=Array.from(e).map(function(e,i){return new n({parentSection:t,element:e,index:i})});this.slides=s},s.prototype._onNavigate=function(t){i(this,t)};var r=function(t){var e=t.state,i=t.currentKey,n=t.direction,s=t.currentIndex,r=t.length;if(Number.isInteger(n))e[i]=n;else switch(e.direction=n,n){case"next":s!==r?e[i]+=1:e[i]=0;break;case"prev":0!==s?e[i]-=1:e[i]=r}e.next=e[i]===r?0:e[i]+1,e.prev=0===e[i]?r:e[i]-1},a=function(t,e){e.currentTime=(new Date).getTime();var i=(t=window.event||t||t.originalEvent).wheelData||-t.deltaY||-t.detail,n=Math.max(-1,Math.min(1,i));e.scrolls.length>=100&&e.scrolls.shift(),e.scrolls.push(Math.abs(i));var s=e.currentTime-e.prevTime;e.prevTime=e.currentTime,s>50&&(e.scrolls=[]);var r=function(t){var i=Math.max(e.scrolls.length-t,1);return e.scrolls.slice(i).reduce(function(t,e){return t+e},0)/t};e.state.isAnimating||r(10)>=r(70)&&s>=50&&e.navigate("section",n<0?"next":"prev")},c=function(t){return void 0===t&&(t=""),t.split(" ").join("-").toLowerCase()},o=function(t){Object.assign(this,t),this.baseSelector="js-deck3000",this.element=document.querySelector("."+this.baseSelector),this.emitter=e,this.state={current:0,next:1},this.init()};return o.prototype.init=function(){var t=this,i=this.state.current,n=Array.from(this.element.children).map(function(e,i,n){var a=window.location.pathname.split("/")[1];return t.state.sectionLength=n.length-1,a!==c(e.dataset.title)&&a!==i.toString()||r({state:t.state,currentKey:"current",currentIndex:i,length:t.state.sectionLength,direction:i}),new s({slideshow:t,slideSelector:t.slideSelector,element:e,index:i})});this.sections=n,e.emit("navigate",this.state),e.emit("navigateSlide",{current:i}),setTimeout(function(){t.element.classList.add("is-init"),t._attachEventHandlers(),t.transitionDuration=1e3*parseFloat(getComputedStyle(t.sections[0].element).transitionDuration)},0)},o.prototype._attachEventHandlers=function(){var t,e,i,n,s,r=this;this.scrolls=[],this.prevTime=(new Date).getTime(),this.element.addEventListener("mousewheel",function(t){a(t,r)}),this.element.addEventListener("DOMMouseScroll",function(t){a(t,r)}),t=this,e=0,i=0,n=0,s=0,("ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints)&&(t.element.addEventListener("touchstart",function(t){e=t.changedTouches[0].screenX,i=t.changedTouches[0].screenY},!1),t.element.addEventListener("touchend",function(r){n=r.changedTouches[0].screenX,s=r.changedTouches[0].screenY;var a=Math.abs(n-e)>=100,c=Math.abs(s-i)>=100;return n<=e&&a?t.navigate("slide","next"):n>=e&&a?t.navigate("slide","prev"):s>=i&&c?t.navigate("section","prev"):s<=i&&c?t.navigate("section","next"):void 0},!1)),this.keyboardEvents&&window.addEventListener("keyup",function(t){if(!r.state.isAnimating)switch(t.keyCode){case 38:r.navigate("section","prev");break;case 40:r.navigate("section","next");break;case 37:r.navigate("slide","prev");break;case 39:r.navigate("slide","next")}})},o.prototype.disableEvents=function(t){this.noEvents=t},o.prototype.navigate=function(t,i,n,s){if(void 0===n&&(n=!0),!this.noEvents&&!this.state.isAnimating){var a=this.state,c=a.current,o=a.sectionLength,l=this.sections[c],h="section"===t;if(this.state.direction=i,"section"===t&&(r({state:this.state,currentKey:"current",currentIndex:c,length:o,direction:i}),e.emit("navigate",this.state)),"slide"===t){if(0===l.state.slideLength)return;var d=l.state;r({state:l.state,currentKey:"currentSlide",currentIndex:d.currentSlide,length:d.slideLength,direction:i}),e.emit("navigateSlide",{current:c,direction:i,reset:s})}this.resetSlides&&h&&this.navigate("slide",0,!1,!0),n&&this.callback(t)}},o.prototype.callback=function(t){var e=this,i=this.sections[this.state.current],n=i.element.dataset.title,s={section:this.state,slide:i.state,currentSectionElem:i.element,currentSlideElem:i.getCurrentSlide()},r="section"===t,a=r?this.onSectionStart:this.onSlideStart,o=r?this.onSectionEnd:this.onSlideEnd;this.state.isAnimating=!0,clearTimeout(this.timeout),this.timeout=setTimeout(function(){var t,i,s;e.state.isAnimating=!1,t=e.state,s=c(((i=n)||t.current).toString()),history.replaceState(t,i,s)},this.transitionDuration),a&&a(s),o&&o(s)},o});
//# sourceMappingURL=deck3000.umd.js.map
