import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount((c) => c + 1)
  }
  function handleDecrement() {
    setCount((c) => c - 1)
  }
  return (
    <>
      <div>Counter: {count}</div>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </>
  )
}

export default Counter
