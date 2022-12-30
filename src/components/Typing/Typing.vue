<script setup lang="ts">
import { computed, ref } from "vue";
import data from "./data";

const inputEle = ref();
const inputVal = ref("");
const isFocus = ref(false);
const isFinished = ref(false);

// 当前段落索引
const cpi = ref(0);
// 当前段落
const cp = computed(() => data[cpi.value]);
// 单词列表
const ws = computed(() => cp.value.ws);
// 单词列表的翻译
const tws = computed(() => cp.value.tws);
// 单词和单词翻译的映射关系
const map = computed(() => cp.value.map);

// 当前单词索引
const cwi = ref(0);
// 当前单词
const cw = computed(() => ws.value[cwi.value].word);
// 当前单词的翻译
const ctw = computed(() => tws.value[cwi.value]);

// 当前字母索引
const cli = ref(0);
// 当前字母
const cl = computed(() => cw.value[cli.value]);

// 是否最后一个段落
const isLastParagraph = computed(() => cpi.value === data.length - 1);

// 是否最后一个单词
const isLastWord = computed(() => cwi.value === ws.value.length - 1);

// 是否最后一个字母
const isLastLetter = computed(() => cli.value === cw.value.length - 1);

const onInput = () => {
  const v = inputVal.value;
  inputVal.value = "";

  if (isFinished.value) return;

  if (v !== cl.value) return;

  // 如果不是最后一个字母
  if (!isLastLetter.value) {
    cli.value += 1;
    return;
  }

  cli.value = 0;
  // 如果不是最后一个单词
  if (!isLastWord.value) {
    cwi.value += 1;
    return;
  }

  // 如果不是最后一个段落
  if (!isLastParagraph.value) {
    cwi.value = 0;
    cpi.value += 1;
  } else {
    cwi.value += 1;
    isFinished.value = true;
    inputEle.value.blur();
  }
};

const onRestart = () => {
  cpi.value = 0;
  cwi.value = 0;
  cli.value = 0;
  isFinished.value = false;
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
    <button v-show="isFinished" class="button" @click="onRestart">
      重新开始
    </button>
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
