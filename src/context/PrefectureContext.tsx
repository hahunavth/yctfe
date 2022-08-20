import React, { ReactNode } from "react";
import axios from "axios";
import { API_ENDPOINT, authHeader, Prefecture } from "@/api";
import { CheckboxProps } from "@/components/Checkbox";

export const PrefectureContext = React.createContext<any>(null);

type Props = {
  children: ReactNode;
};

export default function PrefectureProvider(props: Props) {
  const [reqStt, setReqStt] = React.useState<"success" | "fail" | "loading">(
    "loading"
  );
  const [prefList, setPrefList] = React.useState<CheckboxProps[]>([]);

  React.useEffect(() => {
    if (reqStt === "loading")
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
  }, [reqStt]);

  return (
    <PrefectureContext.Provider
      value={{
        reqStt,
        prefList,
        setReqStt,
        setPrefList,
      }}
    >
      {props.children}
    </PrefectureContext.Provider>
  );
}
