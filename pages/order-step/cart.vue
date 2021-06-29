<template>
  <Cart />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Cart from '@/components/OrderStep/Cart.vue'

@Component({
  components: {
    Cart,
  },
})
export default class extends Vue {}
</script>
