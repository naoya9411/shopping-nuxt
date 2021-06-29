<template>
  <v-row justify="center" class="mt-6">
    <v-col cols="12">
      <h1 class="text-h6 text-left">商品一覧</h1>
    </v-col>
    <v-col v-for="item in items" :key="item.id" cols="12">
      <v-card class="pa-4 d-flex" :to="`/item/${item.id}`">
        <div class="mr-6">
          <template v-if="item.imageUrl1">
            <img :src="getImageUrl(item.imageUrl1)" height="150" alt="" />
          </template>
          <template v-else>
            <img src="@/assets/items/sample.png" height="150" alt="" />
          </template>
        </div>
        <div>
          <p class="text-h5">{{ item.name }}</p>
          <p>
            <span class="text-h6">{{ item.price.toLocaleString() }}</span
            >円
          </p>
          <p>{{ item.producer }}</p>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
import { Item } from '@/server/api'

@Component({})
export default class extends Vue {
  items: Item[] = []

  async mounted() {
    const res = await axios.get('/api/itemlist')
    this.items = res.data
  }

  getImageUrl(url: string) {
    return require('@/assets/' + url)
  }
}
</script>
