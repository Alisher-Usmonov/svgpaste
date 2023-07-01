<script setup lang="ts">
import { ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { useDebounceFn } from "@vueuse/core";

import Toolbar from "@/components/Toolbar.vue";

const extensions = [html(), oneDark];

const colors = [
  "rgb(250, 250, 250)",
  "rgb(34,34,34)",
  "rgb(59, 130, 246)",
  "rgb(239, 68, 68)",
  "rgb(34, 197, 94)",
  "rgb(99, 102, 241)",
  "rgb(234, 179, 8)",
];

const svg = ref(localStorage.getItem("code") || "");
const color = ref(localStorage.getItem("color") || colors[0]);

const handleChange = useDebounceFn(() => {
  localStorage.setItem("code", svg.value);
}, 2000);

const colorChange = useDebounceFn(() => {
  localStorage.setItem("color", color.value);
}, 2000);

watch(color, colorChange);
</script>

<template>
  <div
    class="p-2 h-screen grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-2 font-sans"
  >
    <div
      class="border-2 rounded-2 overflow-hidden flex flex-col justify-between gap-1"
    >
      <Toolbar v-model="svg" />
      <div class="h-full rounded-2 overflow-hidden">
        <codemirror
          v-model="svg"
          placeholder="Paste your SVG here..."
          :style="{ height: '100%' }"
          class=""
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
          @change="handleChange"
        />
      </div>
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
          class="w-8 h-8 rounded-1 cursor-pointer flex items-center justify-center"
          :key="idx"
          @click="color = bgColor"
        >
          <span
            class="i-carbon-checkmark text-xl"
            :class="color === bgColor ? 'text-white' : 'text-white/0'"
          ></span>
        </div>
        <div
          class="w-8 h-8 rounded-1 cursor-pointer flex items-center justify-center overflow-hidden relative"
        >
          <input
            type="color"
            class="w-0 h-0"
            id="color-input"
            v-model="color"
          />
          <label
            for="color-input"
            :style="{ backgroundColor: color }"
            class="block w-full h-full flex items-center justify-center cursor-pointer"
          >
            <span class="i-carbon-paint-brush text-white text-xl"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
