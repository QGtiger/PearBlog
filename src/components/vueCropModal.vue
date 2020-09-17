<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      custom-class="qg-cropper-dialog"
      :before-close="handleCancel"
      :close-on-click-modal="false"
      width="900px"
    >
      <div class="dialog-header-cont">
        <input type="file" ref="fileEle" class="upload_img" accept="image/jpg,image/jpeg,image/png" @change="handleChangeFile($event)">
        <el-button type="success" @click="handleClickUpload">上传图片</el-button>
        <el-button type="info" @click="cropImgSrc='http://qnpic.top/yoona2.jpg'">测试</el-button>
      </div>
      <div class="cropper-main-cont"
      >
        <div class="left-cropper-cont">
          <p class="img_crop_hg">裁剪封面</p>
          <div class="img_edit_wp">
            <span v-if="cropImgSrc">
              <img ref="cropImgElem" :src="cropImgSrc" :style="{width: cropImgData.width+'px', height: cropImgData.height + 'px'}" alt="">
            </span>
          </div>
        </div>
        <div class="right-preview-cont">
          <h4>预览</h4>
          <div class="preview-contlist">
            <div class="wrap-item-cont">
              <div class="preview-item-cont" :style="{
                width: `${previewImgData1.wpW}px`,
                height: previewImgData1.wpW / realCropWp.currentProportion + 'px'
                }">
                <img :src="cropImgSrc" :style="{
                  width: previewImgData1.w+'px', 
                  height: previewImgData1.h + 'px',
                  marginLeft: `${previewImgData1.ml}px`,
                  marginTop: `${previewImgData1.mt}px`,
                  zIndex: -1
                }" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'QgCropDialog',
  props: {
    title: {
      type: String,
      default: '裁剪图片'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  data () {
    return {
      cropImgData: { // 处理后的图片缩放显示大小, 这里的x，y 是 图片的相对于屏幕的 x，y值
        width: 0,
        height: 0
      },
      cropImgSrc: '',
      editImgWp: { // 裁剪外边框
        width: 250,
        height: 238
      },
      originialImgData: { // 最初图片大小
        width: 0,
        height: 0,
        proportion: 1
      },
      realCropWp: { // 裁剪框大小
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        currentProportion: 2.35
      },
      proportionList: [1, 2.35],
      imgLoad: null,
      previewImgData1: {
        ml: 0,
        mt: 0,
        w: 0,
        h: 0,
        wpW: 120,
        scale: 0
      },
      jcrop1: null
    }
  },
  watch: {
    cropImgSrc (val) {
      this.imgLoad.src = val
    }
  },
  mounted() {
    let _this = this
    _this.imgLoad = new Image()
    _this.imgLoad.onload = function() {
      let Imgthis = this
      if (_this.jcrop1) _this.jcrop1.destroy()
      _this.originialImgData.width = Imgthis.width
      _this.originialImgData.height = Imgthis.height
      _this.originialImgData.proportion = Imgthis.width / Imgthis.height
      _this.handleInitCropImgData()
    }
  },
  methods: {
    handleCancel () {
      this.cropImgSrc = ''
      this.jcrop1.destroy()
      this.$emit('cancel')
    },
    debounce (func, timeout) {
      let timer
      return () => {
        clearTimeout(timer)
        timer = setTimeout(func, timeout)
      }
    },
    handleClickUpload () {
      this.$refs.fileEle.dispatchEvent(new MouseEvent('click'))
    },
    handleChangeFile (event) {
      let _this = this
      let inputEle = event.currentTarget
      let file = inputEle.files[0]
      if(!file){
        return;
      }
      // this.showImg = true;
      let reader = new FileReader();
      //读取文件流
      reader.onload = (evt)=>{
        _this.imgLoad.src= evt.target.result
        _this.cropImgSrc = evt.target.result
        /*
        this.$refs.img.src相当于对img节点的src属性操作
        evt.target.result为图片文件装换的base64编码
        */
        // this.$refs.img.src = evt.target.result;
        // let imgDOM = this.$refs.img;
        // //当节点渲染完之后
        // this.$nextTick(()=>{
        //   //通过Image将在图片背后的canvas画出来
        //   let myImg = new Image();
        //   myImg.onload = ()=>{
        //       //这里一点要乘2,否则显示出来的比例不正常,下面的一些代码也是
        //     this.$refs.canvas.width = imgDOM.offsetWidth * 2;
        //     this.$refs.canvas.height = imgDOM.offsetHeight * 2;
        //     //画背后canvas
        //     this.$refs.canvas.getContext('2d').drawImage(myImg,0,0, imgDOM.offsetWidth * 2 , imgDOM.offsetHeight * 2 ,);
        //   }
        //   myImg.src = evt.target.result;
        // })

      }

      reader.readAsDataURL(file);
    },
    handleInitCropImgData () {
      let _this = this
      let ow = _this.originialImgData.width // 原始图片 w
      let oh = _this.originialImgData.height // 原始图片 h
      let ew = _this.editImgWp.width // 当前 最外部剪裁 w
      let eh = _this.editImgWp.height // 当前 最外部剪裁 h
      let op = _this.originialImgData.proportion // 原始图片比例
      let cw  // 处理后的图片缩放 w
      let ch // 处理后的图片缩放 h
      let rp = _this.realCropWp.currentProportion // 裁剪框比例
      let rw // 裁剪框 w
      let rh // 裁剪框 h
      if (ow > oh) {
        cw = ew
        ch = ew / op
      } else {
        ch = eh
        cw = eh * op
      }
      // 裁剪框配置
      let isCropWidth = ch * rp
      if (isCropWidth <= cw) {
        rh = ch
        rw = isCropWidth
      } else {
        rw = cw
        rh = cw / rp
      }
      let rl // 裁剪框 left
      let rt // 裁剪框 top
      _this.realCropWp.width = rw
      _this.realCropWp.height = rh
      _this.cropImgData.height = ch
      _this.cropImgData.width = cw

      rl = (cw - rw) / 2
      rt = (ch- rh) / 2
      _this.realCropWp.left = rl
      _this.realCropWp.top = rt
      _this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        $(_this.$refs.cropImgElem).Jcrop({
          allowSelect: true,
          allowMove: true,
          minSize: [6,6],
          aspectRatio: rp,
          onChange: function() {
            let jcropData = this.tellSelect()
            _this.realCropWp.width = jcropData.x2 - jcropData.x
            _this.realCropWp.height = jcropData.y2 - jcropData.y
            _this.realCropWp.left = jcropData.x
            _this.realCropWp.top = jcropData.y
            console.log(this.tellSelect())
            _this.handleInitPreviewItem()
          },
          onRelease: function() {

          }
        }, function() {
          _this.jcrop1 = this
          _this.handleInitPreviewItem()
          this.setSelect([rl, rt, rl+rw, rt+rh])
        })
      })
    },
    handleInitPreviewItem () {
      let _this = this
      let cw = _this.cropImgData.width
      let ch = _this.cropImgData.height
      let rw = _this.realCropWp.width
      let scale = rw / _this.previewImgData1.wpW
      _this.previewImgData1.w = _this.previewImgData1.wpW * cw / rw
      _this.previewImgData1.h = _this.previewImgData1.w * ch / cw
      _this.previewImgData1.scale = scale
      _this.previewImgData1.ml = - _this.realCropWp.left / scale
      _this.previewImgData1.mt = - _this.realCropWp.top / scale
    }
  }
}
</script>

<style lang="scss">
@import url('../assets/css/jcrop/jquery.Jcrop.css');
.qg-cropper-dialog {
  color: #303133 !important;
  .upload_img {
    display: none;
  }
  .cropper-main-cont {
    display: flex;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ccc;
    .left-cropper-cont {
      width: 280px;
      margin-right: 35px;
      flex-grow: 0;
      flex-shrink: 0;
      text-align: center;
      .img_crop_hg {
        padding-bottom: 10px;
      }
      .img_edit_wp {
        width: 250px;
        height: 238px;
        margin: 0 auto;
        border: 1px solid #eee;
        .jcrop-holder {
          display: inline-block;
        }
      }
    }
    .right-preview-cont {
      .preview-contlist {
        .wrap-item-cont {
          display: flex;
          .preview-item-cont {
            margin-right: 25px;
            flex-grow: 0;
            flex-shrink: 0;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>