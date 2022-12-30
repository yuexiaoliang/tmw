interface Word {
  word: string;
  afterSpace?: boolean;
}

type Paragraph = string;
type Words = Word[];
type TranslateParagraph = string;
type TranslateWords = Word[];

type Map = {
  [key: number | string]: number;
};

interface DataItem {
  p: Paragraph;
  ws: Words;
  tp: TranslateParagraph;
  tws: TranslateWords;
  map: Map;
}

const data: DataItem[] = [
  {
    p: "Typing memorize words.",
    ws: [
      {
        word: "Typing",
        afterSpace: true,
      },
      {
        word: "memorize",
        afterSpace: true,
      },
      {
        word: "words",
      },
      {
        word: ".",
      },
    ],
    tp: "打字背单词",
    tws: [{ word: "打字" }, { word: "背" }, { word: "单词" }, { word: "。" }],
    map: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
  },
  {
    p: "Redefine memorizing words.",
    ws: [
      {
        word: "Redefine",
        afterSpace: true,
      },
      {
        word: "memorizing",
        afterSpace: true,
      },
      {
        word: "words",
      },
      {
        word: ".",
      },
    ],
    tp: "重新定义背诵单词。",
    tws: [
      { word: "重新定义" },
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
  },
  {
    p: "It looks like it's pretty awesome.",
    ws: [
      {
        word: "It",
        afterSpace: true,
      },
      {
        word: "looks",
        afterSpace: true,
      },
      {
        word: "like",
        afterSpace: true,
      },
      {
        word: "it's",
        afterSpace: true,
      },
      {
        word: "pretty",
        afterSpace: true,
      },
      {
        word: "awesome",
        afterSpace: true,
      },
      {
        word: ".",
      },
    ],
    tp: "它看起来好像很厉害。",
    tws: [
      { word: "它" },
      { word: "看起来" },
      { word: "好像" },
      { word: "很" },
      { word: "厉害" },
      { word: "。" },
    ],
    map: {
      0: 0,
      1: 1,
      2: 2,
      4: 3,
      5: 4,
      6: 5,
    },
  },
];

export default data;
