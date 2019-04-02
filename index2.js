//var ele = require('mint-ui');
var app = new Vue({
    el: '#app',
    data: {
        curr: 1,
        save: false,
        editName: false,
        editSign: false,
        name: '',
        sign: '',
        signFormat: '写下你最喜欢的<br><span>保险语录(仅限20字)</span>',
        photo: 'images/photo.jpg',
	imagedata: 'images/photo.jpg',
        backgroundImage: {
            "background-image": "url('images/photo.jpg')"
        },
    },
    methods: {
        back: function () {
            this.editSign = false;
            this.editName = false;
        },
        pre: function () {
            this.back();
            var c = this.curr - 1;
            if (c < 1) {
                this.curr = 3;
            } else {
                this.curr = c;
            }
            console.log(this.curr)
        },
        post: function () {
            this.back();
            var c = this.curr + 1;
            if (c > 3) {
                this.curr = 1;
            } else {
                this.curr = c;
            }
            console.log(this.curr)
        },
        toEditSign: function (n) {
            if (n == 1) {
                this.editName = true;
                //this.$
            }
            if (n == 2) {
                this.editSign = true;
            }
        },
        saveName: function (e) {
            this.editName = false
        },

        saveInput: function (e) {
            this.editSign = false
            if (this.sign <= 20) {
                this.signFormat = this.sign
            } else {
                this.signFormat = this.sign.substr(0, 10) + '<br><span>' + this.sign.substr(10, 10) + '</span>'
            }
        },

        handleExceed: function (response, file, fileList) {
            this.photo = file.url;
            this.backgroundImage = {"background-image": "url('" + file.url + "')"}
        },

        choosePic: function (e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            if (!reader) {
                return;
            };
            // if (files[0].size>100000) {
            //     message.warn("图片大小不能超过100K");
            //     return;
            // }
            const that = this;
            reader.onload = function (ee) {
                var text = ee.target.result;
                that.photo = text;
                that.backgroundImage = {"background-image": "url('" + text + "')"}
            };
            reader.readAsDataURL(file);
        },

        saveAll: function (e) {
            this.editSign = false;
            this.editName = false;
            this.save = true;
            // html2canvas(document.getElementById("app"),{allowTaint : true}).then(function(canvas) {
            //     console.log('=============', canvas)
            //     var link = document.createElement("a");
            //     document.body.appendChild(link);
            //     link.download = "html_image.png";
            //     link.href = canvas.toDataURL("image/png");
            //     link.target = '_blank';
            //     link.click();
            //     //document.body.appendChild(canvas);
            // });
            //this.convert2canvas();
            //this.$toast('Hello world!')
        },

        preview: function () {
            const that = this;
            var shareContent = document.getElementById("app");
            var width = shareContent.offsetWidth;
            var height = shareContent.offsetHeight;
            var canvas = document.createElement("canvas");
            var scale = 2;
            canvas.width = width * scale *0.98;
            canvas.height = height * scale;
            canvas.getContext("2d").scale(scale* 0.98, scale);

            var opts = {
                scale: scale,
                canvas: canvas,
                logging: true,
                width: width*0.98,
                height: height,
		userCORS: true
            };
            this.$indicator.open();
            html2canvas(shareContent, opts).then(function (canvas) {
                //document.getElementById("previewPic").src = canvas.toDataURL("image/png");
		try {
                	that.imagedata = canvas.toDataURL("image/png");
		} catch (err) {
		     console.log(err)
		}
                var layer = $('#layer');
                var popup = $('#popup');
                layer.show();
                popup.show();
                that.$indicator.close();
                //var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
                //document.body.appendChild(img);
                //shareContent.css({"display": 'none'})
                // var link = document.createElement("a");
                //     link.download = "html_image.png";
                //     link.href = canvas.toDataURL("image/png");
                //     link.target = '_blank';
                //     link.click();


                //document.body.appendChild(canvas);
                // $(img).css({
                //     "width": canvas.width / 2 + "px",
                //     "height": canvas.height / 2 + "px",
                // })
            });
        },


        returnAll: function (e) {
            this.editSign = false;
            this.editName = false;
            this.save = false;
        },
    }
})
