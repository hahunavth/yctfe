import React from "react";
import axios from "axios";
import Checkbox, { CheckboxProps } from "./Checkbox";
import { isAsteriskToken } from "typescript";
import { API_ENDPOINT, authHeader, Prefecture } from "@/api";

const PrefectureList = () => {
  const [reqStt, setReqStt] = React.useState<"success" | "fail" | "ilde">(
    "ilde"
  );
  const [prefList, setPrefList] = React.useState<CheckboxProps[]>([]);

  React.useEffect(() => {
    (async () => {
      axios
        .get(`${API_ENDPOINT}api/v1/prefectures`, {
          headers: authHeader,
        })
        .then((response) => {
          setReqStt("success");
          const result = response.data?.result as Prefecture[];
          setPrefList(
            result.map((pre) => ({
              ...pre,
              selected: false,
            }))
          );
        })
        .catch((r) => setReqStt("fail"));
    })();

    (async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}api/v1/population/composition/perYear`,
          {
            params: { prefCode: 1, cityCode: "-" },
            headers: authHeader,
          }
        );
        const data = response.data?.result.data[0].data;
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      {prefList.map((prop) => (
        <Checkbox
          key={prop.prefCode}
          {...prop}
          onClick={() => {
            setPrefList((state) =>
              state.map((v) =>
                v.prefCode === prop.prefCode
                  ? { ...v, selected: !v.selected }
                  : v
              )
            );
          }}
        />
      ))}
    </div>
  );
};

export default PrefectureList;
