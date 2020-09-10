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
      <p>233</p>
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
  data () {
    return {

    }
  },
  mounted() {},
  methods: {
    handleCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
.qg-cropper-dialog {
  color: #303133 !important;
}
</style>