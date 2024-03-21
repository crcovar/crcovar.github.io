import { useState } from "react";
import UnitRow from "./UnitRow";
import Settings from "./Settings";
import { Button } from "../ui/button";

type UnitType = "banknote" | "coin";

export type Unit = {
  name: string;
  value: number;
  type: UnitType;
  quantity: number;
  enabled: boolean;
};

const initialUnits: Unit[] = [
  {
    name: "Hundreds",
    value: 100,
    type: "banknote",
    quantity: 0,
    enabled: true,
  },
  { name: "Fifties", value: 50, type: "banknote", quantity: 0, enabled: true },
  { name: "Twenties", value: 20, type: "banknote", quantity: 0, enabled: true },
  { name: "Tens", value: 10, type: "banknote", quantity: 0, enabled: true },
  { name: "Fives", value: 5, type: "banknote", quantity: 0, enabled: true },
  {
    name: "Two Dollar Bills",
    value: 2,
    type: "banknote",
    quantity: 0,
    enabled: false,
  },
  {
    name: "One Dollar Bills",
    value: 1,
    type: "banknote",
    quantity: 0,
    enabled: true,
  },
  {
    name: "One Dollar Coins",
    value: 1,
    type: "coin",
    quantity: 0,
    enabled: false,
  },
  {
    name: "Half Dollars",
    value: 0.5,
    type: "coin",
    quantity: 0,
    enabled: false,
  },
  { name: "Quarters", value: 0.25, type: "coin", quantity: 0, enabled: true },
  { name: "Dimes", value: 0.1, type: "coin", quantity: 0, enabled: true },
  { name: "Nickels", value: 0.05, type: "coin", quantity: 0, enabled: true },
  { name: "Pennies", value: 0.01, type: "coin", quantity: 0, enabled: true },
];

export function App() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);

  const total = units.reduce((acc, unit) => {
    return acc + unit.value * (isNaN(unit.quantity) ? 0 : unit.quantity);
  }, 0);

  function onChange(name: string, quantity: number) {
    setUnits((prevUnits) => {
      return prevUnits.map((unit) => {
        if (unit.name === name) {
          return { ...unit, quantity };
        }
        return unit;
      });
    });
  }

  function showOrHide(name: string, enabled: boolean) {
    setUnits((prevUnits) => {
      return prevUnits.map((unit) => {
        if (unit.name === name) {
          return { ...unit, enabled };
        }
        return unit;
      });
    });
  }

  function clear() {
    setUnits((prevUnits) => {
      return prevUnits.map((unit) => {
        return { ...unit, quantity: 0 };
      });
    });
  }

  const rows = units
    .reduce((a: Unit[], c) => (c.enabled ? [...a, c] : a), [])
    .map((unit, index) => (
      <UnitRow
        key={index}
        name={unit.name}
        quantity={unit.quantity}
        onChange={onChange}
      />
    ));

  return (
    <div className="flex flex-col md:items-center">
      <div className="mb-6 flex justify-between md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold">
          Count Cash <small className="text-xs text-gray-400">v1.0.1</small>
        </h1>
        <Settings units={units} onToggle={showOrHide} />
      </div>
      <h2 className="p-4 text-center text-4xl font-semibold text-green-500">
        ${total.toFixed(2)}
      </h2>
      <div className="flex flex-col md:w-2/3 lg:w-1/2">{rows}</div>
      <Button
        onClick={clear}
        variant="outline"
        className="mt-3 hover:bg-green-50"
      >
        Clear
      </Button>
    </div>
  );
}
