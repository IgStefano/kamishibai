import Input from "@components/form/input";
import { AnimatePresence, motion } from "framer-motion";
import type { ActivityClient } from "@components/form/checkbox/checkbox-wrapper";
import { ActivitiesWrapper } from "@components/form/checkbox/checkbox-wrapper";
import TextArea from "@components/form/textarea";
import { useContext, useEffect, useState } from "react";
import { getActivityStatus } from "@/src/types/shared.types";
import type { Quest } from "@/src/types/shared.types";
import { ModalContext } from "@/src/contexts/modal";
import { QuestFormContext } from "@/src/contexts/questForm";

interface QuestModalProps {
  type: "new" | "edit";
  populate?: Quest;
}

export default function QuestModule({ type }: QuestModalProps) {
  const { dispatch } = useContext(QuestFormContext);
  const { modalOptions } = useContext(ModalContext);
  const { populate } = modalOptions;

  const id = `${type}-quest`;

  const [formActivities, setFormActivities] = useState<ActivityClient[]>(
    populate?.quest?.activities.map((activity) => {
      return {
        id: activity.id,
        activityName: activity.name,
        activityStatus: getActivityStatus(activity.status),
        questId: activity.questId,
      };
    }) || []
  );

  useEffect(() => {
    if (populate && populate.quest) {
      (Object.keys(populate.quest) as (keyof typeof populate.quest)[]).map(
        (key) => {
          if (key === "activities") {
            return dispatch({
              fieldName: key,
              payload:
                populate.quest &&
                populate.quest.activities.map((activity) => {
                  return {
                    ...activity,
                    activityName: activity.name,
                    activityStatus: getActivityStatus(activity.status),
                  };
                }),
              type: "field",
            });
          }
          dispatch({
            fieldName: key === "name" ? "questName" : key,
            payload:
              populate.quest &&
              populate.quest[key as keyof typeof populate.quest],
            type: "field",
          });
        }
      );
    }
  }, []);

  return (
    <form id={id} className="flex flex-col gap-4">
      <Input
        label="Nome da Aventura"
        name="questName"
        required
        maxLength={64}
      />
      <Input label="Data de Início" name="startDate" required type="date" />
      <Input label="Objetivo" name="mainObjective" required maxLength={64} />
      <div id="activities">
        <Input
          label="Atividades"
          name=""
          addNew
          placeholder="Adicionar mais uma atividade"
          maxLength={64}
          activities={formActivities}
          setActivities={setFormActivities}
        />
        <AnimatePresence>
          {formActivities.length > 0 && (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ActivitiesWrapper
                activities={formActivities}
                setActivities={setFormActivities}
                editMode
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Input label="Recompensa" name="reward" maxLength={64} />
      <Input label="Nível Recomendado" name="recommendedLevel" />
      <TextArea label="Descrição" name="description" maxLength={1280} />
    </form>
  );
}
