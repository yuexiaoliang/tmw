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

interface Data {
  p: Paragraph;
  ws: Words;
  tp: TranslateParagraph;
  tws: TranslateWords;
  map: Map;
}

const data: Data = {
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
};

export default data;
