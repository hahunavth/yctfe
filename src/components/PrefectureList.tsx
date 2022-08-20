import React from "react";
import axios from "axios";
import Checkbox, { CheckboxProps } from "./Checkbox";
import { API_ENDPOINT, authHeader, Prefecture } from "@/api";

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
          v.prefCode === props.prefCode ? { ...v, selected: !v.selected } : v
        )
      );
    },
    [setPrefList]
  );

  if (reqStt === "success")
    return (
      <div>
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
