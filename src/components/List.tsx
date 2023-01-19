import styled from "@emotion/styled";
import React, { FC, useCallback, useRef, useState, useEffect} from "react";
// import { useScrollPosition } from "../hooks/useScrollPosition";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  overflow: auto;
  height: 500px;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;
  /* height: ${() => `${viewportHeight}px`}; */

export interface ListProps {
  items: string[];
  maxChildren?: number;
}

const SETTINGS = {
    minIndex: 1,
    maxIndex: 500,
    startIndex: 1,
    itemHeight: 30,
    amount: 40,
    tolerance: 20
  }
export const List: FC<ListProps> = ({ items }) => {
    SETTINGS.maxIndex = items.length;
    const setInitialState = ( settings:Record<string, any> ):Record<string, any> => {
        const {
            minIndex, maxIndex, startIndex, itemHeight, amount, tolerance} = settings;
        // 1) height of the visible part of the viewport (px)
        const viewportHeight = amount * itemHeight
        // 2) total height of rendered and virtualized items (px)
        const totalHeight = (maxIndex - minIndex + 1) * itemHeight
        // 3) single viewport outlet height, filled with rendered but invisible rows (px)
        const toleranceHeight = tolerance * itemHeight
        // 4) all rendered rows height, visible part + invisible outlets (px)
        const bufferHeight = viewportHeight + 2 * toleranceHeight
        // 5) number of items to be rendered, buffered dataset length (pcs)
        const bufferedItems = amount + 2 * tolerance
        // 6) how many items will be virtualized above (pcs)
        const itemsAbove = startIndex - tolerance - minIndex
        // 7) initial height of the top padding element (px)
        const topPaddingHeight = itemsAbove * itemHeight
        // 8) initial height of the bottom padding element (px)
        const bottomPaddingHeight = totalHeight - topPaddingHeight
        // 9) initial scroll position (px)
        const initialPosition = topPaddingHeight + toleranceHeight
        // initial state object
        return {
          settings,
          viewportHeight,
          totalHeight,
          toleranceHeight,
          bufferHeight,
          bufferedItems,
          topPaddingHeight,
          bottomPaddingHeight,
          initialPosition,
          data:[]
        }
      };

      const [settings, setSettings] = useState(setInitialState(SETTINGS));

  const ref = useRef<HTMLDivElement>(null);
  const { viewportHeight, topPaddingHeight, bottomPaddingHeight, initialPosition, data } = settings;

  const getData = (offset:number, limit:number, items:string[]) => {
    const start = Math.max(SETTINGS.minIndex, offset)
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex)
    return items.slice(start, end);
  }
  const runScroller = useCallback(({ target }:{target?: any}) => {
    const { scrollTop } = target;
    const { totalHeight, toleranceHeight, bufferedItems, settings: { itemHeight, minIndex }} = settings;
    const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
    const data = getData(index, bufferedItems, items);
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0)
    const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)
  
    console.log('scroller', 'index', index, 'totalHeight', totalHeight);
    setSettings({
      ...settings,
      topPaddingHeight,
      bottomPaddingHeight,
      data
    });
  }, []);

  useEffect(() => {
    if(ref?.current) ref.current.scrollTop = initialPosition;
    if (!initialPosition) {
      runScroller({ target: { scrollTop: 0 } });
    }
  }, [initialPosition, runScroller, items]);

  return (
    <ScrollWrapper ref={ref} onScroll={runScroller}>
      <ListWrapper style={{ height: viewportHeight }}>
{/* viewportHeight={viewportHeight} */}
        {/**
          * Note: `SafelyRenderChildren` should NOT be removed while solving
          * this interview. This prevents rendering too many list items and
          * potentially crashing the web page. This also enforces an artificial
          * limit (5,000) to the amount of children that can be rendered at one
          * time during virtualization.
        */}
        <SafelyRenderChildren>
            <li style={{ height: topPaddingHeight }}></li>
            {data.map((word: string) => <Item key={word}>{word}</Item>)}
            <li style={{ height: bottomPaddingHeight }}></li>

        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
