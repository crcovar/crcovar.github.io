import { Input } from "../ui/input";

export default function UnitRow({ name, quantity, onChange }) {
  function updateQuantity(event) {
    let value = parseInt(event.target.value.replace(/[^0-9]/g, ""));
    onChange(name, value);
  }

  const qty = isNaN(quantity) || quantity === 0 ? "" : quantity;

  return (
    <Input
      type="number"
      inputMode="numeric"
      className="m-1"
      placeholder={name}
      aria-label={name}
      value={qty}
      onInput={updateQuantity}
    />
  );
}
