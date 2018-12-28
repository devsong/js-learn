  //自动关闭提示框  
  // 初始计时器值
  var initCountdown = 5;
  var enableCount = 2;
  var countDown = initCountdown;
  var setIntFlag = 0;
  var retFlag = false;
  var timeHandler;

  function Confirm(str, timer, atLastTime) {
      setIntFlag = 0;
      initCountdown = timer;
      countDown = timer;
      enableCount = atLastTime;
      initView(str, countDown);
      //var t = window.setInterval(updateTimeSpan(),1000);
      //设置关闭时间  
      timeHandler = window.setTimeout(function () {
          updateTimerSpan()
      }, 1000);
  }

  function initView(str, time) {
      var msgw, msgh, bordercolor;
      msgw = 400; //提示窗口的宽度  
      msgh = 150; //提示窗口的高度  
      titleheight = 25 //提示窗口标题高度  
      bordercolor = "#336699"; //提示窗口的边框颜色  
      titlecolor = "#99CCFF"; //提示窗口的标题颜色  
      var sWidth, sHeight;
      //获取当前窗口尺寸  
      sWidth = document.body.offsetWidth;
      sHeight = document.body.offsetHeight;
      //    //背景div  
      var bgObj = document.createElement("div");
      bgObj.setAttribute('id', 'alertbgDiv');
      bgObj.style.position = "absolute";
      bgObj.style.top = "0";
      bgObj.style.background = "#E8E8E8";
      bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
      bgObj.style.opacity = "0.6";
      bgObj.style.left = "0";
      bgObj.style.width = sWidth + "px";
      bgObj.style.height = sHeight + "px";
      bgObj.style.zIndex = "10000";
      document.body.appendChild(bgObj);
      //创建提示窗口的div  
      var msgObj = document.createElement("div")
      msgObj.setAttribute("id", "alertmsgDiv");
      msgObj.setAttribute("align", "center");
      msgObj.style.background = "white";
      msgObj.style.border = "1px solid " + bordercolor;
      msgObj.style.position = "absolute";
      msgObj.style.left = "50%";
      msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
      //窗口距离左侧和顶端的距离   
      msgObj.style.marginLeft = "-225px";
      //窗口被卷去的高+（屏幕可用工作区高/2）-150  
      msgObj.style.top = document.body.scrollTop + (window.screen.availHeight / 2) - 150 + "px";
      msgObj.style.width = msgw + "px";
      msgObj.style.height = msgh + "px";
      msgObj.style.textAlign = "center";
      msgObj.style.lineHeight = "25px";
      msgObj.style.zIndex = "10001";
      document.body.appendChild(msgObj);
      //提示信息标题  
      var title = document.createElement("h4");
      title.setAttribute("id", "alertmsgTitle");
      title.setAttribute("align", "left");
      title.style.margin = "0";
      title.style.padding = "3px";
      title.style.background = bordercolor;
      title.style.filter =
          "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
      title.style.opacity = "0.75";
      title.style.border = "1px solid " + bordercolor;
      title.style.height = "18px";
      title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";
      title.style.color = "white";
      title.innerHTML = "提示信息";
      document.getElementById("alertmsgDiv").appendChild(title);
      //提示信息  
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
      // var cancelBtn = document.createElement("button");
      // cancelBtn.setAttribute("id","cancelBtn");
      // cancelBtn.innerHTML = "取消";
      // cancelBtn.style.margin="20px";  
      // cancelBtn.style.padding="3px"; 
      // cancelBtn.style.background="#D3D3D3";  
      // document.getElementById("alertmsgDiv").appendChild(cancelBtn);
      // document.getElementById("cancelBtn").onclick= cancel;
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
          retrun;
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
              okBtn.style.margin = "20px";
              okBtn.style.padding = "3px";
              okBtn.style.background = "#BEBEBE";
          }

          document.getElementById("spanTimer").innerHTML = countDown;
          timeHandler = setTimeout(function () {
              updateTimerSpan()
          }, 1000);
      }
  }