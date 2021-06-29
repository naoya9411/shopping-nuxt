<template>
  <Top />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Top from '@/components/Top.vue'

@Component({
  components: {
    Top,
  },
})
export default class extends Vue {}
</script>
