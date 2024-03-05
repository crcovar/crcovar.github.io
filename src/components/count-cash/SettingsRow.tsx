import { Switch } from "@components/ui/switch";
import { Label } from "@components/ui/label";
import type { Unit } from "./App";

interface SettingsRowProps {
  unit: Unit;
  onToggle: (name: string, enabled: boolean) => void;
}

export function SettingsRow({ unit, onToggle }: SettingsRowProps) {
  function handleCheckedChange() {
    onToggle(unit.name, !unit.enabled);
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={unit.name}
        checked={unit.enabled}
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor={unit.name}>{unit.name}</Label>
    </div>
  );
}
