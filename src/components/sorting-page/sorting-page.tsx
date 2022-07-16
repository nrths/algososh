import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, getRandomInRange, swap } from "../../utils/utils";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS } from "../../constants/delays";

export default interface IColumn {
  number: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const minLen = 3;
  const maxLen = 17;
  const [sort, setSort] = useState<string>("selection");
  const [array, setArray] = useState<IColumn[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [loadingAsc, setLoadingAsc] = useState<boolean>(false);
  const [loadingDesc, setLoadingDesc] = useState<boolean>(false);

  useEffect(() => {
    createRandomArray();
  }, []);

  const createRandomArray = () => {
    const randomArrayLength = Math.floor(
      Math.random() * (maxLen - minLen) + minLen
    );
    const randomArray: IColumn[] = [];
    for (let i = 0; i <= randomArrayLength; i++) {
      randomArray.push(getRandomInRange(0, 100));
    }
    setArray([...randomArray]);
  };

  const bubbleSort = async (arr: IColumn[], direction: string) => {
    setButtonState(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;
        setArray([...arr]);

        await delay(DELAY_IN_MS);

        if (
          (direction === "asc" ? arr[j].number : arr[j + 1].number) >
          (direction === "asc" ? arr[j + 1].number : arr[j].number)
        ) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          // swap(arr, arr[j], arr[j + 1])
        }

        arr[j].state = ElementStates.Default;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
        setArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
    setButtonState(false);
    direction === "asc" ? setLoadingAsc(false) : setLoadingDesc(false);
  };

  const selectionSort = async (arr: IColumn[], direction: string) => {
    setButtonState(true);

    for (let i = 0; i < arr.length; i++) {
      let pivotIndex = i;
      arr[pivotIndex].state = ElementStates.Changing;

      for (let j = i; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);

        await delay(DELAY_IN_MS);

        if (
          (direction === "asc" ? arr[pivotIndex].number : arr[j].number) >
          (direction === "asc" ? arr[j].number : arr[pivotIndex].number)
        ) {
          pivotIndex = j;
          arr[j].state = ElementStates.Changing;
          arr[pivotIndex].state =
            i === pivotIndex ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== pivotIndex) {
          arr[j].state = ElementStates.Default;
        }

        setArray([...arr]);
      }

      swap(arr, i, pivotIndex)
      arr[pivotIndex].state = ElementStates.Default
      arr[i].state = ElementStates.Modified
      setArray([...arr])
    }
    setButtonState(false)
    direction === "asc" ? setLoadingAsc(false) : setLoadingDesc(false);
  };

  const handleClick = (direction: string) => {
    if (direction === "asc") {
      setLoadingAsc(true);
      setLoadingDesc(false);
      sort === "bubble"
        ? bubbleSort(array, direction)
        : selectionSort(array, direction);
    } else if (direction === "desc") {
      setLoadingAsc(false);
      setLoadingDesc(true);
      sort === "bubble"
        ? bubbleSort(array, direction)
        : selectionSort(array, direction);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radioGroup}>
          <RadioInput
            label="Выбор"
            checked={sort === "selection"}
            onChange={() => setSort("selection")}
            disabled={buttonState}
          />
          <RadioInput
            label="Пузырёк"
            checked={sort === "bubble"}
            onChange={() => setSort("bubble")}
            disabled={buttonState}
          />
        </div>

        <div className={styles.directionButtons}>
          <Button
            type="button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass={styles.button}
            onClick={() => handleClick("asc")}
            isLoader={loadingAsc}
            disabled={loadingDesc}
          />
          <Button
            type="button"
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass={styles.button}
            onClick={() => handleClick("desc")}
            isLoader={loadingDesc}
            disabled={loadingAsc}
          />
        </div>
        <Button
          type="button"
          text="Новый массив"
          extraClass={`ml-40 ${styles.newArrButton}`}
          onClick={() => createRandomArray()}
          disabled={buttonState}
        />
      </form>
      <div className={styles.columns}>
        {array.map((item, index) => {
          return <Column index={item.number} state={item.state} key={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
