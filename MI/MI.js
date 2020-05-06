// =================购物车加载效果=================
var oCart = document.querySelector(".cart");
var oCartDropDown = document.querySelector(".shop-dropdown");
var oCartLoad = document.getElementById("loading-container");
var oCartSpan = document.querySelector(".cart span");
oCart.onmouseover = function () {
    setTimeout(function () {
        oCartLoad.style.display = "none";
        oCartSpan.style.display = "block";
    }, 500)
}
oCart.onmouseout = function () {
    setTimeout(function () {
        oCartLoad.style.display = "flex";
        oCartSpan.style.display = "none";
    }, 500)
}
//=================导航条产品下拉列表=================
var oNavbarList = document.querySelector(".navbar-list");
var aNavbarProduct = document.querySelectorAll(".navbar-product");
var aProductList = document.querySelectorAll(".navbar-product-list")
var oContainer = document.querySelector(".product-content");
var aContainerItem = document.querySelectorAll(".nav-product-container");
var NavbarProductlen = aNavbarProduct.length;
var x = 0;
for (var i = 0; i < NavbarProductlen; i++) {
    aNavbarProduct[i].index = i;
    aNavbarProduct[i].onmouseover = function () {
        oContainer.classList.add("active")
        aProductList[this.index].style.display = "block"
        aContainerItem[this.index].style.display = "flex"
    }
    aNavbarProduct[i].onmouseout = function () {
        oContainer.classList.remove("active")
        aProductList[this.index].style.display = "none"
        aContainerItem[this.index].style.display = "none"
    }
}
//=================banner轮播=================
var oImgList = document.querySelector(".bannerImg-list")
var aImgItems = document.querySelectorAll(".bannerImg-list>li");
var aPointList = document.querySelectorAll(".bannerImg-list>ul>li>a");
var oNext = document.querySelector(".next");
var oPrev = document.querySelector(".prev");
var Imglen = aImgItems.length;
var Pointlen = aPointList.length;
var iNow = 0;
var isGo = true;
aPointList[0].classList.add("show");
aImgItems[0].style.opacity = "1";
oNext.onclick = function () {
    if (isGo) {
        isGo = false;
        iNow++
        if (iNow > 4) {
            iNow = 0
        }
        clearInterval(timer);
        change()
        tab();
    }
}
oPrev.onclick = function () {
    if (isGo) {
        isGo = false;
        iNow--;
        if (iNow < 0) {
            iNow = 4;
        }
        clearInterval(timer);
        change()
        tab();
    }
}
oImgList.onmouseover = function () {
    clearInterval(timer);
}
oImgList.onmouseout = function () {
    clearInterval(timer)
    change();
}
function change() {//轮播
    timer = setInterval(function () {
        oNext.click();
    }, 6000)
}
change()
for (var i = 0; i < Pointlen; i++) {//指向点的点击事件
    aPointList[i].index = i;
    aPointList[i].onclick = function () {
        iNow = this.index;
        clearInterval(timer)
        change()
        tab();
    }
}
function tab() {//切换时做的事情
    for (var i = 0; i < Pointlen; i++) {
        aPointList[i].classList.remove("show")
        startMove(aImgItems[i], { opacity: 0 }, 100)
    }
    aPointList[iNow].classList.add("show")
    startMove(aImgItems[iNow], { opacity: 100 }, 100, function () {
        isGo = true;//运动完成后开启节流阀
    })
}
// ======================闪购倒计时======================
var oCountH = document.getElementById("h");
var oCountM = document.getElementById("m");
var oCountS = document.getElementById("s");
var oState = document.querySelector(".flash-state");
var flashSale = null;
function countDown() {
    flashSale = setInterval(function () {
        var nowTime = new Date();
        var endTime = new Date("2020/4/30/22:00:00");
        var leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000, 10);
        var h = addZero(parseInt(leftTime / 3600 % 24));
        var m = addZero(parseInt(leftTime / 60 % 60));
        var s = addZero(parseInt(leftTime % 60));
        oCountH.innerHTML = h;
        oCountM.innerHTML = m;
        oCountS.innerHTML = s;
        if (leftTime < 0) {
            clearInterval(flashSale)
            oCountH.innerHTML = "00";
            oCountM.innerHTML = "00";
            oCountS.innerHTML = "00";
            oState.innerHTML = "本场已结束"
        }
    }, 1000)
}
countDown();
function addZero(i) {
    return i < 10 ? "0" + i : i;
}
// ======================闪购轮播======================
var oFlashList = document.getElementById("listMove");
var oFlashPrev = document.querySelector(".flashsale-prev");
var oFlashNext = document.querySelector(".flashsale-next");
var isSlide = false;
oFlashPrev.classList.add("disables")//初始化样式
function monitorLeft(direction, offset) {// 判断偏移量
    if (oFlashList.style.left == offset + "px") {
        isSlide = false
        direction.classList.add("disables")
    } else {
        isSlide = true
    }
}
oFlashNext.onclick = function () {
    oFlashPrev.classList.remove("disables")
    monitorLeft(oFlashNext, -992 * 2)
    if (isSlide) {
        oFlashList.style.left = parseInt(oFlashList.style.left) - 992 + "px"
    }
    monitorLeft(oFlashNext, -992 * 2)
}
oFlashPrev.onclick = function () {
    oFlashNext.classList.remove("disables")
    monitorLeft(oFlashPrev, 0)
    console.log(isSlide)
    if (isSlide) {
        oFlashList.style.left = parseInt(oFlashList.style.left) + 992 + "px"
    }
    monitorLeft(oFlashPrev, 0)
}
// ====================视频弹出层========================
var oVideoList = document.querySelector(".video-list");
var aVideoItem = document.querySelectorAll(".video-list .video-item");
var oVideoMask = document.getElementById("videoMask");
var oVideoContainer = document.getElementById("videoContainer");
var oCloseVideo = document.getElementById("closeVideo");
var oVideo = document.getElementById("video");
var videoItemlen = aVideoItem.length;
for (var i = 0; i < videoItemlen; i++) {
    aVideoItem[i].onclick = function () {
        oVideo.play();
        oVideoMask.style.display = "flex";
        oVideoContainer.style.display = "flex";
    }
}
oCloseVideo.onclick = function () {
    oVideoMask.style.display = "none";
    oVideoContainer.style.display = "none";
    oVideo.pause();
    oVideo.currentTime = 0;
}
// =====================侧边工具栏=======================
var oBacktop = document.querySelector(".backtop");
var oToolbar = document.querySelector(".tool-bar-container");
var aToolbarText = document.querySelectorAll(".toolbarText");
var oDownloadAppQR = document.querySelector(".downloadApp-QR")
var iToolbarTextlen = aToolbarText.length;
document.onscroll = function () {
    var iWindowHeight = document.documentElement.clientHeight;
    var iScrollTop = document.documentElement.scrollTop;
    if (iScrollTop > iWindowHeight) {
        oBacktop.style.display = "flex";
    }else{
        oBacktop.style.display = "none";
    }
}
window.onresize = function(){
    var iWindowWidth = document.documentElement.clientWidth;
    console.log(iWindowWidth)
    if(iWindowWidth <= 1457 && iWindowWidth >1270){
        oToolbar.classList.add("tool-bar-small");
        oDownloadAppQR.classList.add("big-downloadApp-QR")
        oToolbar.classList.remove("tool-bar-smaller");
        for (var i = 0; i < iToolbarTextlen; i++) {
            aToolbarText[i].classList.add("textHide")
        }
    }else if(iWindowWidth <= 1270){
        oToolbar.classList.remove("tool-bar-small");
        oToolbar.classList.add("tool-bar-smaller");
        oDownloadAppQR.classList.add("big-downloadApp-QR")
        for (var i = 0; i < iToolbarTextlen; i++) {
            aToolbarText[i].classList.add("textHide")
        }
    }else{
        oToolbar.classList.remove("tool-bar-small");
        for (var i = 0; i < iToolbarTextlen; i++) {
            aToolbarText[i].classList.remove("textHide")
        }
        oToolbar.classList.remove("tool-bar-smaller");
        oDownloadAppQR.classList.remove("big-downloadApp-QR")
    }
}
window.onresize();
oBacktop.onclick=function(){
    document.body.scrollIntoView({ behavior: 'smooth' })
}



