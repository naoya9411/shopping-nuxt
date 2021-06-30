<template>
  <div>
    <StepBar :step-num="1" />
    <Address />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Address from '@/components/OrderStep/Address.vue'
import StepBar from '@/components/OrderStep/StepBar.vue'

@Component({
  components: {
    StepBar,
    Address,
  },
})
export default class extends Vue {}
</script>
