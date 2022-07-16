import React, { FormEvent, SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { calculateFibonacciSequence, delay } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [sequence, setSequence] = useState<number[]>([]);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(+e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState(true);

    await calculate(input + 1);

    setInput(0);
    setButtonState(false);
  };

  const calculate = async (num: number) => {
    const array: number[] = [];
    
    for (let i = 1; i <= num; i++) {
      array.push(calculateFibonacciSequence(i));
      setSequence([...array]);
      await delay(SHORT_DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <Input
          placeholder="Введите число"
          isLimitText={true}
          type="number"
          max={19}
          onChange={(e) => handleChange(e)}
        />
        <Button text="Рассчитать" type="submit" isLoader={buttonState} disabled={input > 19}/>
      </form>
      <div className={styles.algorithm}>
        {sequence.map((item, index) => {
          return <Circle key={index} letter={item + ''} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
