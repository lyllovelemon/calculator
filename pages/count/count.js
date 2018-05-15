// pages/count/count.js
Page({
  data: {
    idc: "clear",
    idb: "back",
    idt: "toggle",
    idp: "+",
    idm: "-",
    idx: "×",
    idd: "÷",
    ide: "=",
    ido: ".",
    id0: "0",
    id1: "1",
    id2: "2",
    id3: "3",
    id4: "4",
    id5: "5",
    id6: "6",
    id7: "7",
    id8: "8",
    id9: "9",
    screenData: "0",
    translate: { "+": "+", "-": "-", "×": "*", "÷": "/", ".": "." },
    lastIsOperaSymbo: false,
    arr: [],
    logs: []
  },
  clickBtn: function (event) {
    var id = event.target.id;
    if (id == this.data.idb) {  //退格←
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "-") {
        data = 0;
      }
      this.setData({ "screenData": data });
      this.data.arr.pop();
    } else if (id == this.data.idc) {  //清屏C
      this.setData({ "screenData": "0" });
      this.data.arr.length = 0;
    } else if (id == this.data.idt) {  //正负号+/-
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      var firstWord = data.charAt(0);
      if (data == "-") {
        data = data.substr(1);
        this.data.arr.shift();
      } else {
        data = "-" + data;
        this.data.arr.unshift("-");
      }
      this.setData({ "screenData": data });
    } else if (id == this.data.ide) {  //等于＝
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }         
      var lastWord = data.charAt(data.length);
      if (isNaN(lastWord)) {
        return;
      }
      var num = "";
      var lastOperator = "";
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.ido || arr[i] == this.data.idt) {
          num += arr[i];
        } else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0]) * 1.0;
      console.log(result);
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          if (optarr[1] == this.data.idp) {
            result += Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idm) {
            result -= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idx) {
            result *= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idd) {
            result /= Number(optarr[i + 1]);
          }
        }
      }
      //存储历史记录
      this.data.logs.push(data + "="+result);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(result);

      this.setData({ "screenData": result + "" });
    } else {
      if (this.data.translate[id]) { //如果是符号+-*/
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data });
      this.data.arr.push(id);

      if (this.data.translate[id]) {
        this.setData({ "lastIsOperaSymbo": true });
      } else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  history: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  }
})