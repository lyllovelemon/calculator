//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '简易计算器',
    nickname:"柠檬酱萌萌哒i",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onCalculator:function(){
    wx.navigateTo({
      url: '../count/count',
    })
  },
  onLoad: function () {
    console.log("onload");
    
  }
}
)
