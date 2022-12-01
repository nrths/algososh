import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { getRandomInRange } from '../../utils/utils';
import { Column } from '../ui/column/column';
import { bubbleSort, selectionSort } from '../../utils/sorting';

export default interface IColumn {
  number: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const minLen = 3;
  const maxLen = 17;
  const [sort, setSort] = useState<string>('selection');
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

  

  const handleClick = (direction: string) => {
    if (direction === 'asc') {
      setLoadingAsc(true);
      setLoadingDesc(false);
      sort === 'bubble'
        ? bubbleSort(array, direction, setArray, setButtonState, setLoadingAsc, setLoadingDesc)
        : selectionSort(array, direction, setArray, setButtonState, setLoadingAsc, setLoadingDesc);
    } else if (direction === 'desc') {
      setLoadingAsc(false);
      setLoadingDesc(true);
      sort === 'bubble'
        ? bubbleSort(array, direction, setArray, setButtonState, setLoadingAsc, setLoadingDesc)
        : selectionSort(array, direction, setArray, setButtonState, setLoadingAsc, setLoadingDesc);
    }
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className={styles.form}>
        <div className={styles.radioGroup}>
          <RadioInput
            label='Выбор'
            checked={sort === 'selection'}
            onChange={() => setSort('selection')}
            disabled={buttonState}
          />
          <RadioInput
            label='Пузырёк'
            checked={sort === 'bubble'}
            onChange={() => setSort('bubble')}
            disabled={buttonState}
          />
        </div>

        <div className={styles.directionButtons}>
          <Button
            type='button'
            text='По возрастанию'
            sorting={Direction.Ascending}
            extraClass={styles.button}
            onClick={() => handleClick('asc')}
            isLoader={loadingAsc}
            disabled={loadingDesc}
          />
          <Button
            type='button'
            text='По убыванию'
            sorting={Direction.Descending}
            extraClass={styles.button}
            onClick={() => handleClick('desc')}
            isLoader={loadingDesc}
            disabled={loadingAsc}
          />
        </div>
        <Button
          type='button'
          text='Новый массив'
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
