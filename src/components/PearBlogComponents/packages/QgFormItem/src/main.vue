<template>
  <div class="qg-formitem-content">
    <div class="item-label">
      <div v-if="labelIcon" class="label-img"><img class="prepend-label-img" :src="labelIcon" alt=""></div>
      <div class="label-text"><span>{{ labelText }} </span><span v-if="isRequired" class="is-required">*</span></div>
    </div>
    <div class="item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QgFormItem',
  props: {
    labelText: {

    },
    labelIcon: {

    },
    isRequired: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>


<style lang="scss">

.is-error {
  .qg-focus-line {
    background: rgb(244, 67, 54) !important;
  }
  .qg-input-line {
    background: rgb(244, 67, 54) !important;
  }
}

.is-focus {
  .qg-focus-line {
    transform: scaleX(1) !important;
  }
}
</style>
<style lang="scss" scoped>
.qg-formitem-content{
  .item-label {
    line-height: 18px;
    font-size: 12px;
    color: #909399;
    font-weight: 600;
    font-family: serif;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .label-img {
      width: 18px;
      height: 18px;
      .prepend-label-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        vertical-align: top;
      }
    }
    .label-text {
    }
    .label-desc {
      width: 100%;
      font-size: 13px;
      color: #999
    }
    .is-required {
      color: red
    }
  }
}
</style>