<template>
  <div>
    <div class="channel_container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          size="small"
          round
          type="danger"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channelList" :key="item.id">
          <div
            class="inner"
            @click="onClick(index)"
            :style="{ color: index === active ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon name="close" v-if="index !== 0" v-show="isCloseShow" />
          </div>
        </van-col>
      </van-row>

      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { getAllArticleList, saveChannels } from '@/api/home'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPannel',
  props: {
    channelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      // console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channelList.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channelList.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) {
          return
        }
        this.recommendChannels.push(this.channelList[index])
        this.channelList.splice(index, 1)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channelList: {
      deep: true,
      async handler (newVal) {
        // console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          // console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel_container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      line-height: 36px;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    line-height: 86px;
    text-align: center;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    color: #222222;
    margin-left: 14px;
    margin-bottom: 22px;
    position: relative;
    .van-icon-close {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
