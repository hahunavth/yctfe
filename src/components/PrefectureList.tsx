import React from "react";
import Checkbox, { CheckboxProps } from "./Checkbox";

type Props = {
  prefList: CheckboxProps[];
  reqStt: "success" | "fail" | "loading";
  setPrefList: React.Dispatch<React.SetStateAction<CheckboxProps[]>>;
  setReqStt: React.Dispatch<
    React.SetStateAction<"success" | "fail" | "loading">
  >;
};

const PrefectureList = ({
  prefList,
  reqStt,
  setPrefList,
  setReqStt,
}: Props) => {
  const onClickCheckBox = React.useCallback(
    (props: CheckboxProps) => {
      setPrefList((state) =>
        state.map((v) =>
          // eslint-disable-next-line react/prop-types
          v.prefCode === props.prefCode ? { ...v, selected: !v.selected } : v
        )
      );
    },
    [setPrefList]
  );

  if (reqStt === "success")
    return (
      <div className="grid-container">
        {prefList.map((prop) => (
          <Checkbox key={prop.prefCode} {...prop} onClick={onClickCheckBox} />
        ))}
      </div>
    );
  else if (reqStt === "fail") {
    return (
      <div>
        <div>Load failed!</div>
        <button onClick={() => setReqStt("loading")}>reload</button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default PrefectureList;
