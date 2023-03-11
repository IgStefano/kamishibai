export default function Divider() {
  return (
    <div className="my-4 flex items-center text-center text-[0.5rem] italic text-gray-400 before:flex-1 before:border-b before:border-solid before:border-gray-400 before:content-[''] after:flex-1 after:border-b after:border-solid after:border-gray-400 after:content-[''] [&:not(empty)::before]:mr-1 [&:not(empty)::after]:ml-1">
      ou
    </div>
  );
}
