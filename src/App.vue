<script setup lang="ts">
import { ref } from "vue";

const colors = [
  "rgb(250, 250, 250)",
  "rgb(34,34,34)",
  "rgb(59, 130, 246)",
  "rgb(239, 68, 68)",
  "rgb(34, 197, 94)",
  "rgb(249, 115, 22)",
  "rgb(99, 102, 241)",
  "rgb(234, 179, 8)",
];

const svg = ref("");
const color = ref(colors[0]);

// const borderColor = computed(() => {
//   const colors = color.value.slice(color.value.indexOf("(") + 1, -1);

//   return `rgba(${colors}, 0.1)`;
// });
</script>

<template>
  <div
    class="p-2 h-screen grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-2"
  >
    <div class="border-2 rounded-2 overflow-hidden">
      <textarea
        class="w-full h-full outline-none p-2 resize-none"
        v-model="svg"
        placeholder="Paste your svg here to preview"
      ></textarea>
    </div>
    <!-- :style="{
      borderColor: borderColor,
    }" -->
    <div class="border-2 rounded-2 relative overflow-hidden bg-dark">
      <div
        class="w-full h-full p-2"
        :style="{
          backgroundColor: color,
        }"
        v-html="svg"
      ></div>
      <div
        class="absolute bottom-4 left-4 border-2 rounded-2 p-1.5 flex gap-1.5 bg-gray-200"
      >
        <div
          v-for="(bgColor, idx) in colors"
          :style="{ backgroundColor: bgColor }"
          class="w-8 h-8 rounded-1 cursor-pointer"
          :key="idx"
          @click="color = bgColor"
        ></div>
      </div>
    </div>
  </div>
</template>
