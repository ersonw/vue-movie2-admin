<template>
  <div :class="classObj" class="app-wrapper">
    <audio ref="audio" preload="auto" src="" />
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!--      <right-panel v-if="showSettings">-->
      <!--        <settings />-->
      <!--      </right-panel>-->
    </div>
  </div>
</template>

<script>
// import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar,
  // Settings,
  Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import { info } from '@/api/dashboard'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    // RightPanel,
    // Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      audio: undefined,
      audios: [],
      countDownTime: 0,
      interval: null
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    this.countDown()
  },
  mounted() {
    this.$refs.audio.addEventListener('ended', () => {
      this.$refs.audio.muted = false
      this.audios.splice(0, 1)
      if (this.audios.length > 0) {
        this.$refs.audio.src = this.audios[0]
        // this.$refs.audio.load()
        this.$refs.audio.play()
      }
      console.log(this.audios)
    })
  },
  methods: {
    countDown() {
      this.interval = setInterval(() => {
        if (this.countDownTime > 0) {
          if (window.document.hidden === false) this.countDownTime--
        } else {
          clearInterval(this.interval)
          // this.getAll()
          this.getnews()
        }
      }, 1000)
    },
    getnews() {
      info().then(response => {
        const { list } = response
        for (let i = 0; i < list.length; i++) {
          switch (list[i].type) {
            case 6:
              this.audios.unshift('/sounds/cashout.mp3')
              break
            case 7:
              this.audios.unshift('/sounds/shortVideo.mp3')
              break
            case 3:
              this.audios.unshift('/sounds/diamond.mp3')
              break
            case 4:
              this.audios.unshift('/sounds/game.mp3')
              break
            case 1:
              this.audios.unshift('/sounds/membership.mp3')
              break
          }
        }
        if (this.audios.length > 0) {
          this.$refs.audio.src = this.audios[0]
          this.$refs.audio.play()
        }
        this.countDownTime = 30
        this.countDown()
      })
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
