import React, { FormEvent, SyntheticEvent, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export type TInputStringArray = {
  symbol: string;
  index: number;
  state: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [array, setArray] = useState<TInputStringArray[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState(true)

    const inputStringArray = string.split('').map((item, i) => {
      return {
        symbol: item,
        index: i,
        state: ElementStates.Default,
      };
    });
    
    await reverseInputString(inputStringArray);
    setString('');
    setButtonState(false)
  };

  const reverseInputString = async (arr: TInputStringArray[]) => {
    const center = arr.length / 2;
    let start = 0;
    let end = arr.length - 1;

    while (start < center) {
      arr[start].state = ElementStates.Changing
      arr[end].state = ElementStates.Changing
      setArray([...arr])

      await delay(DELAY_IN_MS)

      arr[start].state = ElementStates.Modified
      arr[end].state = ElementStates.Modified
      swap(arr, start, end)
      setArray([...arr])
      
      await delay(DELAY_IN_MS)

      start++
      end--

    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <Input
          isLimitText={true}
          maxLength={11}
          onChange={(e) => handleChange(e)}
        />
        <Button text="Развернуть" type="submit" disabled={buttonState}/>
      </form>
      <div className={styles.algorithm}>
        {array.map((item) => {
          return (
            <Circle key={item.index} letter={item.symbol} state={item.state} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
