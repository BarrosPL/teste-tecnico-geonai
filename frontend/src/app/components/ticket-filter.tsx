type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TicketFilter({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar por título..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-300 text-slate-800 bg-white px-4 py-3 outline-none focus:border-slate-500"
    />
  );
}