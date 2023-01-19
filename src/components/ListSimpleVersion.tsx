import styled from "@emotion/styled";
import React, { FC, useRef, useState} from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

let setHeight = 500;
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
  height: ${() => `${setHeight}px`};
`;

export interface ListProps {
  items: string[];
  maxChildren?: number;
}

export const List: FC<ListProps> = ({ items, maxChildren = 100 }) => {
  setHeight = items.length * 30;

  const ref = useRef<HTMLDivElement>(null);
  const [curBottom, setCurBottom] = useState(maxChildren);
  const scrollPosition = useScrollPosition(ref);
  const itemsIndex = Math.floor(scrollPosition / 30);
  console.log('scrollPosition', scrollPosition, 'itemsIndex', itemsIndex, 'curBottom', curBottom);
  if (itemsIndex > curBottom - 20) {
    setCurBottom(Math.max(itemsIndex + maxChildren, curBottom + maxChildren));
    console.log('setHeight', setHeight, 'curBottom', curBottom);
  }
  const displayItems = items.slice(0, curBottom);
  return (
    <ScrollWrapper ref={ref}>
      <ListWrapper>
        {/**
          * Note: `SafelyRenderChildren` should NOT be removed while solving
          * this interview. This prevents rendering too many list items and
          * potentially crashing the web page. This also enforces an artificial
          * limit (5,000) to the amount of children that can be rendered at one
          * time during virtualization.
        */}
        <SafelyRenderChildren>
          {displayItems.map((word) => <Item key={word}>{word}</Item>)}
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
