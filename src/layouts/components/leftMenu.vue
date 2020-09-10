<template>
  <div class="left-menu-cont">
    <div class="left-main-menu">
      <!-- SVG Sprite -->
      <div style="height: 0; width: 0; position: absolute; visibility: hidden;" aria-hidden="true">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false">
          <symbol id="ripply-scott" viewBox="0 0 100 100">
            <circle id="ripple-shape" cx="1" cy="1" r="1" />
          </symbol>
        </svg>
      </div>
      <ul class="left-aside">
        <li
          v-for="(item,index) in leftMenu"
          :key="'leftMain'+index"
          :class="{'active-item': $route.matched.some(x => x.path === item.path)}"
          class="nav-item"
        >
        <router-link :to="item.path">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </router-link>
        <svg class="ripple-obj" id="js-ripple">
					<use height="100" width="100" xlink:href="#ripply-scott" class="js-ripple"></use>
				</svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import leftMenu from '@/assets/json/leftMenu.js'
export default {
  data () {
    return {
      leftMenu: leftMenu,
      currentPath: '' //当前 path
    }
  },
  watch: {
    $route(to) {
      this.currentPath = to.path
    }
  },
  mounted () {
    this.currentPath = this.$route.path
    let ripplyScott = this.handleRipplyScottInit()
    ripplyScott.init('.nav-item', 0.75);
  },
  methods: {
    handleRipplyScottInit () {

      function rippleAnimation(event, timing, dom) {
        // eslint-disable-next-line no-undef
        var tl = new TimelineMax(),
            x = event.offsetX,
            y = event.offsetY,
            w            = event.target.offsetWidth,
            h            = event.target.offsetHeight,
            offsetX      = Math.abs( (w / 2) - x ),
            offsetY      = Math.abs( (h / 2) - y ),
            deltaX       = (w / 2) + offsetX,
            deltaY       = (h / 2) + offsetY,
            scale_ratio  = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        tl.fromTo(dom.querySelector('.js-ripple'), timing, {
          x: x,
          y: y,
          transformOrigin: '50% 50%',
          scale: 0,
          opacity: 1,
          // eslint-disable-next-line no-undef
          ease: Linear.easeIn
        },{
          scale: scale_ratio,
          opacity: 0
        });

        return tl;
      }

      return {
        init: function(target, timing) {
          var button = document.querySelectorAll(target);
          button.forEach(dom => {
            dom.addEventListener('click', function(event) {
              let clickDom = this
              rippleAnimation.call(this, event, timing, clickDom);
            });
          })
        }
      };
    }
  }
}
</script>

<style lang="scss" scoped>
$themeColor: #262f41;

.ripple-obj {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  fill: #146ead;
  use {
    opacity: 0;
  }
}

.left-menu-cont {
  height: 100vh;
  position: fixed;
  .left-main-menu {
    width: 120px;
    height: 100%;
    padding-top: 15px;
    background-color: $themeColor;
    position: relative;
    .left-aside {
      li {
        transition: all .3s ease;
        position: relative;
        a {
          color: #ecf5ff;
          height: 40px;
          width: 100%;
          display: inline-block;
          line-height: 40px;
          padding-left: 10px;
          box-sizing: border-box;
          font-size: 14px;
          transition: all .3s ease;
          span {
            padding-left: 5px;
          }
        }
        &:not(.active-item):hover {
          background-color: #4a556b;
        }
      }
      .active-item {
        background-image: linear-gradient(90deg, #447aef 0%, #447aef 5%, #447aef49 5%, transparent);
      }
    }
  }
}
</style>