import React, { SyntheticEvent, useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { Queue, TQueueItem } from "../../utils/queue";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

const queueSize = 7;
const queue = new Queue<string>(queueSize);

export const QueuePage: React.FC = () => {
  const initialArray: TQueueItem[] = Array.from({ length: queueSize }, () => ({
    content: "",
    state: ElementStates.Default,
    head: false,
    tail: false,
  }));

  const [array, setArray] = useState<TQueueItem[]>(initialArray);
  const [input, setInput] = useState<string>("");
  const [addButtonState, setAddButtonState] = useState<boolean>(false);
  const [removeButtonState, setRemoveButtonState] = useState<boolean>(false);
  const [clearButtonState, setClearButtonState] = useState<boolean>(false);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const addItem = async () => {
    setAddButtonState(true);

    if (input === "") {
      alert("Нечего добавить в очередь, введите что-то в поле ввода."); // TODO: popup
    } else {
      setInput("");

      queue.enqueue(input);
      array[queue.getHead()].head = true;

      if (queue.getTail() > 0) {
        array[queue.getTail() - 1].tail = false;
      }

      array[queue.getTail()].content = input;
      array[queue.getTail()].tail = true;
      array[queue.getTail()].state = ElementStates.Changing;

      await delay(DELAY_IN_MS);

      array[queue.getTail()].state = ElementStates.Default;
    }
    setAddButtonState(false);
  };

  const removeItem = async () => {
    setRemoveButtonState(true);
    if (input === "" && queue.isEmpty()) {
      alert("Очередь пуста, нечего удалять!"); // TODO: popup
    } else {
      if (queue.getHead() === queue.getTail()) {
        clearQueue();
      } else {
        queue.dequeue();
        array[queue.getHead() - 1].state = ElementStates.Changing;

        await delay(DELAY_IN_MS);

        array[queue.getHead() - 1].state = ElementStates.Default;

        if (queue.getHead() > 0) {
          array[queue.getHead() - 1].head = false;
          array[queue.getHead() - 1].content = "";
        }
        array[queue.getHead()].head = true;
      }
    }
    setRemoveButtonState(false);
  };

  const clearQueue = () => {
    setClearButtonState(true);

    queue.clear();
    setArray([...initialArray]);

    setClearButtonState(false);
  };

  console.log(array);
  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
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
            type="button"
            onClick={addItem}
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
          onClick={clearQueue}
          isLoader={clearButtonState}
          disabled={removeButtonState || addButtonState}
        />
      </form>
      <div className={styles.queue}>
        {array.map((item, index) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={item.content}
              state={item.state}
              head={item.head ? "head" : ""}
              tail={item.tail ? "tail" : ""}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
