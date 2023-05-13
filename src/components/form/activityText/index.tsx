import Checkbox from "../checkbox";

interface ActivityTextProps {
  value: string;
}

export default function ActivityText({ value }: ActivityTextProps) {
  return <Checkbox label={value} name={value} id={value} />;
}
