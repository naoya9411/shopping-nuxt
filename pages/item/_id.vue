<template>
  <ItemDetail />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ItemDetail from '@/components/ItemDetail.vue'

@Component({
  components: {
    ItemDetail,
  },
})
export default class extends Vue {}
</script>
