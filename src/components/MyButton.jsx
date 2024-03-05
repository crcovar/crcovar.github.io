import { useState } from "react";
export default function MyButton() {
  let [count, setCount] = useState(0);

  function handleClick() {
    console.log("Button clicked");
    setCount(count + 1);
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Button {count}
    </button>
  );
}
