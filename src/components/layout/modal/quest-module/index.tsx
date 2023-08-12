import Input from "@components/form/input";
import { AnimatePresence, motion } from "framer-motion";
import type { ActivityClient } from "@components/form/checkbox/checkbox-wrapper";
import { ActivitiesWrapper } from "@components/form/checkbox/checkbox-wrapper";
import TextArea from "@components/form/textarea";
import { useContext, useState } from "react";
import { ActivityStatus } from "@/src/types/shared.types";
import type { Quest } from "@/src/types/shared.types";
import { ModalContext } from "@/src/contexts/modal";

interface QuestModalProps {
  type: "new" | "edit";
  populate?: Quest;
}

export default function QuestModule({ type }: QuestModalProps) {
  const { modalOptions } = useContext(ModalContext);
  const { populate } = modalOptions;

  const [formActivities, setFormActivities] = useState<ActivityClient[]>(
    populate?.quest?.activities.map((activity) => {
      return {
        activityName: activity.name,
        activityStatus: ActivityStatus[
          activity.status
        ] as keyof typeof ActivityStatus,
      };
    }) || []
  );

  const id = `${type}-quest`;

  return (
    <form id={id} className="flex flex-col gap-4">
      <Input
        label="Nome da Aventura"
        name="questName"
        required
        maxLength={64}
        value={populate?.quest?.name}
      />
      <Input
        label="Data de Início"
        name="startDate"
        required
        type="date"
        value={populate?.quest?.startDate.toString()}
      />
      <Input
        label="Objetivo"
        name="mainObjective"
        required
        maxLength={64}
        value={populate?.quest?.mainObjective}
      />
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Input
        label="Recompensa"
        name="reward"
        maxLength={64}
        value={populate?.quest?.reward}
      />
      <Input
        label="Nível Recomendado"
        name="recommendedLevel"
        value={populate?.quest?.recommendedLevel?.toString()}
      />
      <TextArea
        label="Descrição"
        name="description"
        maxLength={1280}
        value={populate?.quest?.description}
      />
    </form>
  );
}
