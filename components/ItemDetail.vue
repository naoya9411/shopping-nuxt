<template>
  <v-row justify="center" class="mt-6">
    <v-col cols="12">
      <h1 class="text-h6 text-left">商品詳細</h1>
    </v-col>
    <template v-if="item">
      <v-col cols="10">
        <template v-if="item.imageUrl1">
          <img
            :src="getImageUrl(item.imageUrl1)"
            height="300"
            alt=""
            class="mb-4"
          />
        </template>
        <template v-else>
          <img
            src="@/assets/items/sample.png"
            height="300"
            alt=""
            class="mb-4"
          />
        </template>
        <h1 class="text-h5 mb-8">{{ item.name }}</h1>
        <p>{{ item.price.toLocaleString() }}円</p>
        <p>{{ item.producer }}</p>
        <p v-if="item.description">{{ item.description }}</p>
      </v-col>
      <v-col cols="3">
        <p>注文個数</p>
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="number"
          outlined
          dense
          :items="getNumRange()"
        ></v-select>
      </v-col>
      <v-col cols="10">
        <v-btn block color="primary" @click="addCart">カートに追加</v-btn>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Item } from '@/server/api'
import axios from 'axios'

@Component({})
export default class extends Vue {
  itemId = ''
  item: Item | null = null
  number = '1'

  mounted() {
    this.itemId = this.$route.params.id
    // 商品情報取得
    axios
      .get(`/api/item-detail/${this.itemId}`)
      .then((res) => (this.item = res.data))
  }

  getNumRange() {
    return [...Array(60).keys()].map((i) => ++i)
  }

  addCart() {
    axios.post('/api/add-cart', {
      itemId: this.itemId,
      number: this.number,
    })
    this.$router.push('/order-step/cart')
  }

  getImageUrl(url: string) {
    return require('@/assets/' + url)
  }
}
</script>
