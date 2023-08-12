import type { ActivityClient } from "@components/form/checkbox/checkbox-wrapper";
import type { Dispatch, ReactNode } from "react";
import { createContext, useReducer } from "react";

interface QuestForm {
  questName: string;
  startDate: Date;
  mainObjective: string;
  activities: ActivityClient[];
  reward: string;
  recommendedLevel: string | number;
  description: string;
}

type Action = {
  type: "field";
  fieldName: string;
  payload: string | ActivityClient[];
};

const initialState: QuestForm = {
  questName: "",
  startDate: new Date(),
  mainObjective: "",
  activities: [],
  recommendedLevel: "",
  reward: "",
  description: "",
};

export const QuestFormContext = createContext<{
  state: QuestForm;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function reducer(state: QuestForm, action: Action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
  }
}

export const QuestFormProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuestFormContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestFormContext.Provider>
  );
};
