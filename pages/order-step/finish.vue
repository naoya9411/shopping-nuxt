<template>
  <div>
    <StepBar :step-num="3" />
    <Finish />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import StepBar from '@/components/OrderStep/StepBar.vue'
import Finish from '@/components/OrderStep/Finish.vue'

@Component({
  components: {
    StepBar,
    Finish,
  },
})
export default class extends Vue {}
</script>
