<template>
  <v-row>
    <v-col cols="12" justify="center" class="text-center">
      <div class="my-16">
        <h1 class="text-h1 font-weight-medium blue--text mb-2">THANK YOU!!</h1>
        <p>ご注文ありがとうございました</p>
        <p class="text-caption">ご注文番号：{{ orderNumber }}</p>
      </div>
      <div class="text-subtitle-1">
        <p>下記メールアドレスに注文完了メールを<br />送信しました</p>
        <p>{{ email }}</p>
      </div>
    </v-col>
    <v-col cols="12">
      <v-btn to="/" block color="primary">TOPへ戻る</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  email = ''
  orderNumber = '00213244534'
}
</script>
