<template>
  <div class="overview-page-cont">
    <div class="commodity-list-cont">
      <div class="commodity-card-cont">
        <div class="author-avator-cont">
          <img class="avator-img" src="http://pic.qnpic.top/avator/avator2.png" alt="">
        </div>
        <div class="author-info-cont">
          <p class="author-name">神秘海域</p>
          <p class="author-desc">神秘海域4 是一款类开放世界的游戏。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$CardColor: #2a2c34;
.overview-page-cont {
  .commodity-list-cont {
    margin-top: 20px;
    .commodity-card-cont {
      background-color: $CardColor;
      width: 240px;
      height: 360px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #9bdc28;
        top: 0;
        left: 0;
        clip-path: circle(120px at 80% 20%);
        transition: all .5s ease-in;
      }
      &:hover::before {
        clip-path: circle(260px at 80% -20%);
      }
      .author-avator-cont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 120px;
        transition-duration: .5s;
        border-radius: 100%;
        overflow: hidden;
        box-shadow: 0 0 10px #fff;
        .avator-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &:hover .author-avator-cont {
        transform: translate(-50%, -80%);
        box-shadow: 0 0 10px #fff, -10px 0 30px #f0f, 10px 0 30px #0ff;
      }
      &:hover .author-name {
        transform: translateY(-40px);
      }
      &:hover .author-info-cont .author-desc {
        transform: translateY(-40px);
        opacity: 1;
      }
      .author-info-cont {
        position: absolute;
        top: calc(50% + 70px);
        left: 50%;
        transform: translateX(-50%);
        font-family: cursive;
        transition-duration: 1s;
        width: 100%;
        .author-name {
          text-align: center;
          color: #fff;
          font-weight: 700;
          font-size: 28px;
          transition-duration: 1s;
        }
        .author-desc {
          color: #fff;
          padding: 0 20px;
          padding-top: 20px;
          opacity: 0;
          transition-duration: 1s;
          transition-delay: .1s;
        }
      }
    }
  }
}
</style>
