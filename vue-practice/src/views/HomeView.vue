<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
// import Line from '../components/LineView.vue'
import RefPractice from '../components/RefPracticeIndex.vue'
import { ref } from 'vue'

const msg = ref('msg')
</script>

<template>
  <!-- <main>
    <TheWelcome />
    <Line />
  </main> -->
  <!-- <FlexRender /> -->
  <RefPractice :msg="msg" />
</template>
