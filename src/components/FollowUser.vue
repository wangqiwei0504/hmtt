<template>
  <van-button
    class="follow-btn"
    v-if="value"
    round
    :loading="loading"
    size="small"
    @click="onClick"
    >已关注</van-button
  >

  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="loading"
    size="small"
    icon="plus"
    @click="onClick"
    >关注</van-button
  >
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onClick () {
      this.loading = true
      try {
        if (this.value) {
          await delUser(this.target)
        } else {
          await addUser(this.target)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
