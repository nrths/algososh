import React, { FormEvent, SyntheticEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack, TStackElement } from "../../utils/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [stackItems, setStackItems] = useState<TStackElement[]>([]);
  const [addButtonState, setAddButtonState] = useState<boolean>(false);
  const [removeButtonState, setRemoveButtonState] = useState<boolean>(false);
  const [clearButtonState, setClearButtonState] = useState<boolean>(false);

  const stack = new Stack<string>();

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const addItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddButtonState(true);

    if (input === "") {
      alert("Нечего добавить в стек, введите что-то в поле ввода.") // TODO: popup
    } else {
      stack.push(input);
      stackItems.push({ value: stack.peak(), state: ElementStates.Changing });
      setStackItems([...stackItems]);
      setInput("");

      await delay(DELAY_IN_MS);

      stackItems[stackItems.length - 1].state = ElementStates.Default;
      setStackItems([...stackItems]);
    }

    setAddButtonState(false);
  };

  const removeItem = async () => {
    setRemoveButtonState(true);

    stackItems[stackItems.length - 1].state = ElementStates.Changing;
    setStackItems([...stackItems]);

    await delay(DELAY_IN_MS);

    stack.pop();
    stackItems.pop();
    setStackItems([...stackItems]);

    setRemoveButtonState(false);
  };

  const clearStack = async () => {
    setClearButtonState(true);

    for (let i = stackItems.length - 1; i >= 0; i--) {
      stackItems[i].state = ElementStates.Changing;
    }

    await delay(DELAY_IN_MS);

    stack.clearContainer();
    setStackItems([]);

    setClearButtonState(false);
  };

  const isTop = (index: number) => {
    if (stackItems.length - 1 === index) return "top";
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={(e) => addItem(e)}>
        <div className={styles.controls}>
          <Input
            isLimitText={true}
            maxLength={4}
            onChange={(e) => {handleChange(e)}}
            value={input}
            disabled={input.length > 4}
            extraClass={styles.input}
          />
          <Button
            text="Добавить"
            type="submit"
            isLoader={addButtonState}
            disabled={removeButtonState || clearButtonState}
          />
          <Button
            text="Удалить"
            type="button"
            onClick={removeItem}
            isLoader={removeButtonState}
            disabled={addButtonState || clearButtonState}
          />
        </div>
        <Button
          text="Очистить"
          type="reset"
          onClick={clearStack}
          isLoader={clearButtonState}
          disabled={removeButtonState || addButtonState}
        />
      </form>
      <div className={styles.stack}>
        {stackItems.map((item, index) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={item.value || ""}
              state={item.state}
              head={isTop(index)}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
