<template>
  <div>
    <h3>ご注文内容確認</h3>
    <v-card class="my-4 pa-2">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left black--text">
                <span class="text-h6 font-weight-black">お支払い合計</span
                >(税込)
              </th>
              <th class="text-right black--text">
                <span class="text-h6 font-weight-black">{{
                  calcTotalAmount
                }}</span
                >円
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>商品合計</td>
              <td class="text-right">
                <span class="font-weight-black">{{
                  itemAmount.toLocaleString()
                }}</span
                >円
              </td>
            </tr>
            <tr>
              <td>送料</td>
              <td class="text-right">
                <span class="font-weight-black">{{
                  shippingAmount.toLocaleString()
                }}</span
                >円
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card class="my-4 pa-2">
      <div class="d-flex justify-space-between">
        <div class="mb-2 text-h6 font-weight-black">お届け先</div>
        <v-btn to="/order-step/address" outlined class="blue--text">変更</v-btn>
      </div>
      <v-divider class="mb-2"></v-divider>
      <ul class="pl-0">
        <li
          v-for="val in checkInfo.delivery"
          :key="val"
          class="my-0"
          style="list-style: none"
        >
          {{ val }}
        </li>
      </ul>
    </v-card>
    <v-card class="my-4 pa-2">
      <div class="d-flex justify-space-between">
        <div class="mb-2 text-h6 font-weight-black">ご注文者情報</div>
        <v-btn to="/order-step/address" outlined class="blue--text">変更</v-btn>
      </div>
      <v-divider class="mb-2"></v-divider>
      <template v-if="checkInfo.sameAddress">
        <p>お届け先と同じ</p>
        <p>{{ checkInfo.orderer.email }}</p>
      </template>
      <template v-else>
        <ul>
          <li v-for="val in checkInfo.orderer" :key="val">{{ val }}</li>
        </ul>
      </template>
    </v-card>
    <v-card class="my-4 pa-2">
      <div class="d-flex justify-space-between">
        <div class="mb-2 text-h6 font-weight-black">お支払い方法</div>
        <v-btn to="/order-step/address" outlined class="blue--text">変更</v-btn>
      </div>
      <v-divider class="mb-2"></v-divider>
      <p>{{ checkInfo.payment }}</p>
    </v-card>
    <v-card class="pa-4">
      <div v-for="cartItem in cartList" :key="cartItem.item.id">
        <div class="d-flex">
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
            <p>
              <span class="text-h6">{{
                cartItem.item.price.toLocaleString()
              }}</span
              >円
            </p>
            <p>{{ cartItem.item.producer }}</p>
            <p>個数：{{ cartItem.number }}</p>
          </div>
        </div>

        <v-divider class="my-2"></v-divider>
      </div>
    </v-card>
    <v-btn block color="primary" @click="onClick">次へ</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'

type CheckInfo = {
  sameAddress: boolean
  orderer: {
    fullName: string
    postalCode: string
    address: string
    phoneNumber: string
    email: string
  }
  delivery: {
    fullName: string
    postalCode: string
    address: string
    phoneNumber: string
  }
  payment: string
}

@Component({})
export default class extends Vue {
  itemAmount = 0
  shippingAmount = 0

  get calcTotalAmount() {
    return (this.itemAmount + this.shippingAmount).toLocaleString()
  }

  checkInfo: CheckInfo = {
    sameAddress: true,
    orderer: {
      fullName: '',
      postalCode: '',
      address: '',
      phoneNumber: '',
      email: '',
    },
    delivery: {
      fullName: '',
      postalCode: '',
      address: '',
      phoneNumber: '',
    },
    payment: '',
  }

  cartList = []

  async mounted() {
    try {
      const res = await axios.get('/api/orderinfo')

      const { cartList, personalInfo, itemAmount, shippingAmount } = res.data
      console.log(res.data)
      const { sameAddress, orderer, delivery, payment } = personalInfo
      if (sameAddress) {
        this.checkInfo.sameAddress = sameAddress
        this.checkInfo.delivery.fullName = orderer.lastName + orderer.firstName
        this.checkInfo.delivery.postalCode = orderer.postalCode
        this.checkInfo.delivery.address = orderer.prefecture + orderer.address
        this.checkInfo.delivery.phoneNumber = orderer.phoneNumber
        this.checkInfo.orderer.phoneNumber = orderer.email
      } else {
        this.checkInfo.sameAddress = sameAddress
        this.checkInfo.orderer.fullName = orderer.lastName + orderer.firstName
        this.checkInfo.orderer.postalCode = orderer.postalCode
        this.checkInfo.orderer.address = orderer.prefecture + orderer.address
        this.checkInfo.orderer.phoneNumber = orderer.phoneNumber
        this.checkInfo.orderer.phoneNumber = orderer.email
        this.checkInfo.sameAddress = sameAddress
        this.checkInfo.delivery.fullName =
          delivery.lastName + delivery.firstName
        this.checkInfo.delivery.postalCode = delivery.postalCode
        this.checkInfo.delivery.address = delivery.prefecture + delivery.address
        this.checkInfo.delivery.phoneNumber = delivery.phoneNumber
      }
      this.checkInfo.payment = payment
      this.cartList = cartList
      this.itemAmount = itemAmount
      this.shippingAmount = shippingAmount
    } catch (e) {
      console.log(e)
      this.$router.push('/error')
    }
  }

  getImageUrl(url: string) {
    return require('@/assets/' + url)
  }

  onClick() {
    axios
      .get('/api/payment')
      .then(() => {
        this.$router.push('/order-step/finish')
      })
      .catch(() => {
        this.$router.push('/error')
      })
  }
}
</script>
