import React from "react";
import "./App.css";
import CheckBox from "@/components/Checkbox";
import PrefectureList from "./components/PrefectureList";

function App() {
  // const [checkBoxList, setCheckBoxList] = React.useState(
  //   new Array(10).fill({
  //     name: "fakdja",
  //     selected: false,
  //   })
  // );

  return (
    <div className="App">
      {/* {checkBoxList.map((prop, i) => (
        <CheckBox
          key={i}
          {...prop}
          onClick={() => {
            setCheckBoxList((state) =>
              state.map((v: any, id: any) =>
                i === id ? { ...v, selected: !v.selected } : v
              )
            );
          }}
        />
      ))} */}
      <PrefectureList />
    </div>
  );
}

export default App;
