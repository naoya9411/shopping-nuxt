<template>
  <Finish />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Finish from '@/components/OrderStep/Finish.vue'

@Component({
  components: {
    Finish,
  },
})
export default class extends Vue {}
</script>
