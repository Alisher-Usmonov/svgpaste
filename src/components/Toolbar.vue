<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import { ofetch } from "ofetch";

const { open, onChange } = useFileDialog({
  accept: ".svg",
});

onChange((files) => {
  const file = files?.[0];
  const reader = new FileReader();

  reader.readAsText(file as File);

  reader.onload = () => {
    emit("update:modelValue", reader.result);
  };
});

const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const importFromUrl = async () => {
  const url = prompt("Enter url for svg");
  const fetched = await ofetch(url as string);

  const reader = new FileReader();

  reader.readAsText(fetched as File);

  reader.onload = () => {
    emit("update:modelValue", reader.result);
  };
};

const download = () => {
  const blob = new Blob([modelValue], { type: "image/svg+xml" });

  // Create a link element with the download attribute set to the filename.
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "svgpaste");

  // Append the link element to the DOM and click it.
  document.body.appendChild(link);
  link.click();

  // Remove the link element from the DOM.
  document.body.removeChild(link);
};
</script>

<template>
  <div
    class="bg-gray-200 rounded-b-2 p-1 hidden md:flex justify-between text-sm"
  >
    <div class="flex gap-x-2">
      <button
        class="flex items-center gap-1 p-2 bg-[#212A3E] rounded-1 text-white"
        @click="open()"
      >
        <div class="i-carbon-document-add text-lg"></div>
        Import from file
      </button>
      <button
        class="flex items-center gap-1 p-2 bg-[#212A3E] rounded-1 text-white"
        @click="importFromUrl"
      >
        <div class="i-carbon-link text-lg"></div>
        Import from URL
      </button>
    </div>
    <div>
      <button
        class="flex items-center gap-1 p-2 bg-[#212A3E] rounded-1 text-white"
        @click="download"
      >
        <div class="i-carbon-download text-lg"></div>
        Download
      </button>
    </div>
  </div>
</template>
