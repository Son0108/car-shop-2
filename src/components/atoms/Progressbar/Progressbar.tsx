interface ProgressbarProps {
  value?: number;
  max: number;
}

const Progressbar = ({ value = 0, max }: ProgressbarProps) => (
  <div className="relative max-h-auto w-full bg-gray-100 rounded-md border h-3 overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full bg-primary-600 transition-all"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

export default Progressbar;
