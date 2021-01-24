import { useState, useEffect } from "react";
import styled from "styled-components";

const Border = styled.div`
  height: 100%;
  border: 1px solid black;
  padding: 1px;
  margin: 1px;
`;

const AddButton = styled.button`
  &::before {
    content: "+";
    display: inline;
  }
`;

const Bit = (props) => {
  const [state, setState] = useState({ inFocus: false, inside: 0 });

  const addChild = (e) => {
    e.stopPropagation();
    setState((s) => ({
      ...s,
      inside: s.inside + 1,
    }));
  };

  const toggleFocus = (e) => {
    e.stopPropagation();
    if (e.target.getAttribute("name") === "border") {
      setState((s) => ({
        ...s,
        inFocus: !s.inFocus,
      }));
    }
  };

  useEffect(() => {
    console.log("inFocus:", state.inFocus);
  }, [state.inFocus]);

  return (
    <Border onClick={toggleFocus} name="border">
      <AddButton onClick={addChild} type="button" name="addButton" />
      {props.children}
      {Array(state.inside)
        .fill()
        .map((e, i) => (
          <Bit key={i}>{i}</Bit>
        ))}
    </Border>
  );
};

export default Bit;
