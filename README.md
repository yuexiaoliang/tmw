# tmw

https://tmw.li

Typing memorize words.

打字练习，同时背单词。

分两行，第一行为普通的打字功能，第二行为翻译（根据数据显示对应翻译）。每到一个单词，都高亮对应的翻译词。

## 功能

- [x] 打字
- [x] 翻译高亮
- [ ] 自动读词

## 实现思路

1. 通过将一条句子进行分词，分词按照顺序进行排列生成数据，并且还需要知道是否需要空格隔开。比如：

```js
// 原句: Typing memorize words.

// 翻译: 打字背单词

// 数据:
{
  p: "Typing memorize words.",
  ws: [
    { word: "Typing", afterSpace: true, },
    { word: "memorize", afterSpace: true, },
    { word: "words", },
    { word: ".", },
  ],
  tp: "打字背单词",
  tws: [
    { word: "打字" },
    { word: "背" },
    { word: "单词" },
    { word: "。" },
  ],
}
```

2. 按照顺序排列到打字区，以及翻译区，输入每个词的时候，高亮对应的翻译词，这里要注意的是打字区的顺序可能和翻译区的顺序不一致，所以我们还需要知道对应关系。比如：

```js
// 原句: Typing memorize words.

// 翻译: 打字背单词

// 数据:
{
  p: "Typing memorize words.",
  ws: [
    { word: "Typing", afterSpace: true, },
    { word: "memorize", afterSpace: true, },
    { word: "words", },
    { word: ".", },
  ],
  tp: "打字背单词",
  tws: [
    { word: "打字" },
    { word: "背" },
    { word: "单词" },
    { word: "。" },
  ],
  map: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
  },
}
```

3. 每次到一个新词的时候，自动朗读。
