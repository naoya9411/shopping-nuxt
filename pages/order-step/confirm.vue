<template>
  <div>
    <StepBar :step-num="2" />
    <Confirm />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import StepBar from '@/components/OrderStep/StepBar.vue'
import Confirm from '@/components/OrderStep/Confirm.vue'

@Component({
  components: {
    StepBar,
    Confirm,
  },
})
export default class extends Vue {}
</script>
