<template>
  <v-row justify="center" align="center" class="mt-6">
    <v-col cols="12">
      <h1 class="text-h6 text-left">カート</h1>
    </v-col>
    <template v-if="!cartItemList[0]">
      <v-col md="6" cols="12" class="text-center">
        <p class="mb-10">カートに商品がありません</p>
        <v-btn outlined block color="indigo" to="/">TOPへ戻る</v-btn>
      </v-col>
    </template>
    <template v-else>
      <v-col v-for="cartItem in cartItemList" :key="cartItem.item.id" cols="12">
        <v-card class="pa-4 d-flex" to="/order-step/address">
          <div class="mr-6">
            <template v-if="cartItem.item.imageUrl1">
              <img
                :src="getImageUrl(cartItem.item.imageUrl1)"
                height="150"
                alt=""
              />
            </template>
            <template v-else>
              <img src="@/assets/items/sample.png" height="150" alt="" />
            </template>
          </div>
          <div>
            <p class="text-h5">{{ cartItem.item.name }}</p>
            <p>{{ cartItem.item.producer }}</p>
            <p>
              <span class="text-h6">{{
                cartItem.item.price.toLocaleString()
              }}</span
              >円
            </p>
            <!-- <v-select
              v-model="number"
              outlined
              dense
              :items="getNumRange()"
            ></v-select> -->
            <p>注文個数：{{ cartItem.number }}</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" md="6">
        <v-btn to="/order-step/address" block color="primary"
          >購入手続きへ</v-btn
        >
      </v-col>
      <v-col cols="10" md="6">
        <v-btn to="/" block outlined color="blue">買い物を続ける</v-btn>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
import { CartItem } from '@/server/api'

@Component({
  components: {},
})
export default class extends Vue {
  cartItemList: CartItem[] = []

  mounted() {
    axios.get('/api/cart').then((res) => (this.cartItemList = res.data))
    // axios.get('/api/cart').then((res) => console.log(res))
  }

  getImageUrl(url: string) {
    return require('@/assets/' + url)
  }

  getNumRange() {
    return [...Array(60).keys()].map((i) => ++i)
  }
}
</script>
