import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Border = styled.div.attrs((props) => ({
  style: props.inFocus ? { border: "1px solid orange" } : {},
}))`
  height: 100%;
  border: 1px solid black;
  padding: 1px;
  margin: 1px;
`;

const AddButton = styled.button`
  padding: 2px;
  &::before {
    content: "Add child";
    display: inline;
  }
`;

const RemoveButton = styled.button`
  padding: 2px;
  outline: none;
  color: red;
  &::before {
    content: "×";
    display: inline;
  }
`;

const Input = styled.input`
  appearance: none;
  width: 100px;
  border: none;
  margin: 0 5px;
  cursor: default;

  :focus {
    cursor: auto;
    outline: none;
    border-bottom: 1px solid #575757;
  }
`;

const Description = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  border: none;
  margin: 1px 0 0;
  cursor: default;
  border: 1px solid #2b2b2b;

  :focus {
    cursor: auto;
    outline: none;
  }
`;

const Bit = (props) => {
  const [state, setState] = useState({
    inFocus: false,
    inside: [],
    deleted: false,
    justClicked: false,
  });

  const addChild = (e) => {
    e.stopPropagation();
    setState((s) => ({
      ...s,
      inside: [
        ...s.inside,
        <Bit
          key={uuidv4()}
          listID={uuidv4()}
          removeMe={removeChild}
          moveFocus={props.moveFocus}
          setRemovefocus={props.setRemovefocus}
        />,
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

  const handleClick = (event) => {
    event.stopPropagation();
    setState((s) => ({
      ...s,
      justClicked: true,
    }));
    if (!state.inFocus) {
      setState((s) => ({
        ...s,
        inFocus: true,
      }));
    }
  };

  const blurThis = () => {
    setState((s) => ({
      ...s,
      inFocus: false,
    }));
  };

  useEffect(() => {
    if (state.deleted) {
      props.removeMe(props.listID);
    }
  }, [state.deleted, props]);

  const { moveFocus, setRemovefocus } = props;

  useEffect(() => {
    if (state.justClicked) {
      moveFocus();
      setRemovefocus((s) => [...s, blurThis]);
      setState((s) => ({
        ...s,
        justClicked: false,
      }));
    }
  }, [moveFocus, setRemovefocus, state.justClicked]);

  return (
    <Border onClick={handleClick} name="border" inFocus={state.inFocus}>
      {props.children}
      <Input
        type="text"
        name="BitTitle"
        placeholder="Untitled bit"
        autoComplete="off"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(event) => {
          if (event.isComposing) return;
          if (event.key === "Enter" || event.key === "Escape")
            document.activeElement.blur();
        }}
      />
      <AddButton onClick={addChild} type="button" name="addButton" />
      <RemoveButton onClick={removeThisBit} type="button" name="RemoveButton" />

      {state.inFocus && (
        <Description
          type="text"
          name="BitDescription"
          placeholder="Describe bit"
          autoComplete="off"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            if (event.isComposing) return;
            if (event.key === "Enter" || event.key === "Escape")
              document.activeElement.blur();
          }}
        />
      )}

      {state.inside}
    </Border>
  );
};

Bit.defaultProps = {
  listID: 0,
  removeMe: () => console.log("pepOMEGAKEKHappyChampHands"),
};

export default Bit;
