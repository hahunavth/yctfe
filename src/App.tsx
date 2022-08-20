import React from "react";
import "./App.css";
import PrefectureList from "./components/PrefectureList";
import Chart from "./components/Chart";
import axios from "axios";
import { API_ENDPOINT, authHeader, Prefecture } from "@/api";
import { CheckboxProps } from "./components/Checkbox";
import PrefectureProvider, {
  PrefectureContext,
} from "./context/PrefectureContext";

function App() {
  return (
    <PrefectureProvider>
      <div className="block">
        <PrefectureContext.Consumer>
          {(context) => (
            <PrefectureList
              prefList={context.prefList}
              reqStt={context.reqStt}
              setPrefList={context.setPrefList}
              setReqStt={context.setReqStt}
            />
          )}
        </PrefectureContext.Consumer>
      </div>
      <div className="block block--chart">
        <PrefectureContext.Consumer>
          {(context) => (
            <Chart
              prefectureList={context.prefList.filter(
                (pre: any) => pre.selected === true
              )}
            />
          )}
        </PrefectureContext.Consumer>
      </div>
    </PrefectureProvider>
  );
}

export default App;
