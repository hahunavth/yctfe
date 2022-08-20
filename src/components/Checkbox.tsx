import { Prefecture } from "@/api/types";
import React from "react";

export type CheckboxProps = Prefecture & {
  selected?: boolean;
  onClick?: () => any;
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <span style={{ padding: "10px" }}>
      <input
        type={"checkbox"}
        checked={props.selected || false}
        onChange={props.onClick}
      />
      <span>{props.prefName}</span>
    </span>
  );
};

export default Checkbox;
