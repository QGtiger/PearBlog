<template>
  <div class="qg-input">
    <input class="qg-input--inner"
      @focus="handleFocusQgFormInput" @blur="handleBlurQgFormInput($event)" :placeholder="placeholder" :type="type" 
      @input="handleInput"
      @change="handleChange"
      v-model.trim="currentValue">
    <div class="qg-input--border">
      <div class="qg-input-line"></div>
      <div class="qg-focus-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QgInput',
  props: {
    type: {
      type: String,
      default() {
        return 'text'
      }
    },
    placeholder: {
      type: String,
      default () {
        return 'Please input somthing...'
      }
    },
    value: {

    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    // currentValue: function () {
    //   return this.value
    // }
  },
  watch: {
    value() {
      // console.log('vhange')
      // this.currentValue = this.value.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  methods: {
    handleFocusQgFormInput (e) {
      var dom = e.target
      dom.parentNode.classList.add('is-focus')
      dom.parentNode.parentNode.parentNode.classList.add('is-focus')
    },
    handleBlurQgFormInput (e) {
      var dom = e.target
      dom.parentNode.classList.remove('is-focus')
      dom.parentNode.parentNode.parentNode.classList.remove('is-focus')
      this.$emit('validate-field')
    },
    handleInput () {
      this.$emit('input', this.currentValue)
    },
    handleChange(){
      this.$emit('input', this.currentValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.qg-input--inner {
  padding: 0
}
.qg-input{
  width: 100%;
  position: relative;
  line-height: 35px;
  &.is-disabled{
    .qg-input--inner{
      cursor: not-allowed;
    }
  }
  .qg-input--inner{
    border: none;
    outline: none;
    -webkit-appearance: none;
    background-color: transparent;
    background-image: none;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 35px;
    font-size: 14px;
    line-height: 35px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &::-webkit-input-placeholder {
      color: #ccc;
      font-size: 12px;
    }
  }
  .qg-textarea-inner {
    background: #f8f8fa;
    font-family: PingFang SC;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 7px 12px;
    border-radius: 5px;
    font-size: 14px;
    resize: none;
    border: none;
    outline: none;
    height: 85px;
    line-height: 20px;
  }
  .qg-upload-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: rgba(248, 248, 250, 1);
    border-radius: 3px;
    color:  #CBCCD2;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .qg-input--border {
    .qg-input-line {
      position: absolute;
      bottom: -1px;
      width: 100%;
      left: 0;
      height: 1px;
      background: #ccc;
    }
    .qg-focus-line {
      box-sizing: border-box;
      position: absolute;
      bottom: -1px;
      width: 100%;
      left: 0;
      right:0;
      height: 2px;
      background: #7B27C4;
      transition: transform .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);
      transform: scaleX(0);
    }
  }
}

.is-focus {
  .qg-focus-line {
    transform: scaleX(1) !important;
  }
}
</style>