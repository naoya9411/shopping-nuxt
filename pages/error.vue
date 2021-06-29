<template>
  <v-row justify="center" align="center" class="mt-16">
    <v-col cols="12">
      <p>エラーが発生しました。最初からやり直してください。</p>
    </v-col>
    <v-col cols="12">
      <v-btn to="/" block outlined color="primary">TOPへ戻る</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {}
</script>
