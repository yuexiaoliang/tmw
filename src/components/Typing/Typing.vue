<script setup lang="ts">
import { computed, ref } from "vue";
import data from "./data";

const { ws, tws, map } = data;

// current word index
const cwi = ref();

// current letter index
const cli = ref();

// current translate word
const ctw = computed(() => tws[cwi.value]);

const inputEle = ref();
const inputVal = ref("");
const isFocus = ref(false);
const onInput = () => {
  if (cwi.value >= ws.length) return;

  if (!cwi.value) {
    cwi.value = 0;
  }

  if (!cli.value) {
    cli.value = 0;
  }

  // current word
  const cw = ws[cwi.value].word;

  // current letter
  const cl = cw[cli.value];

  if (inputVal.value === cl) {
    cli.value += 1;
    if (cli.value === cw.length) {
      cwi.value += 1;
      cli.value = 0;
    }
  }
  inputVal.value = "";
};

const onRestart = () => {
  cwi.value = null;
  cli.value = null;
  inputEle.value.focus();
};
</script>

<template>
  <input
    ref="inputEle"
    v-model="inputVal"
    id="input"
    @blur="isFocus = false"
    @focus="isFocus = true"
    @input="onInput"
  />
  <div class="large-tw">{{ ctw?.word || "" }}</div>
  <div
    class="typing"
    :class="{ 'typing--focus': isFocus }"
    @click="inputEle.focus()"
  >
    <div class="paragraph-wrapper">
      <span
        v-for="(word, index) in ws"
        :key="index"
        class="word"
        :class="{
          'word--passed': cwi > index,
          'word--space': word.afterSpace,
        }"
      >
        <i
          v-for="(letter, i) in word.word"
          :key="i"
          class="letter"
          :class="{
            'letter--passed': cwi === index && cli > i,
          }"
          >{{ letter }}</i
        >
      </span>
    </div>

    <div class="translate-wrapper">
      <span
        v-for="(word, index) in tws"
        :key="index"
        class="word"
        :class="{
          'word--current': map[cwi] === index,
        }"
      >
        {{ word.word }}
      </span>
    </div>
  </div>

  <div class="ctrl-buttons">
    <button class="button" @click="onRestart">重新开始</button>
  </div>
</template>

<style lang="scss" scoped>
.large-tw {
  height: 2em;
  line-height: 2em;
  text-align: center;
  font-weight: bold;
  font-size: 50px;
}

.typing {
  padding: 20px;
  margin: 0 20px;
  text-align: center;
  box-shadow: 0 0 5px #ccc;
  border-radius: 10px;
  font-size: var(--font-size);

  &--focus {
    box-shadow: 0 0 10px #ccc;
  }

  .paragraph-wrapper {
    font-size: 1.5em;
    .word {
      &--passed {
        color: var(--color-passed);
      }

      &--space {
        margin-right: 8px;
      }
    }

    .letter {
      font-style: normal;

      &--passed {
        color: var(--color-passed);
      }
    }
  }

  .translate-wrapper {
    margin-top: 20px;
    font-size: 2em;

    .word {
      color: var(--color-passed);

      &--current {
        color: var(--color-highlight);
        font-weight: bold;
      }
    }
  }
}

.ctrl-buttons {
  margin-top: 30px;
  text-align: center;

  .button {
    display: inline-block;
    padding: 0 15px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba($color: #000, $alpha: 0.03);
    }

    &:active {
      background-color: rgba($color: #000, $alpha: 0.06);
    }
  }
}

#input {
  position: fixed;
  top: -10000px;
  left: -10000px;
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  outline: 0;
  overflow: hidden;
}
</style>
