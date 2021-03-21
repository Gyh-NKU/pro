// pages/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    fengxiang:'',
    type:'',
    city:'',
    province:'',
    weather:'',
    air_tips:'',
    air:'',
    tem:'',
  },



  getarea:function(op){
    let that=this;
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://cx.shouji.360.cn/phonearea.php?number='+op.id,
        headers :{
          'Content-type':'application/json'
        },
        
        success:function(res){
            that.setData({
              province:res.data.data.province,
              city:res.data.data.city,
            })
          //console.log(res.data.data.province);
          //console.log(res.data.data.city);
          resolve({data:res.data.data.city});
     
        },
        fail: function (err) { 
          console.log("fail");
         
        },
      });
    });

  },
  getweather:async function(op){
    let that=this;
    let city1=await that.getarea(op);
    //console.log(city1.data);
    wx.request({
      url:'https://v0.yiketianqi.com/api?version=v9&appid=55432448&appsecret=QNG9A3AV&city='+city1.data,
      headers :{
        'Content-type':'application/json'
      },
      success:function(res1){
        console.log(res1);
        let res0=res1.data.data[0];
        that.setData({
          weather:res0.wea,
          air_tips:res0.air_tips,
          air:res0.air_level,
          tem:res0.tem,
        })
        console.log(that.data.weather)
      },
      fail:function(err){
        console.log('fail');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);

      // wx.request({
      //   url: 'https://cx.shouji.360.cn/phonearea.php?number='+options.id,
      //   headers :{
      //     'Content-type':'application/json'
      //   },
        
      //   success:function(res){
      //       that.setData({
      //         province:res.data.data.province,
      //         city:res.data.data.city,
      //       })
      //     console.log(res.data.data.province);
      //     console.log(res.data.data.city);
     
      //   },
      //   fail: function (err) { 
      //     console.log("fail");
         
      //   },
      // });
    //  let city1=await that.getarea(option);
    //  wx.request({
    //   url:'https://v0.yiketianqi.com/api?version=v9&appid=55432448&appsecret=QNG9A3AV&city='+city1,
    //   headers :{
    //     'Content-type':'application/json'
    //   },
    //   success:function(res1){
    //     console.log(res1);
    //     that.setData({
    //       weather:res1.data.data[0].wea,
    //     })
    //     console.log(that.data.weather)
    //   },
    //   fail:function(err){
    //     console.log('fail');
    //   }
    // })
    that.getweather(options);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})