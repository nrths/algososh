import React, { useEffect, useState } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { delay, getRandomInRange } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "../../utils/linked-list";
import { DELAY_IN_MS } from "../../constants/delays";

export type TListItem = {
  number: number;
  state: ElementStates;
  head?: boolean;
  tail?: boolean;
  isAdded?: boolean;
  isRemoved?: boolean;
  extraCircle?: {
    number: number;
  };
};

export const ListPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<number>(0);
  const [indexInput, setIndexInput] = useState<number>(0);
  const [array, setArray] = useState<TListItem[]>([]);
  const [addToHeadButtonState, setAddToHeadButtonState] = useState<boolean>(false)
  const [addToTailButtonState, setAddToTailButtonState] = useState<boolean>(false)
  const [removeFromHeadButtonState, setRemoveFromHeadButtonState] = useState<boolean>(false)
  const [removeFromTailButtonState, setRemoveFromTailButtonState] = useState<boolean>(false)
  const [addItemByIndexButtonState, setAddItemByIndexButtonState] = useState<boolean>(false)
  const [removeItemByIndexButtonState, setRemoveItemByIndexButtonState] = useState<boolean>(false)

  useEffect(() => {
    createRandomArray();
  }, []);

  const createRandomArray = () => {
    const randomArrayLength = Math.floor(Math.random() * (8 - 4) + 4);
    const randomArray: TListItem[] = [];
    for (let i = 0; i < randomArrayLength; i++) {
      randomArray.push(getRandomInRange(0, 100));
    }
    randomArray[0].head = true
    randomArray[randomArrayLength - 1].tail = true
    setArray([...randomArray]);
  };
  const linkedList = new LinkedList<any>(array);
  console.log(linkedList);

  const addItemToHead = async () => {
    setAddToHeadButtonState(true)
    linkedList.prepend(valueInput)
    array[0] = {
      ...array[0], isAdded: true, head: false, extraCircle: { number: valueInput }, state: ElementStates.Changing
    }
    setArray([...array]);

    await delay(DELAY_IN_MS);

    array[0] = { ...array[0], isAdded: true, head: false, extraCircle: undefined, state: ElementStates.Default }
    setArray([...array])

    await delay(DELAY_IN_MS);

    array.unshift({ number: valueInput, state: ElementStates.Modified })
    setArray([...array])

    await delay(DELAY_IN_MS);

    array[0] = {
      ...array[0],
      state: ElementStates.Default,
      head: true
    }
    setArray([...array]);
    setValueInput(0)
    setIndexInput(0)
    setAddToHeadButtonState(false)
  };

  const addItemToTail = async () => {
    setAddToTailButtonState(true)

    linkedList.append(valueInput)
    
    array[array.length - 1] = { ...array[array.length - 1], tail: false, isAdded: true, extraCircle: { number: valueInput }, state: ElementStates.Changing }
    setArray([...array])

    await delay(DELAY_IN_MS)

    array[array.length - 1] = { ...array[array.length - 1], tail: false, isAdded: false, extraCircle: undefined, state: ElementStates.Default }
    setArray([...array])

    await delay(DELAY_IN_MS)

    array.push({ number: valueInput, state: ElementStates.Modified })
    setArray([...array])

    await delay(DELAY_IN_MS)

    array[array.length - 1] = { ...array[array.length - 1], tail: true, state: ElementStates.Default }
    array[array.length - 2] = { ...array[array.length - 2], tail: false }
    setArray([...array])

    setValueInput(0)
    setIndexInput(0)
    setAddToTailButtonState(false)
  };
  const removeItemFromHead = async () => {
    setRemoveFromHeadButtonState(true)

    array[0] = { ...array[0], head: false, state: ElementStates.Changing, number: 0, isRemoved: true, extraCircle: { number: array[0].number } }
    setArray([...array])

    await delay(DELAY_IN_MS)

    array.shift()
    array[0].state = ElementStates.Modified
    setArray([...array])

    await delay(DELAY_IN_MS)

    array[0] = { ...array[0], state: ElementStates.Default, head: true }
    setArray([...array])

    setValueInput(0)
    setIndexInput(0)
    setRemoveFromHeadButtonState(false)
  };
  const removeItemFromTail = async () => {
    setRemoveFromTailButtonState(true)

    array[array.length - 1] = { ...array[array.length - 1], tail: false, state: ElementStates.Changing, number: 0, isRemoved: true, extraCircle: { number: array[array.length - 1].number } }
    setArray([...array])
    
    await delay(DELAY_IN_MS)

    array.pop()
    array[array.length - 1].state = ElementStates.Modified
    setArray([...array])

    await delay(DELAY_IN_MS)

    array[array.length - 1].state = ElementStates.Default
    array[array.length - 1].tail = true
    setArray([...array])

    setValueInput(0)
    setIndexInput(0)
    setRemoveFromTailButtonState(false)
  };
  const addItemByIndex = async () => {
    setAddItemByIndexButtonState(true)

    if (indexInput < 0 || indexInput > linkedList.getSize()) return null

    if (indexInput === 0) {
      addItemToHead()
      // setArray([...array])
    } else {
      linkedList.insertAt(valueInput, indexInput)
      for (let i = 0; i <= indexInput; i++) {
        array[i] = {...array[i], state: ElementStates.Changing, isAdded: true, extraCircle: { number: linkedList.getNodeByIndex(indexInput) }}
        if (i > 0) {
          array[i - 1] = {...array[i - 1], state: ElementStates.Changing, isAdded: false, extraCircle: undefined }
        }
        setArray([...array]);
        await delay(DELAY_IN_MS)
      }
      array[indexInput] = {
        ...array[indexInput!], 
        isAdded: false,
        extraCircle: undefined,
      };
      array.splice(indexInput, 0, {
        number: linkedList.getNodeByIndex(indexInput),
        state: ElementStates.Modified,
      });
      setArray([...array]);
      
      await delay(DELAY_IN_MS);
      
      array.forEach((el) => (el.state = ElementStates.Default));
      setArray([...array])
  
      array[1].head = false
      array[0].head = true
      
    }
    setArray([...array])

    setValueInput(0)
    setIndexInput(0)
    setAddItemByIndexButtonState(false)
  };
  const removeItemByIndex = async () => {
    setRemoveItemByIndexButtonState(true)

    for (let i = 0; i<= indexInput; i++) {
      array[i].state = ElementStates.Changing;
      setArray([...array]);
      await delay(DELAY_IN_MS);
    }
    array[indexInput] = { ...array[indexInput], number: 0, isRemoved: true, extraCircle: { number: indexInput } };
    setArray([...array]);
    
    await delay(DELAY_IN_MS);
    
    array.splice(indexInput, 1);
    setArray([...array]);
    
    await delay(DELAY_IN_MS);
    
    array.forEach(el => (el.state = ElementStates.Default));
    setArray([...array])
    
    array[array.length-1].tail = true
    array[0].head = true
    setArray([...array])

    setValueInput(0)
    setIndexInput(0)
    setRemoveItemByIndexButtonState(false)
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.forms_container}>
        <form className={styles.form}>
          <Input
            isLimitText={true}
            maxLength={4}
            onChange={(e) => setValueInput(+e.currentTarget.value)}
            value={valueInput}
            disabled={valueInput > 9999}
            extraClass={styles.input}
            placeholder="Введите значение"
          />
          <Button
            text="Добавить в head"
            type="button"
            onClick={addItemToHead}
            isLoader={addToHeadButtonState}
            disabled={addToTailButtonState || removeFromHeadButtonState || removeFromTailButtonState || addItemByIndexButtonState || removeItemByIndexButtonState}
            extraClass={styles.value_button}
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={addItemToTail}
            isLoader={addToTailButtonState}
            disabled={addToHeadButtonState || removeFromHeadButtonState || removeFromTailButtonState || addItemByIndexButtonState || removeItemByIndexButtonState}
            extraClass={styles.value_button}
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={removeItemFromHead}
            isLoader={removeFromHeadButtonState}
            disabled={addToHeadButtonState || addToTailButtonState || removeFromTailButtonState || addItemByIndexButtonState || removeItemByIndexButtonState}
            extraClass={styles.value_button}
          />
          <Button
            text="Удалить из tail"
            type="button"
            onClick={removeItemFromTail}
            isLoader={removeFromTailButtonState}
            disabled={addToHeadButtonState || addToTailButtonState || removeFromHeadButtonState || addItemByIndexButtonState || removeItemByIndexButtonState}
            extraClass={styles.value_button}
          />
        </form>
        <form className={styles.form}>
          <Input
            type="number"
            max={linkedList.getSize()}
            onChange={(e) => setIndexInput(+e.currentTarget.value)}
            value={indexInput}
            extraClass={styles.input}
            placeholder="Введите индекс"
          />
          <Button
            text="Добавить по индексу"
            type="button"
            onClick={addItemByIndex}
            isLoader={addItemByIndexButtonState}
            disabled={addToHeadButtonState || addToTailButtonState || removeFromHeadButtonState || removeFromTailButtonState || removeItemByIndexButtonState}
            extraClass={styles.index_button}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={removeItemByIndex}
            isLoader={removeItemByIndexButtonState}
            disabled={addToHeadButtonState || addToTailButtonState || removeFromHeadButtonState || removeFromTailButtonState || addItemByIndexButtonState}
            extraClass={styles.index_button}
          />
        </form>
      </div>
      <div className={styles.circles_container}>
        {array.map((item, index) => (
          <div className={styles.circle} key={index}>
            <Circle
              key={index}
              index={index}
              letter={"" + item.number}
              head={item.head ? "head" : ""}
              tail={item.tail ? "tail" : ""}
              state={item.state}
            />
            {index < array.length - 1 && (
              <ArrowIcon
                fill={
                  item.state === ElementStates.Changing ? "#d252e1" : "#0032ff"
                }
              />
            )}

            {item.isAdded && item.extraCircle?.number !== undefined && (
              <Circle
                isSmall={true}
                state={ElementStates.Changing}
                letter={"" + item.extraCircle.number}
                extraClass={styles.add_circle}
              />
            )}

            {item.isRemoved && item.extraCircle?.number !== undefined && (
              <Circle
                isSmall={true}
                state={ElementStates.Changing}
                letter={"" + item.extraCircle.number}
                extraClass={styles.remove_circle}
              />
            )}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
