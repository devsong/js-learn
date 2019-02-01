// 自定义弹框浮层
// 初始计时器值
$(document).ready(function () {
    $('#btn').click(function (e) {
        customConfirm('testttttttt', 5, 2);
    });
});

var option = {
    title: '提示信息',
    body: '',
    okBtnMsg: '确认',
    okBtnCallback: function () {

    },
    cancelBtnMsg: '取消',
    cancelBtnCallback: function () {

    },
    // 初始计时
    initCountdown: 5,
    // 至少多少几秒
    atLastShow: 3,
    // 已经显示的秒数
    elapse: 0,
    width: '400 px',
    height: '300 px',
    flag: 0
}

function customConfirm(op) {
    option.flag = 0;
    initView(op);
    window.setTimeout(function () {
        updateTimerSpan();
    }, 1000);

}

function getAlertBgDiv(op) {
    var div = '<div id="alertBgDiv" class="alert-bg-div"></div>';
    return
}

function getAlertDiv(op) {
    var div = '<div id="alertMsgDiv" class="alert-msg-div"></div>';
    return div;
}

function getTitleDiv(op) {
    var title = '<div id="alertTitleDiv" class="alert-title-div">' + op.title + '</div>';
    return title;
}

function getBodyDiv(op) {
    var body = '<div id="alertBodyDiv" class="alert-body-div">' + op.body + '</div>';
    return body
}

function getOkBtnDiv(op) {
    option.okBtnMsg = op.okBtnMsg || option.okBtnMsg;
    option.okBtnCallback = op.okBtnCallback || option.okBtnCallback;
    var okBtn = document.createElement("button");
    okBtn.setAttribute('id', 'alertOkBtn');
    okBtn.setAttribute('class', 'alert-btn-div');
    okBtn.innerHTML = op.okBtnMsg;
    okBtn.onclick = option.okBtnCallback;

    okBtn.appendChild(getTimeSpan(op));
    return okBtn;
}

function getTimeSpan(op) {
    var span = document.createElement("span");
    option.initCountdown = op.initCountdown || op.initCountdown;
    span.setAttribute('id', 'spanTimer');
    span.innerHTML = option.initCountdown;
    return span;
}

function getCancelDiv(op) {
    option.cancelBtnMsg = op.cancelBtnMsg || option.cancelBtnMsg;
    option.cancelBtnCallback = op.cancelBtnCallback || option.cancelBtnCallback;
    var cancelBtn = document.createElement("button");
    cancelBtn.setAttribute('id', 'alertCancelBtn');
    cancelBtn.setAttribute('class', 'alert-btn-div');
    cancelBtn.innerHTML = op.okBtnMsg;
    cancelBtn.onclick = option.cancelBtnCallback;
}

function initView(op) {
    var msgw, msgh, bordercolor;
    msgw = 400; // 提示窗口的宽度
    msgh = 150; // 提示窗口的高度
    titleheight = 25 // 提示窗口标题高度
    bordercolor = "#336699"; // 提示窗口的边框颜色
    titlecolor = "#99CCFF"; // 提示窗口的标题颜色
    var sWidth, sHeight;
    // 获取当前窗口尺寸
    sWidth = document.body.offsetWidth;
    sHeight = document.body.offsetHeight;
    // 背景div

    document.body.appendChild(bgObj);
    // 创建提示窗口的div
    var msgObj = document.createElement("div")
    msgObj.setAttribute("id", "alertmsgDiv");
    msgObj.setAttribute("align", "center");
    msgObj.style.background = "white";
    msgObj.style.border = "1px solid " + bordercolor;
    msgObj.style.position = "absolute";
    msgObj.style.left = "50%";
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    // 窗口距离左侧和顶端的距离
    msgObj.style.marginLeft = "-225px";
    // 窗口被卷去的高+（屏幕可用工作区高/2）-150
    msgObj.style.top = document.body.scrollTop + (window.screen.availHeight / 2) - 150 + "px";
    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.textAlign = "center";
    msgObj.style.lineHeight = "25px";
    msgObj.style.zIndex = "10001";
    document.body.appendChild(msgObj);
    // 提示信息标题
    var title = document.createElement("h4");
    title.setAttribute("id", "alertmsgTitle");
    title.setAttribute("align", "left");
    title.style.margin = "0";
    title.style.padding = "3px";
    title.style.background = bordercolor;
    title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity = "0.75";
    title.style.border = "1px solid " + bordercolor;
    title.style.height = "18px";
    title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color = "white";
    title.innerHTML = "提示信息";
    document.getElementById("alertmsgDiv").appendChild(title);
    // 提示信息
    var txt = document.createElement("p");
    txt.setAttribute("id", "msgTxt");
    txt.style.margin = "16px 0";
    txt.innerHTML = str;
    document.getElementById("alertmsgDiv").appendChild(txt);

    var flag = false;

    // 确定按钮
    var okBtn = document.createElement("button");
    okBtn.setAttribute("id", "okBtn");
    // okBtn.setAttribute("disabled","disabled");
    okBtn.innerHTML = "确定(" + "<span id='spanTimer'>" + time + "</span>)";
    okBtn.style.margin = "20px";
    okBtn.style.padding = "3px";
    okBtn.style.background = "#BEBEBE";
    document.getElementById("alertmsgDiv").appendChild(okBtn);
    document.getElementById("okBtn").onclick = ok;

    // 确定按钮
    var cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancelBtn");
    cancelBtn.innerHTML = "取消";
    cancelBtn.style.margin = "20px";
    cancelBtn.style.padding = "3px";
    cancelBtn.style.background = "#D3D3D3";
    document.getElementById("alertmsgDiv").appendChild(cancelBtn);
    document.getElementById("cancelBtn").onclick = cancel;
}

function ok() {
    var alreadyTimer = initCountdown - countDown;
    if (alreadyTimer < enableCount) {
        return false;
    } else {
        closeWindow();
        return true;
    }
}

function cancel() {
    closeWindow();
    return false;
}

function closeWindow() {
    document.body.removeChild(document.getElementById("alertbgDiv"));
    document.getElementById("alertmsgDiv").removeChild(document.getElementById("alertmsgTitle"));
    document.getElementById("alertmsgDiv").removeChild(document.getElementById("msgTxt"));
    document.getElementById("okBtn").removeChild(document.getElementById("spanTimer"));
    document.getElementById("alertmsgDiv").removeChild(document.getElementById("okBtn"));
    // document.getElementById("alertmsgDiv").removeChild(document.getElementById("cancelBtn"));
    document.body.removeChild(document.getElementById("alertmsgDiv"));
    window.clearInterval(timeHandler);
}

function updateTimerSpan() {
    if (setIntFlag != 0) {
        return;
    }
    if (countDown == 0) {
        closeWindow();
        setIntFlag = 1;
        countDown = initCountdown;
        return false;
    } else {
        countDown--;
        var okBtn = document.getElementById("okBtn")
        var alreadyTimer = initCountdown - countDown;
        if (alreadyTimer >= enableCount) {
            okBtn.style.margin = "20px";
            okBtn.style.padding = "3px";
            okBtn.style.background = "#87CEFA";
        } else {
            okBtn.setAttribute("id", "okBtn");
            // okBtn.setAttribute("disabled","disabled");
            okBtn.style.margin = "20px";
            okBtn.style.padding = "3px";
            okBtn.style.background = "#BEBEBE";
        }

        document.getElementById("spanTimer").innerHTML = countDown;
        timeHandler = setTimeout(function () {
            updateTimerSpan();
        }, 1000);
    }
}