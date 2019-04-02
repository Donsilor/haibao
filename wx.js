<!--------------------------------------------------------------微信分享-------------------------------------------------------------------------------------->
$.ajax({
    url: "/haibao/api/sign?url=" + window.location.href,
    //url: "/haibao/api/sign?url=" + 'http://ceibs.54jj.cn/haibao/inquire.html',
    type: "get",
    dataType: "json",
	async:false,
    success:function(data) {
    	console.log(data);
		var appIdVal=data.appId;
		var timestampVal=data.timestamp;
		var nonceStrVal=data.nonceStr;
		var signatureVal=encodeURIComponent(data.signature);
		wx.config({
			debug: false,
			// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: appIdVal,
			// 必填，公众号的唯一标识
			timestamp: timestampVal,
			// 必填，生成签名的时间戳
			nonceStr: nonceStrVal,
			// 必填，生成签名的随机串
			signature: signatureVal,
			// 必填，签名
			jsApiList: [
				'onMenuShareAppMessage',//分享给好友
				'onMenuShareTimeline',//分享到朋友圈
				'onMenuShareQQ',//分享到QQ好友
				'onMenuShareWeibo',//分享到微博
				'onMenuShareQZone'//分享QQ空间
			] // 必填，需要使用的JS接口列表
		});
    },
	error:function(){
        alert("您好，服务器繁忙中，请稍后重试  ");
    }
})

wx.ready(function() {
	var shareTitle="惠州平安人寿2018年教师节表彰大会";
	var shareDesc="初心不泯，使命如磐";
	//var linkUrl="https://q.eqxiu.com/s/DQ5G6U3v";
	var linkUrl=window.location.href;
	var imgUrl="http://ceibs.54jj.cn/haibao/images/share.jpeg";

	// 分享给微信好友
	wx.onMenuShareAppMessage({
		title:shareTitle,
		// 分享标题
		desc:shareDesc,
		// 分享描述
		link:linkUrl,
		// 分享链接
		imgUrl:imgUrl,
		// 分享图标
		type: 'link',
		// 分享类型,music、video或link，不填默认为link
		dataUrl: '',
		// 如果type是music或video，则要提供数据链接，默认为空
		success: function() {
			},
		cancel: function() {
			// 用户取消分享后执行的回调函数
		}
	});

	// 分享到朋友圈
	wx.onMenuShareTimeline({
		title:shareTitle,
		// 分享标题
		desc:shareDesc,
		// 分享描述
		link:linkUrl,
		// 分享链接
		imgUrl:imgUrl,
		// 分享图标
		type: 'link',
		// 分享类型,music、video或link，不填默认为link
		dataUrl: '',
		// 如果type是music或video，则要提供数据链接，默认为空
		success: function(res) {
			},
		cancel: function(res) {
			// 用户取消分享后执行的回调函数
		},
		fail: function(res) {
			// 用户取消分享后执行的回调函数
		}
	});
	wx.error(function(res) {
		// config信息验证失败会执行error函数，如签名过期导致验证失败
	});
});
