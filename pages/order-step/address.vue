<template>
  <Address />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Address from '@/components/OrderStep/Address.vue'

@Component({
  components: {
    Address,
  },
})
export default class extends Vue {}
</script>
