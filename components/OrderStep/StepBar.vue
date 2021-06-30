<template>
  <v-stepper :value="stepNum" alt-labels style="box-shadow: none !important">
    <v-stepper-header>
      <v-stepper-step step="1">注文情報入力</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2">注文内容確認</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">注文完了</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop()
  stepNum!: string
}
</script>
