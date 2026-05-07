import { useEffect, useState } from "react";

export default function BuggyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(c => c + 1); // no deps array - fires after every render
  });

  return <div>{count}</div>;
}