!function(){function e(){r.classList.add("down"),a=!1}function t(){r.classList.remove("down"),a=!0}function n(){a?e():t()}var r=document.querySelector(".js-vdp-sidebar-notifications-pricedrop"),o=document.querySelector(".js-vdp-sidebar-notifications-pricedrop-link"),i=2e3,a=!0;o.addEventListener("click",function(e){e.preventDefault(),n()}),setTimeout(function(){n()},i)}(),function(){function e(e){A&&(b=g.offsetLeft+_gutter,f.style.transform="translate3d("+b+"px,0,0)"),S&&(p.style.width=g.offsetLeft+_gutter+"px")}function t(e){e.preventDefault(),c.animate({scrollLeft:"-=500"},L)}function n(e){e.preventDefault(),c.animate({scrollLeft:"+=500"},L)}function r(e){return e.preventDefault(),h<e.pageX?E="right":h>e.pageX&&(E="left"),h=e.pageX,E}function o(e){if(e.preventDefault(),q===!0)if(S)console.log("simple solution used");else{var t=(0|f.getAttribute("total-distance-right"),0|f.getAttribute("total-distance-left"),w-e.pageX),n=0|f.getAttribute("alreadymovedright"),o=0|f.getAttribute("alreadymovedleft");if(f.setAttribute("origin",w),f.setAttribute("current",e.pageX),f.setAttribute("distancemoving",Math.abs(t)),"right"===r(e)){var i=o+t;f.setAttribute("alreadymovedright",i),f.setAttribute("alreadymovedleft",0)}if("left"===r(e)){var a=n+t;f.setAttribute("alreadymovedleft",a),f.setAttribute("alreadymovedright",0)}}}function t(e,t){e.scrollLeft=t}function i(e){e.preventDefault(),w=e.pageX,j=f.scrollLeft,q=!0}function a(e){q=!1}function s(e){q=!1}function u(){f.scrollLeft<y&&(v.style.opacity=d(f.scrollLeft,0,y,0,1))}function d(e,t,n,r,o){var i=t,a=n,s=a-i,u=e,d=0,l=1,c=l-d,f=(u-i)*c/s+d;return f}var l=".js-vdp-carousel",c=$(l),f=document.querySelector(l),v=document.querySelector(".js-control-left"),m=document.querySelector(".js-control-right"),p=document.querySelector(".js-hero"),g=document.querySelector(".js-vdp-body-container"),L=500,y=400,b=0,A=!1;_gutter=15;var h=0,E="",w=0,j=0,q=!1,S=!0;window.addEventListener("load",e),window.addEventListener("resize",e),f.addEventListener("scroll",u),f.addEventListener("mousemove",o),f.addEventListener("mousedown",i),f.addEventListener("mouseup",a),f.addEventListener("mouseleave",s),v.addEventListener("click",t),m.addEventListener("click",n)}();