import Input from "@components/form/input";
import { AnimatePresence, motion } from "framer-motion";
import type { ActivityClient } from "@components/form/checkbox/checkbox-wrapper";
import { ActivitiesWrapper } from "@components/form/checkbox/checkbox-wrapper";
import TextArea from "@components/form/textarea";
import { useState } from "react";

interface QuestModalProps {
  type: "new" | "edit";
}

export default function QuestModule({ type }: QuestModalProps) {
  const [formActivities, setFormActivities] = useState<ActivityClient[]>([]);

  const id = `${type}-quest`;

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
