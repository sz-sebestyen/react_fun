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

const RemoveButton = styled.button`
  background-color: red;
  &::before {
    content: "×";
    display: inline;
  }
`;

const Bit = (props) => {
  const [state, setState] = useState({
    inFocus: false,
    inside: [],
    deleted: false,
    idGen: 0,
  });

  const addChild = (e) => {
    e.stopPropagation();
    setState((s) => ({
      ...s,
      idGen: s.idGen + 1,
      inside: [
        ...s.inside,
        <Bit key={s.idGen} listID={s.idGen} removeMe={removeChild}>
          {s.idGen}
        </Bit>,
      ],
    }));
  };

  const removeThisBit = (e) => {
    e.stopPropagation();
    setState((s) => ({
      ...s,
      deleted: true,
    }));
  };

  const removeChild = (listID) => {
    setState((s) => ({
      ...s,
      inside: [...s.inside.filter((child) => child.props.listID !== listID)],
    }));
  };

  const toggleFocus = (e) => {
    //console.log(state.inside);
    e.stopPropagation();
    setState((s) => ({
      ...s,
      inFocus: !s.inFocus,
    }));
  };

  useEffect(() => {
    if (state.deleted) {
      props.removeMe(props.listID);
    }
  }, [state.deleted, props]);

  return (
    <Border onClick={toggleFocus} name="border" listID={props.listID}>
      <AddButton onClick={addChild} type="button" name="addButton" />
      {props.children}
      <RemoveButton onClick={removeThisBit} type="button" name="RemoveButton" />
      {state.inside}
    </Border>
  );
};

Bit.defaultProps = {
  listID: 0,
  removeMe: () => console.log("pepOMEGAKEKHappyChampHands"),
};

export default Bit;
