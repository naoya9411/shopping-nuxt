<template>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-2">
        <h1 class="text-subtitle-1">ご注文者情報</h1>
        <v-divider class="mb-4"></v-divider>
        <div>
          <div>氏名</div>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="personalInfo.orderer.lastName"
                outlined
                dense
                placeholder="姓"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="personalInfo.orderer.firstName"
                outlined
                dense
                placeholder="名"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <div>郵便番号</div>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="personalInfo.orderer.postalCode"
                outlined
                dense
                placeholder="1234567"
              ></v-text-field>
            </v-col>
          </v-row>
          <div>都道府県</div>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="personalInfo.orderer.prefecture"
                outlined
                dense
                :items="prefectures"
                placeholder="都道府県を選択"
              ></v-select>
            </v-col>
          </v-row>
          <div>以降の住所</div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="personalInfo.orderer.address"
                outlined
                dense
                placeholder="〇〇区〇〇1-1-1 サンプルマンション101F"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <div>電話番号</div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="personalInfo.orderer.phoneNumber"
                outlined
                dense
                placeholder="09012345678"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <div>メールアドレス</div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="personalInfo.orderer.email"
                outlined
                dense
                placeholder="xxx@sample.co.jp"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="pa-2">
        <h1 class="text-subtitle-1">配送先</h1>
        <v-divider class="mb-4"></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="personalInfo.sameAddress">
              <v-radio label="注文者情報と同じ" :value="true"></v-radio>
              <v-radio label="別の住所" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <template v-if="!personalInfo.sameAddress">
          <div>
            <div>氏名</div>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="personalInfo.delivery.lastName"
                  outlined
                  dense
                  placeholder="姓"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="personalInfo.delivery.firstName"
                  outlined
                  dense
                  placeholder="名"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <div>
            <div>郵便番号</div>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="personalInfo.delivery.postalCode"
                  outlined
                  dense
                  placeholder="1234567"
                ></v-text-field>
              </v-col>
            </v-row>
            <div>都道府県</div>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="personalInfo.delivery.prefecture"
                  outlined
                  dense
                  :items="prefectures"
                  placeholder="都道府県を選択"
                ></v-select>
              </v-col>
            </v-row>
            <div>以降の住所</div>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="personalInfo.delivery.address"
                  outlined
                  dense
                  placeholder="〇〇区〇〇1-1-1 サンプルマンション101F"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <div>
            <div>電話番号</div>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="personalInfo.delivery.phoneNumber"
                  outlined
                  dense
                  placeholder="09012345678"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="pa-2">
        <h1 class="text-subtitle-1">お支払い方法</h1>
        <v-divider class="mb-4"></v-divider>
        <v-radio-group v-model="personalInfo.payment">
          <v-radio label="代金引換" value="onDelivery"></v-radio>
          <v-radio label="コンビニ払い" value="conveni"></v-radio>
        </v-radio-group>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-btn block color="primary" @click="onClick">次へ</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
import { PersonalInfo } from '@/server/api'
import prefectureList from '@/assets/prefecture.json'

@Component({})
export default class extends Vue {
  prefectures = prefectureList
  personalInfo: PersonalInfo = {
    sameAddress: true,
    orderer: {
      firstName: '',
      lastName: '',
      postalCode: '',
      prefecture: '',
      address: '',
      phoneNumber: '',
      email: '',
    },
    delivery: {
      firstName: '',
      lastName: '',
      firstNameKana: '',
      lastNameKana: '',
      prefecture: '',
      address: '',
      phoneNumber: '',
    },
    payment: 'onDelivery',
  }

  mounted() {
    // セッションから情報取得
  }

  onClick() {
    axios.post('/api/address', this.personalInfo).then(() => {
      this.$router.push('/order-step/confirm')
    })
  }
}
</script>
