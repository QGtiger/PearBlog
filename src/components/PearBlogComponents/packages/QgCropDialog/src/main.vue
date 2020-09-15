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
      </div>
      <div class="cropper-main-cont"
      >
        <div class="left-cropper-cont">
          <p class="img_crop_hg">裁剪封面</p>
          <div class="img_edit_wp">
            <span v-if="cropImgSrc">
              <img :src="cropImgSrc" :style="{width: cropImgData.width+'px', height: cropImgData.height + 'px', display: 'none'}" alt="">
              <div class="crop-holder" ref="cropImgHolder" :style="{width: cropImgData.width+'px', height: cropImgData.height + 'px', position: 'relative', backgroundColor: 'white', top: cropHolderTop}">
                <div class="crop-area" :style="{zIndex: 290,width: realCropWp.width + 'px', height: realCropWp.height + 'px',left: cropWpCoordinate.left + 'px', top: cropWpCoordinate.top + 'px', position: 'absolute'}">
                  <div class="crop-move">
                    <div class="crop-hline" :style="{position: 'absolute', opacity: '0.5',top: 0,}"></div>
                    <div class="crop-vline" :style="{position: 'absolute', opacity: '0.5',right: 0,}"></div>
                    <div class="crop-hline" :style="{position: 'absolute', opacity: '0.5',bottom: 0,}"></div>
                    <div class="crop-vline" :style="{position: 'absolute', opacity: '0.5',left: 0,}"></div>
                  </div>
                  <div class="crop-move crop-cursor">
                    <div class="ord-n crop-hblock" @mousedown="mousedownEvent($event, 2, 'ne')"></div>
                    <div class="ord-e crop-vblock" @mousedown="mousedownEvent($event, 2, 'ne')"></div>
                    <div class="ord-s crop-hblock" @mousedown="mousedownEvent($event, 2, 'sw')"></div>
                    <div class="ord-w crop-vblock" @mousedown="mousedownEvent($event, 2, 'sw')"></div>
                    <div class="ord-nw crop-block" @mousedown="mousedownEvent($event, 2, 'nw')"></div>
                    <div class="ord-ne crop-block" @mousedown="mousedownEvent($event, 2, 'ne')"></div>
                    <div class="ord-se crop-block" @mousedown="mousedownEvent($event, 2, 'se')"></div>
                    <div class="ord-sw crop-block" @mousedown="mousedownEvent($event, 2, 'sw')"></div>
                    <div class="crop-tracker" @mousedown="mousedownEvent($event, 1)"></div>
                  </div>
                </div>
                <div class="crop-track" :style="{width: '100%', height: '100%', position: 'absolute', zIndex: 100}"></div>
                <img :src="cropImgSrc" :style="{width: cropImgData.width+'px', height: cropImgData.height + 'px', zIndex: -1}" alt="">
              </div>
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
    cropHolderTop() {
      let _this = this
      return (_this.editImgWp.height - _this.cropImgData.height)/2 + 'px'
    }
  },
  data () {
    return {
      cropImgData: { // 处理后的图片缩放显示大小, 这里的x，y 是 图片的相对于屏幕的 x，y值
        width: 0,
        height: 0,
        x: 0,
        y: 0
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
        currentProportion: 1
      },
      proportionList: [1, 2.35],
      imgLoad: null,
      isClickMove: false, // 是否点击移动
      mouseDownCoordinate: {  // 鼠标点击x，y
        x: 0,
        y: 0
      },
      cropWpCoordinate: { // 裁剪框坐标   注意 这是 记录鼠标移动端 坐标
        left: 0,
        top: 0
      },
      originialWpCoordinate: { // 原始裁剪框的坐标, 用于 鼠标移动事件
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      requestAnimationFrameId: null,
      isClickResize: false, // 是否是resize 裁剪框
      movedirective: '', // 鼠标移动方向
      minWidth: 10,
      minHeight: 10,
      resizeTimer: null,
      previewImgData1: {
        ml: 0,
        mt: 0,
        w: 0,
        h: 0,
        wpW: 120,
        scale: 0
      }
    }
  },
  watch: {
  },
  mounted() {
    let _this = this
    _this.imgLoad = new Image()
    _this.imgLoad.onload = function() {
      let Imgthis = this
      _this.originialImgData.width = Imgthis.width
      _this.originialImgData.height = Imgthis.height
      _this.originialImgData.proportion = Imgthis.width / Imgthis.height
      _this.handleInitCropImgData()
    }
    document.body.addEventListener('mousemove', this.mouseMoveEvent)
    document.body.addEventListener('mouseup', this.mouseUpEvent)
    window.addEventListener('resize', this.debounce(this.handleResizeCropImgData, 700))
    this.$once('hook:beforeDestroy', function () {
      document.body.removeEventListener('mousemove', this.mouseMoveEvent)
      document.body.removeEventListener('mouseup', this.mouseUpEvent)
      window.removeEventListener('resize', this.debounce(this.handleResizeCropImgData, 700))
    })
  },
  methods: {
    handleCancel () {
      console.log('cancel')
      this.$emit('cancel')
    },
    debounce (func, timeout) {
      let timer
      return () => {
        clearTimeout(timer)
        timer = setTimeout(func, timeout)
      }
    },
    handleResizeCropImgData() {
      let _this = this
      if (!_this.$refs.cropImgHolder) return
      console.log(400)
      let clientRect = _this.$refs.cropImgHolder.getBoundingClientRect()
      _this.cropImgData.x = clientRect.x
      _this.cropImgData.y = clientRect.y
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
      console.log(_this._data)
      if (ow >= oh) {
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
      _this.realCropWp.width = rw
      _this.realCropWp.height = rh
      _this.cropImgData.height = ch
      _this.cropImgData.width = cw
      _this.cropWpCoordinate.top = (ch - rh) / 2
      _this.cropWpCoordinate.left = (cw - rw) / 2
      _this.originialWpCoordinate.top = (ch - rh) / 2
      _this.originialWpCoordinate.left = (cw - rw) / 2
      _this.originialWpCoordinate.width = rw
      _this.originialWpCoordinate.height = rh
      // 初始化预览
      _this.previewImgData1.w = _this.previewImgData1.wpW * cw / rw
      _this.previewImgData1.h = _this.previewImgData1.w * oh / ow
      _this.previewImgData1.scale = rw / _this.previewImgData1.wpW
      _this.previewImgData1.ml = -(_this.originialWpCoordinate.left / _this.previewImgData1.scale)
      _this.previewImgData1.mt = -(_this.originialWpCoordinate.top / _this.previewImgData1.scale)
      _this.$nextTick(() => {
        console.log(_this.$refs.cropImgHolder.getBoundingClientRect())
        let clientRect = _this.$refs.cropImgHolder.getBoundingClientRect()
        _this.cropImgData.x = clientRect.x
        _this.cropImgData.y = clientRect.y
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
      _this.previewImgData1.ml = -(_this.cropWpCoordinate.left / scale)
      _this.previewImgData1.mt = -(_this.cropWpCoordinate.top / scale)
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
    handleClickUpload () {
      this.$refs.fileEle.dispatchEvent(new MouseEvent('click'))
    },
    mousedownEvent(event, mouseType, movedirective){ // mouseType 鼠标点击 是裁剪框move(1) 还是resize(2) movedirective 鼠标移动方向
      if (mouseType === 1) {
        this.isClickMove = true
      } else if (mouseType === 2) {
        this.isClickResize = true
        this.movedirective = movedirective
      }
      this.mouseDownCoordinate.x = event.pageX
      this.mouseDownCoordinate.y = event.pageY
      console.log(`mouseDown: 当前X=${this.mouseDownCoordinate.x}, Y=${this.mouseDownCoordinate.y}`)
    },
    mouseMoveEvent(event) {
      let _this = this
      let currentX // 当前鼠标 x
      let currentY // 当前 鼠标y
      let currentMouseDownX // 之前鼠标点击 x
      let currentMouseDownY // 之前鼠标点击 y
      currentX = event.pageX
      currentY = event.pageY
      currentMouseDownX = _this.mouseDownCoordinate.x
      currentMouseDownY = _this.mouseDownCoordinate.y
      if (this.isClickMove) {
        _this.requestAnimationFrameId = requestAnimationFrame(function() {
          let boundingLeft = _this.originialWpCoordinate.left + currentX - currentMouseDownX
          let boundingTop = _this.originialWpCoordinate.top + currentY - currentMouseDownY
          if (boundingLeft >= 0 && boundingLeft + _this.realCropWp.width <= _this.cropImgData.width) {
            _this.cropWpCoordinate.left = boundingLeft
          } else {
            if (boundingLeft < 0) {
              _this.cropWpCoordinate.left = 0
            } else {
              _this.cropWpCoordinate.left = _this.cropImgData.width - _this.realCropWp.width
            }
          }
          if (boundingTop >= 0 && boundingTop + _this.realCropWp.height <= _this.cropImgData.height) {
            _this.cropWpCoordinate.top = boundingTop
          } else {
            if (boundingTop < 0) {
              _this.cropWpCoordinate.top = 0
            } else {
              _this.cropWpCoordinate.top = _this.cropImgData.height - _this.realCropWp.height
            }
          }
          
          _this.handleInitPreviewItem()
        })
      } else if (this.isClickResize) {
        let cropImgX = _this.cropImgData.x
        let cropImgY = _this.cropImgData.y
        let centerPointer = {x:0,y:0} // 中心点
        let currentEvent = {
          x: currentX,
          y: currentY
        }
        _this.requestAnimationFrameId = requestAnimationFrame(function() {
          let ot = _this.originialWpCoordinate.top
          let ol = _this.originialWpCoordinate.left
          let ow = _this.originialWpCoordinate.width
          let oh = _this.originialWpCoordinate.height
          if (_this.movedirective === 'ne') {
            centerPointer = {
              x: ol + cropImgX,
              y: ot + oh + cropImgY
            }
            if (currentX >= centerPointer.x && currentY <= centerPointer.y) {
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, false)
            } else {
              _this.handleInitDirective(centerPointer, currentEvent)
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, true)
            }
          } else if (_this.movedirective === 'se') {
            centerPointer = {
              x: ol + cropImgX,
              y: ot + cropImgY,
              cropImgX: cropImgX,
              cropImgY,
              ol,
              ot
            }
            if (currentX >= centerPointer.x && currentY >= centerPointer.y) {
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, false)
            } else {
              _this.handleInitDirective(centerPointer, currentEvent)
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, true)
            }
          } else if (_this.movedirective === 'sw') {
            centerPointer = {
              x: ol + cropImgX + ow,
              y: ot + cropImgY
            }
            if (currentX <= centerPointer.x && currentY >= centerPointer.y) {
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, false)
            } else {
              _this.handleInitDirective(centerPointer, currentEvent)
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, true)
            }
          } else if (_this.movedirective === 'nw') {
            centerPointer = {
              x: ol + cropImgX + ow,
              y: ot + cropImgY + oh
            }
            if (currentX <= centerPointer.x && currentY <= centerPointer.y) {
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, false)
            } else {
              _this.handleInitDirective(centerPointer, currentEvent)
              _this.handleInitCropWpContainer(centerPointer, currentEvent, _this.movedirective, true)
            }
          }
          _this.handleInitPreviewItem()
        })
      }
    },
    handleInitCropWpContainer (centerPointer, currentEvent, currentDirective, isChangeQuadrant) { //isChangeQuadrant 是否切换象限
      let _this = this
      let rh
      let rw
      let ct
      let cl
      let rp = _this.realCropWp.currentProportion
      let cropImgX = _this.cropImgData.x
      let cropImgY = _this.cropImgData.y
      let moveW = Math.abs(currentEvent.x - centerPointer.x)
      let moveH = Math.abs(centerPointer.y - currentEvent.y)
      if (moveH > moveW) {
        rh = moveH
        rw = rh * rp
      } else {
        rw = moveW
        rh = rw / rp
      }
      [rw, rh] = _this.handleInitCropWpProportion(centerPointer, currentEvent, rw, rh)
      if (currentDirective === 'ne') {
        ct = centerPointer.y - rh - cropImgY
        cl = centerPointer.x - cropImgX
      } else if (currentDirective === 'se') {
        ct = centerPointer.y - cropImgY
        cl = centerPointer.x - cropImgX
      } else if (currentDirective === 'sw') {
        ct = centerPointer.y - cropImgY
        cl = centerPointer.x - rw - cropImgX
      } else if (currentDirective === 'nw') {
        ct = centerPointer.y - rh - cropImgY
        cl = centerPointer.x - rw - cropImgX
      }
      if (rw) _this.realCropWp.width = rw
      if (rh) _this.realCropWp.height = rh
      if (ct) _this.cropWpCoordinate.top = ct
      if (cl) _this.cropWpCoordinate.left = cl
      if (isChangeQuadrant) {
        _this.originialWpCoordinate.width = rw
        _this.originialWpCoordinate.height = rh
        _this.originialWpCoordinate.top = ct
        _this.originialWpCoordinate.left = cl
      }
    },
    handleInitCropWpProportion(centerPointer, currentEvent, rw, rh) {
      let _this = this
      let cropImgX = _this.cropImgData.x
      let cropImgY = _this.cropImgData.y
      let cw = _this.cropImgData.width
      let ch = _this.cropImgData.height
      let wpWidth
      let wpHeight
      let rp = _this.realCropWp.currentProportion
      let maxE = cropImgX+cw-centerPointer.x // x 轴正方向
      let maxN = centerPointer.y-cropImgY // y 轴负方向
      let maxS = cropImgY+ch-centerPointer.y // y 正方向
      let maxW = centerPointer.x-cropImgX // x 负方向
      if (_this.movedirective === 'ne') {
        wpWidth = maxE
        wpHeight = maxN
      } else if (_this.movedirective === 'se') {
        wpWidth = maxE
        wpHeight = maxS
      } else if (_this.movedirective === 'sw') {
        wpWidth = maxW
        wpHeight = maxS
      } else if (_this.movedirective === 'nw') {
        wpWidth = maxW
        wpHeight = maxN
      }
      if (wpWidth === 0 || wpHeight === 0) {
        return [0, 0]
      }
      let quadrantPorprotion = wpWidth / wpHeight
      if (quadrantPorprotion < rp) {
        if (rw >= wpWidth) {
          rw = wpWidth
          rh = rw / rp
        }
      } else {
        if (rh >= wpHeight) {
          rh = wpHeight
          rw = rh * rp
        }
      }
      return [rw, rh]
    },
    handleInitDirective(center, event) {
      console.log(center,event)
      if (event.x >= center.x) {
        if (event.y >= center.y) {
          this.movedirective = 'se'
        } else {
          this.movedirective = 'ne'
        }
      } else if (event.x <= center.x) {
        if (event.y >= center.y) {
          this.movedirective = 'sw'
        } else {
          this.movedirective = 'nw'
        }
      }
    },
    mouseUpEvent(event) {
      let _this = this
      let currentX = event.pageX
      let currentY = event.pageY
      let currentMouseDownX = _this.mouseDownCoordinate.x
      let currentMouseDownY = _this.mouseDownCoordinate.y
      if (this.isClickMove) {
        requestAnimationFrame(function() {
          _this.isClickMove = false
          if (_this.requestAnimationFrameId) cancelAnimationFrame(_this.requestAnimationFrameId)
          let lastX = _this.originialWpCoordinate.left + currentX - currentMouseDownX
          let lastY = _this.originialWpCoordinate.top + currentY - currentMouseDownY
          let finalLeft
          let finalTop
          if (lastX >= 0 && lastX + _this.realCropWp.width <= _this.cropImgData.width) {
            finalLeft = lastX
          } else {
            if (lastX < 0) {
              finalLeft = 0
            } else {
              finalLeft = _this.cropImgData.width - _this.realCropWp.width
            }
          }
          if (lastY >= 0 && lastY + _this.realCropWp.height <= _this.cropImgData.height) {
            finalTop = lastY
          } else {
            if (lastY < 0) {
              finalTop = 0
            } else {
              finalTop = _this.cropImgData.height - _this.realCropWp.height
            }
          }
          _this.cropWpCoordinate.left = finalLeft
          _this.cropWpCoordinate.top = finalTop

          _this.originialWpCoordinate.left = finalLeft
          _this.originialWpCoordinate.top = finalTop
        })
      } else if (this.isClickResize) {
        this.isClickResize = false
        _this.requestAnimationFrameId = requestAnimationFrame(function() {
          _this.originialWpCoordinate.width = _this.realCropWp.width
          _this.originialWpCoordinate.height = _this.realCropWp.height
          _this.originialWpCoordinate.top = _this.cropWpCoordinate.top
          _this.originialWpCoordinate.left = _this.cropWpCoordinate.left
        })
      }
    }
  }
}
</script>

<style lang="scss">
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
        .crop-holder {
          display: inline-block;
          user-select: none;
          vertical-align: middle;
          .crop-move {
            width: 100%;
            height: 100%;
            .crop-vline, .crop-hline {
              position: absolute;
              background-image: url('http://pic.qnpic.top/Jcrop.gif');
              background-position: 0 0;
              background-color: #fff;
            }
            .crop-vline {
              height: 100%;
              width: 1px !important;
            }
            .crop-hline {
              width: 100%;
              height: 1px !important;
            }
          }
          .crop-cursor {
            position: absolute;
            top: 0;
            .crop-vblock {
              position: absolute;
              width: 7px;
              height:100%;
              z-index: 370;
            }
            .crop-hblock {
              position: absolute;
              width: 100%;
              height:7px;
              z-index: 370;
            }
            .crop-vblock.ord-e {
              right: 0;
              margin-right: -4px;
              cursor: e-resize;
            }
            .crop-vblock.ord-w {
              left: 0;
              margin-left: -4px;
              cursor: w-resize;
            }
            .crop-hblock.ord-n {
              top: 0;
              margin-top: -4px;
              cursor: n-resize;
            }
            .crop-hblock.ord-s {
              bottom: 0;
              margin-bottom: -4px;
              cursor: s-resize;
            }
            .crop-block {
              width: 7px;
              height: 7px;
              background-color: #33333396;
              border: 1px #eee solid;
              position: absolute;
              z-index: 400;
            }
            .crop-block.ord-nw {
              left: 0;
              top: 0;
              margin-left: -4px;
              margin-top: -4px;
              cursor: nw-resize;
            }
            .crop-block.ord-ne {
              top: 0;
              right: 0;
              margin-top: -4px;
              margin-right: -4px;
              cursor: ne-resize;
            }
            .crop-block.ord-se {
              bottom: 0;
              right: 0;
              margin-bottom: -4px;
              margin-right: -4px;
              cursor: se-resize;
            }
            .crop-block.ord-sw {
              bottom: 0;
              left: 0;
              margin-bottom: -4px;
              margin-left: -4px;
              cursor: sw-resize;
            }
            .crop-tracker {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              cursor: move;
              z-index: 360;
            }
          }
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