import type { Dispatch, SetStateAction } from "react";
import Description from "./description";
import TitleCard from "./title-card";

interface QuestListItemProps {
  id: string;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
}

export default function QuestListItem({
  id,
  openQuests,
  setOpenQuests,
}: QuestListItemProps) {
  return (
    <li>
      <TitleCard
        id={id}
        setOpenQuests={setOpenQuests}
        openQuests={openQuests}
        editable
        title="Buscar Remédios"
        description="Pra variar, um homem do acampamento se machucou e vai ter que ficar de molho. Bem, vai demorar demais pra ele melhorar sem remédios, então temos que buscar remédios na velha Farmácia do João. Não deve ser muito difícil..."
      />
      <Description
        description="Pra variar, um homem do acampamento se machucou e vai ter que ficar de molho. Bem, vai demorar demais pra ele melhorar sem remédios, então temos que buscar remédios na velha Farmácia do João. Não deve ser muito difícil..."
        objectives={[
          { name: "Encontrar a Farmácia do João", state: "success" },
          {
            name: "Pegar remédios e suprimentos de pronto-socorro",
            state: "success",
          },
          { name: "Não alertar zumbis", state: "failure" },
          {
            name: "Entregar os remédios para o pessoal do acampamento",
            state: "in_progress",
          },
        ]}
        id={id}
        openQuests={openQuests}
        reward='Um "muito obrigado". Duas latas de feijão.'
        startDate={new Date("2023/01/31")}
        title="Buscar Remédios"
      />
    </li>
  );
}
