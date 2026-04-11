"use client";

interface EquipmentToggleProps {
  label: string;
  icon: string;
  active: boolean;
  onToggle: () => void;
}

export function EquipmentToggle({ label, icon, active, onToggle }: EquipmentToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        active
          ? "bg-green-100 border-2 border-green-500 text-green-800"
          : "bg-zinc-100 border-2 border-zinc-200 text-zinc-400"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {active && <span className="ml-0.5">&#10003;</span>}
    </button>
  );
}
