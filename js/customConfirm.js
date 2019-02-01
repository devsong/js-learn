// 自定义弹框浮层
// 初始计时器值
titleheight = 25 // 提示窗口标题高度
bordercolor = "#336699"; // 提示窗口的边框颜色
titlecolor = "#99CCFF"; // 提示窗口的标题颜色
$(document).ready(function () {
    $('#btn').click(function (e) {
        customConfirm.confirm({
            title: '提示',
            body: 'Are you sure?',
            okBtnMsg: '确认',
            okBtnCallback: function () {
                console.log('ok clicked');
            },
            cancelBtnMsg: '取消',
            cancelBtnCallback: function () {
                console.log('cancel clicked');
            },
            initCountdown: 500,
            atLastShow: 3,
            elapse: 0,
            width: '400px',
            height: '150px',
        });
    });
});

var customConfirm = {
    op: {
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
        width: '400px',
        height: '150px',
        flag: 0,
        timeHandle: 0
    },

    confirm: function (option) {
        customConfirm.init(option);
        customConfirm.op.timeHandle = window.setTimeout(function () {
            customConfirm.timerCountDown();
        }, 1000);
    },

    init: function (option) {
        // init variables
        customConfirm.op.flag = 0;
        customConfirm.op.title = option.title || customConfirm.op.title;
        customConfirm.op.body = option.body || customConfirm.op.body;
        customConfirm.op.width = option.width || customConfirm.op.width;
        customConfirm.op.height = option.height || customConfirm.op.height;
        customConfirm.op.initCountdown = option.initCountdown || customConfirm.op.initCountdown;
        customConfirm.op.elapse = option.elapse || customConfirm.op.elapse;
        customConfirm.op.atLastShow = option.atLastShow || customConfirm.op.atLastShow;
        customConfirm.op.okBtnMsg = option.okBtnMsg || customConfirm.op.okBtnMsg;
        customConfirm.op.okBtnCallback = option.okBtnCallback || customConfirm.op.okBtnCallback;
        customConfirm.op.cancelBtnMsg = option.cancelBtnMsg || customConfirm.op.cancelBtnMsg;
        customConfirm.op.cancelBtnCallback = option.cancelBtnCallback || customConfirm.op.cancelBtnCallback;
        // init view
        var alertMsgDialog = this.getAlertDiv();
        alertMsgDialog.appendChild(this.getTitleDiv());
        alertMsgDialog.appendChild(this.getBodyDiv());
        alertMsgDialog.appendChild(this.getOkBtnDiv());
        alertMsgDialog.appendChild(this.getCancelDiv());
        document.body.append(alertMsgDialog);
    },

    getAlertDiv: function () {
        var div = document.createElement("div");
        div.setAttribute('id', 'alertMsgDiv');
        div.setAttribute('class', 'alert-msg-div');
        div.style.width = customConfirm.op.width;
        div.style.height = customConfirm.op.height;
        return div;
    },

    getTitleDiv: function () {
        var div = document.createElement("div");
        div.setAttribute('id', 'alertTitleDiv');
        div.setAttribute('class', 'alert-title-div');
        div.innerHTML = customConfirm.op.title;
        div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
        return div;
    },

    getBodyDiv: function () {
        var div = document.createElement("div");
        div.setAttribute('id', 'alertBodyDiv');
        div.setAttribute('class', 'alert-body-div');
        div.innerHTML = customConfirm.op.body;
        return div;
    },

    getOkBtnDiv: function () {
        var okBtn = document.createElement("button");
        okBtn.setAttribute('id', 'alertOkBtn');
        okBtn.setAttribute('class', 'alert-btn');
        okBtn.innerHTML = customConfirm.op.okBtnMsg;
        okBtn.onclick = function () {
            if (customConfirm.ok()) {
                customConfirm.op.okBtnCallback();
            }
        }
        okBtn.appendChild(this.getTimeSpan());
        return okBtn;
    },

    getTimeSpan: function () {
        var span = document.createElement("span");
        span.setAttribute('id', 'alertTimerSpan');
        span.innerHTML = customConfirm.op.initCountdown;
        return span;
    },

    getCancelDiv: function () {
        var cancelBtn = document.createElement("button");
        cancelBtn.setAttribute('id', 'alertCancelBtn');
        cancelBtn.setAttribute('class', 'alert-btn');
        cancelBtn.innerHTML = customConfirm.op.cancelBtnMsg;
        cancelBtn.onclick = function () {
            if (customConfirm.cancel()) {
                customConfirm.op.cancelBtnCallback();
            }
        }
        return cancelBtn;
    },

    timerCountDown: function () {
        if (customConfirm.op.flag != 0) {
            return;
        }
        if (customConfirm.op.elapse >= customConfirm.op.initCountdown) {
            customConfirm.closeWindow(op);
            customConfirm.op.flag = 1;
            customConfirm.op.elapse = 0;
            return false;
        } else {
            customConfirm.op.elapse++;
            var okBtn = document.getElementById("alertOkBtn")

            if (customConfirm.op.elapse > customConfirm.op.atLastShow) {
                okBtn.setAttribute('class', 'alert-btn alert-btn-enable');
            } else {
                okBtn.setAttribute('class', 'alert-btn alert-btn-disable');
            }
            var showSeconds = customConfirm.op.initCountdown - customConfirm.op.elapse;
            document.getElementById("alertTimerSpan").innerHTML = '(' + showSeconds + ')';
            customConfirm.op.timeHandle = setTimeout(function () {
                customConfirm.timerCountDown();
            }, 1000);
            return true;
        }
    },

    ok: function () {
        if (customConfirm.op.elapse < customConfirm.op.atLastShow) {
            return false;
        } else {
            customConfirm.closeWindow();
            return true;
        }
    },

    cancel: function () {
        customConfirm.closeWindow();
        return true;
    },

    closeWindow: function () {
        document.getElementById("alertMsgDiv").removeChild(document.getElementById("alertTitleDiv"));
        document.getElementById("alertMsgDiv").removeChild(document.getElementById("alertBodyDiv"));
        document.getElementById("alertOkBtn").removeChild(document.getElementById("alertTimerSpan"));
        document.getElementById("alertMsgDiv").removeChild(document.getElementById("alertOkBtn"));
        document.getElementById("alertMsgDiv").removeChild(document.getElementById("alertCancelBtn"));
        document.body.removeChild(document.getElementById("alertMsgDiv"));
        window.clearInterval(customConfirm.op.timeHandle);
    },
};