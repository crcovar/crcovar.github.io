import type { Unit } from "./App";
import { GearIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "../ui/button";
import { SettingsRow } from "./SettingsRow";

interface SettingsProps {
  units: Unit[];
  onToggle: (name: string, enabled: boolean) => void;
}
export default function Settings({ units, onToggle }: SettingsProps) {
  const settingsRows = units.map((unit) => (
    <SettingsRow key={unit.name} unit={unit} onToggle={onToggle} />
  ));

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="hover:bg-green-50">
          <GearIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogClose />
        </DialogHeader>
        {settingsRows}
      </DialogContent>
    </Dialog>
  );
}
