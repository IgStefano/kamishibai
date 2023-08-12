import { ModalContext } from "@/src/contexts/modal";
import Input from "@components/form/input";
import { useContext, useEffect, useState } from "react";

export default function CampaignModule() {
  const { modalOptions } = useContext(ModalContext);
  const { populate } = modalOptions;

  const [populateValue, setPopulateValue] = useState(
    populate?.campaign?.name || ""
  );

  useEffect(() => {
    setPopulateValue(populate?.campaign?.name || "");
  }, [populate]);

  return (
    <Input
      label="Nome da campanha"
      name="campaignName"
      value={populateValue || ""}
      setPopulate={setPopulateValue}
      required
    />
  );
}
