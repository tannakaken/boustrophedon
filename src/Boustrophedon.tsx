import { useCallback, useEffect, useState } from 'react';

/**
 * 一行の文字数でパラグラフを切っていく。
 * 禁則処理が必要な文字については、調節する。
 * その行が、行全体にわたる文字かどうかをリストに含める。
 */
const splitStringByLength = (line: string, length = 32, acc: [string, boolean][] = []): [string, boolean][] => {
  if (line.length <= length) {
    return [...acc, [line, false]];
  } else {
    const rest = line.substring(length);
    const head = line.substring(0, length);
    const headOfRest = rest.charAt(0);
    if (headOfRest === "。" || headOfRest === "、") {
      if (rest.length === 1) {
        return [...acc, [line, false]];
      }
      return splitStringByLength(rest.substring(1), length, [...acc, [`${head}${headOfRest}`, true]])
    }
    return splitStringByLength(rest, length, [...acc, [head, true]]);
  }
}

/**
 * 画面の幅によって一行の文字数を変える。
 */
const calcLineLength = (width: number) => {
  if (width > 800) {
    return 32;
  }
  if (width > 700) {
    return 28;
  }
  if (width > 600) {
    return 20;
  }
  if (width > 500) {
    return 14;
  }
  if (width > 400) {
    return 12;
  }
  return 10;
}

type LineProps = {
  /**
   * 表示する行。
   */
  line: string;
  /**
   * 行全体にわたる文字列かどうか。
   */
  full: boolean;
  /**
   * 何行目か
   */
  lineIndex: number;
  /**
   * 逆牛耕式かどうか
   */
  reverse: boolean | undefined;
}

/**
 * 行の表示。
 */
const Line = ({line, full, lineIndex, reverse}: LineProps) => {
  return (<div 
    style={{
      display: "inline-block",
      textAlignLast: full ? "justify" : "left",
      transform: lineIndex % 2 === 0 ? undefined : reverse ? "rotate(180deg)" : "scale(-1, 1)",
      width: "100%",
    }}>
    {line}
  </div>)
};

type ParagraphProps = {
  /**
   * 親要素のid。ユニークなキーのために必要
   */
  parentId: string;
  /**
   * 一行ずつ分解されたパラグラフ。行全体の文字列かどうかの情報も含む。
   */
  splitedParagraph: [string, boolean][];
  /**
   * 何番目のパラグラフかどうか。ユニークなキーのために必要。
   */
  paragraphIndex: number;
  /**
   * パラグラフの始めが何行目か
   */
  startLineIndex: number;
  /**
   * 逆牛耕式かどうか
   */
  reverse: boolean | undefined;
};

/**
 * 段落の表示
 */
const Paragraph = ({parentId, splitedParagraph, paragraphIndex, startLineIndex, reverse}: ParagraphProps) => (
  <div>
    {splitedParagraph
      .map(([line, full], index) => {
        return (
          <Line
            key={`${parentId}-paragraph-${paragraphIndex}-line-${index}`}
            line={line}
            full={full}
            lineIndex={startLineIndex + index}
            reverse={reverse}/>
        );
      })
    }
  </div>);

type Props = {
  /**
   * 表示する文字列。
   */
  body: string;
  /**
   * この要素のid。ユニークなキーのために必要。
   */
  id: string;
  /**
   * 逆牛耕式かどうか
   */
  reverse?: boolean;
}



/**
 * 文字を牛公式に表示するUI
 */
export const Boustrophedon = (props: Props) => {
  const [lineLength, setLineLength] = useState(calcLineLength(window.innerWidth));
  useEffect(() => {
    /**
     * ウィンドウサイズがリサイズするときに調節する。
     */
    const onResize = () => {
      setLineLength(calcLineLength(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

  /**
   * 全体の中で何行目かを計算しながら、UIを構築していく。
   */
  const paragraphReducer: (acc: [JSX.Element[], number], paragraph: string, index: number) => [JSX.Element[], number] = useCallback((acc: [JSX.Element[], number], paragraph: string, index: number) => {
    const [elements, startLineIndex] = acc;
    const splitedParagraph = splitStringByLength(paragraph, lineLength);
    return [
      [
        ...elements, 
        (<Paragraph 
          key={`${props.id}-paragraph-${index}`}
          parentId={props.id}
          splitedParagraph={splitedParagraph}
          paragraphIndex={index}
          startLineIndex={startLineIndex}
          reverse={props.reverse}
        />)
      ],
      startLineIndex + splitedParagraph.length] // 次の段落の最初の行の全体の行数
    }, [lineLength, props.id, props.reverse]);
  return (
    <div id={props.id} className='container'>
      {props.body.split("\n")
        .reduce(paragraphReducer, [[], 0])[0] // 構築したUIだけ取り出す。
      }
    </div>);
}