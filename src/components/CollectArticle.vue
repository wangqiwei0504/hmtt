<template>
  <div class="collect-article">
    <van-button
      :class="{ collect: is_collected }"
      :icon="is_collected ? 'star' : 'star-o'"
      @click="onClick"
      :loading="loading"
    />
  </div>
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    art_id: {
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
        if (this.is_collected) {
          await delCollect(this.art_id)
        } else {
          await addCollect(this.art_id)
        }
        this.$emit('update:is_collected', !this.is_collected)
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
.collect-article {
  min-width: 110px;
  .collect {
    color: #ffa500;
  }
}
</style>
