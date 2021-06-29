<template>
  <Confirm />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Confirm from '@/components/OrderStep/Confirm.vue'

@Component({
  components: {
    Confirm,
  },
})
export default class extends Vue {}
</script>
