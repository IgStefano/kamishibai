export default function Label({
  text,
  required = false,
  htmlFor,
}: {
  text: string;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label className="pb-1 text-xs text-burgundy" htmlFor={htmlFor}>
      {text} {required && " *"}
    </label>
  );
}
