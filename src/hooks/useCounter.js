import { useState } from "react"

export const useCounter = (initialState = 0) => {

    const [counter, setCounter] = useState(initialState); // 1 



    const increment = () => {

        setCounter(counter + 1)

    }

    const decrement = () => {

        setCounter(counter - 1)

    }

    const reset = () => {

        setCounter(initialState)

    }




    return {
        counter,
        increment,
        decrement,
        reset,
        setCounter

    }


}
