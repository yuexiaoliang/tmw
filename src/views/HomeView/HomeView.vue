<script setup lang="ts">
import { toRefs } from "vue";
import { useCounterStore } from "@/stores/counter";
const { count, doubleCount, increment } = toRefs(useCounterStore());
</script>

<template>
  {{ count }}
  --
  {{ doubleCount }}

  <button @click="increment">+</button>
</template>
