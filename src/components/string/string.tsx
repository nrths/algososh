import React, { FormEvent, SyntheticEvent, useState } from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('')

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    setString(evt.currentTarget.value)
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input isLimitText={true} maxLength={11} onChange={handleChange}/>
        <Button text='Развернуть' />
      </form>
      <div className={styles.algorithm}>
        <Circle />
      </div>
    </SolutionLayout>
  );
};
