import React, { FormEvent, SyntheticEvent, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseInputString } from "../../utils/string";

export type TInputStringArray = {
  symbol: string;
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

    const inputStringArray = string.split('').map(item => {
      return {
        symbol: item,
        state: ElementStates.Default,
      };
    });
    
    await reverseInputString(inputStringArray, setArray);
    setString('')
    setButtonState(false)
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <Input
          isLimitText={true}
          maxLength={11}
          onChange={(e) => handleChange(e)}
          // value={string}
        />
        <Button text="Развернуть" type="submit" isLoader={buttonState} disabled={string.length < 2}/>
      </form>
      <div className={styles.algorithm}>
        {array.map((item, index) => {
          return (
            <Circle key={index} letter={item.symbol} state={item.state} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
