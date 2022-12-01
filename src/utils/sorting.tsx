import { Dispatch, SetStateAction } from 'react';
import IColumn from '../components/sorting-page/sorting-page';
import { DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { delay, swap } from './utils';

export const bubbleSort = async (
  arr: IColumn[],
  direction: string,
  setArray: Dispatch<SetStateAction<IColumn[]>>,
  setButtonState: Dispatch<SetStateAction<boolean>>,
  setLoadingAsc: Dispatch<SetStateAction<boolean>>,
  setLoadingDesc: Dispatch<SetStateAction<boolean>>
) => {
  let objectArr = false;
  if (arr.length !== 0 && arr[0].hasOwnProperty('state')) {
    objectArr = true;
  }
  if (objectArr) setButtonState(true);

  if (!arr.length) return [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (objectArr) {
        arr[j].state = ElementStates.Changing;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;
        setArray([...arr]);

        await delay(DELAY_IN_MS);

        if (
          (direction === 'asc' ? arr[j].number : arr[j + 1].number) >
          (direction === 'asc' ? arr[j + 1].number : arr[j].number)
        ) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }

        arr[j].state = ElementStates.Default;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
        setArray([...arr]);
      }

      if (
        (direction === 'asc' ? arr[j] : arr[j + 1]) >
        (direction === 'asc' ? arr[j + 1] : arr[j])
      ) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    if (objectArr) {
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
  }
  if (objectArr) {
    setButtonState(false);
    direction === 'asc' ? setLoadingAsc(false) : setLoadingDesc(false);
  }
  return arr;
};

export const selectionSort = async (
  arr: IColumn[],
  direction: string,
  setArray: Dispatch<SetStateAction<IColumn[]>>,
  setButtonState: Dispatch<SetStateAction<boolean>>,
  setLoadingAsc: Dispatch<SetStateAction<boolean>>,
  setLoadingDesc: Dispatch<SetStateAction<boolean>>
) => {
  let objectArr = false;
  if (arr.length !== 0 && arr[0].hasOwnProperty('state')) {
    objectArr = true;
  }
  if (objectArr) setButtonState(true);

  for (let i = 0; i < arr.length; i++) {
    let pivotIndex = i;
    if (objectArr) arr[pivotIndex].state = ElementStates.Changing;

    for (let j = i; j < arr.length; j++) {
      if (objectArr) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);

        await delay(DELAY_IN_MS);

        if (
          (direction === 'asc' ? arr[pivotIndex].number : arr[j].number) >
          (direction === 'asc' ? arr[j].number : arr[pivotIndex].number)
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

      if (
        (direction === 'asc' ? arr[pivotIndex] : arr[j]) >
        (direction === 'asc' ? arr[j] : arr[pivotIndex])
      ) {
        pivotIndex = j
      }
    }

    swap(arr, i, pivotIndex);

    if (objectArr) {
      arr[pivotIndex].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
    }
  }
  if (objectArr) {
    setButtonState(false);
    direction === 'asc' ? setLoadingAsc(false) : setLoadingDesc(false);
  }
  return arr;
};
