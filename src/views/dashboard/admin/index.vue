<template>
  <div class="dashboard-editor-container">
    <!--    <github-corner class="github-corner" />-->

    <!--    <panel-group :line-chart-data="lineChartDatas" @handleSetLineChartData="handleSetLineChartData" />-->

    <!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--      <line-chart :chart-data="lineChartData" />-->
    <!--    </el-row>-->

    <!--    <el-row :gutter="32">-->
    <!--      <el-col :xs="24" :sm="24" :lg="8">-->
    <!--        <div class="chart-wrapper">-->
    <!--          <pie-chart />-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="24" :sm="24" :lg="8">-->
    <!--        <div class="chart-wrapper">-->
    <!--          <bar-chart />-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <div style="text-align-all: center"><h5 style="color: #2ac06d;">距离下次自动刷新剩余<span style="color: red;">{{ countDownTime }}</span>秒</h5></div>
    <div><h2 style="color: black">充值数据</h2></div>
    <div class="panel-group">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashInAll')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总充值
              </div>
              <count-to :start-val="0" :end-val="cashInAll" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashInToday')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                今日充值
              </div>
              <count-to :start-val="0" :end-val="cashInToday" :duration="3200" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashInYesterday')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                昨日充值
              </div>
              <count-to :start-val="0" :end-val="cashInYesterday" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div><h2 style="color: black">游戏提现数据</h2></div>
    <div class="panel-group">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashOutAll')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总提现
              </div>
              <count-to :start-val="0" :end-val="cashOutAll" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashOutToday')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                今日提现
              </div>
              <count-to :start-val="0" :end-val="cashOutToday" :duration="3200" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashOutYesterday')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                昨日提现
              </div>
              <count-to :start-val="0" :end-val="cashOutYesterday" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('cashOutOrders')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                未处理订单
              </div>
              <count-to :start-val="0" :end-val="cashOutOrders" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div><h2 style="color: black">用户数据</h2></div>
    <div class="panel-group">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('usersAll')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总用户
              </div>
              <count-to :start-val="0" :end-val="usersAll" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('usersToday')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                今日新增
              </div>
              <count-to :start-val="0" :end-val="usersToday" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('usersYesterday')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                昨日新增
              </div>
              <count-to :start-val="0" :end-val="usersYesterday" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div><h2 style="color: black">会员数据</h2></div>
    <div class="panel-group">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('membershipAll')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总会员
              </div>
              <count-to :start-val="0" :end-val="membershipAll" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('membershipToday')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                今日新增
              </div>
              <count-to :start-val="0" :end-val="membershipToday" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('membershipYesterday')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                昨日新增
              </div>
              <count-to :start-val="0" :end-val="membershipYesterday" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div><h2 style="color: black">长视频数据</h2></div>
    <div class="panel-group">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('videosAll')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总长视频数
              </div>
              <count-to :start-val="0" :end-val="videosAll" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('videosToday')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                今日新增
              </div>
              <count-to :start-val="0" :end-val="videosToday" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('videosYesterday')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                昨日新增
              </div>
              <count-to :start-val="0" :end-val="videosYesterday" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div><h2 style="color: black">短视频数据</h2></div>
    <div class="panel-group">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shortAll')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总短视频数
              </div>
              <count-to :start-val="0" :end-val="shortAll" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shortToday')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                今日新增
              </div>
              <count-to :start-val="0" :end-val="shortToday" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shortYesterday')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                昨日新增
              </div>
              <count-to :start-val="0" :end-val="shortYesterday" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shortAudit')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                未处理审核
              </div>
              <count-to :start-val="0" :end-val="shortAudit" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
import CountTo from 'vue-count-to'
import { getAll } from '@/api/dashboard'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'DashboardAdmin',
  components: {
    CountTo
    // GithubCorner,
    // PanelGroup,
    // LineChart,
    // // RaddarChart,
    // PieChart,
    // BarChart
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      // lineChartDatas: {
      //   newVisitis: {
      //     expectedData: [100, 120, 161, 134, 105, 160, 165],
      //     actualData: [120, 82, 91, 154, 162, 140, 145]
      //   },
      //   messages: {
      //     expectedData: [200, 192, 120, 144, 160, 130, 140],
      //     actualData: [180, 160, 151, 106, 145, 150, 130]
      //   },
      //   purchases: {
      //     expectedData: [80, 100, 121, 104, 105, 90, 100],
      //     actualData: [120, 90, 100, 138, 142, 130, 130]
      //   },
      //   shoppings: {
      //     expectedData: [130, 140, 141, 142, 145, 150, 160],
      //     actualData: [120, 82, 91, 154, 162, 140, 130]
      //   }
      // },
      // lineChartData: this.lineChartDatas.newVisitis
      cashInAll: 0,
      cashInToday: 0,
      cashInYesterday: 0,
      cashOutAll: 0,
      cashOutToday: 0,
      cashOutYesterday: 0,
      cashOutOrders: 0,
      usersAll: 0,
      usersToday: 0,
      usersYesterday: 0,
      membershipAll: 0,
      membershipToday: 0,
      membershipYesterday: 0,
      videosAll: 0,
      videosToday: 0,
      videosYesterday: 0,
      shortAll: 0,
      shortToday: 0,
      shortYesterday: 0,
      shortAudit: 0,
      countDownTime: 0,
      interval: null
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // if(this.$store.state.watchNav=="Comment" || this.$store.state.watchNav=="Supplier"){
        //   this.$store.state.activeNum="1-1"
        // }
        // this.$store.state.watchNav=val.name;
        // console.log(val)
        if (val.name !== 'Dashboard') {
          clearInterval(this.interval)
        } else {
          this.countDown()
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.countDown()
    },
    countDown() {
      this.interval = setInterval(() => {
        if (this.countDownTime > 0) {
          this.countDownTime--
        } else {
          clearInterval(this.interval)
          this.getAll()
        }
      }, 1000)
    },
    getAll() {
      getAll().then(data => {
        const {
          cashInAll,
          cashInToday,
          cashInYesterday,
          cashOutAll,
          cashOutToday,
          cashOutYesterday,
          cashOutOrders,
          usersAll,
          usersToday,
          usersYesterday,
          membershipAll,
          membershipToday,
          membershipYesterday,
          videosAll,
          videosToday,
          videosYesterday,
          shortAll,
          shortToday,
          shortYesterday,
          shortAudit
        } = data
        this.cashInAll = cashInAll
        this.cashInToday = cashInToday
        this.cashOutYesterday = cashInYesterday
        this.cashOutAll = cashOutAll
        this.cashOutToday = cashOutToday
        this.cashOutYesterday = cashOutYesterday
        this.cashOutOrders = cashOutOrders
        this.usersAll = usersAll
        this.usersToday = usersToday
        this.usersYesterday = usersYesterday
        this.membershipAll = membershipAll
        this.membershipToday = membershipToday
        this.membershipYesterday = membershipYesterday
        this.videosAll = videosAll
        this.videosToday = videosToday
        this.videosYesterday = videosYesterday
        this.shortAll = shortAll
        this.shortToday = shortToday
        this.shortYesterday = shortYesterday
        this.shortAudit = shortAudit
        this.countDownTime = 30
        this.countDown()
      })
    },
    handleSetLineChartData(type) {
      // this.lineChartData = this.lineChartDatas[type]
      var path = ''
      switch (type) {
        case 'cashInAll':
        case 'cashInToday':
        case 'cashInYesterday':
          path = '/game/gameOrder'
          break
        case 'cashOutAll':
        case 'cashOutToday':
        case 'cashOutYesterday':
        case 'cashOutOrders':
          path = '/game/gameWithdrawOrder'
          break
        case 'usersAll':
        case 'usersToday':
        case 'usersYesterday':
          path = '/users/usersList'
          break
        case 'membershipAll':
        case 'membershipToday':
        case 'membershipYesterday':
          path = '/membership/membershipList'
          break
        case 'videosAll':
        case 'videosToday':
        case 'videosYesterday':
          path = '/av/list'
          break
        case 'shortAll':
        case 'shortToday':
        case 'shortYesterday':
          path = '/shortVideo/list'
          break
        case 'shortAudit':
          path = '/shortVideo/auditVideoList'
          break
        default:
          break
      }
      if (path !== '') this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
