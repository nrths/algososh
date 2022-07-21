import { ElementStates } from "../types/element-states";

export type TStackElement = {
  value: string | null;
  state: ElementStates;
};

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
    console.log('push:', item)
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.getSize() !== null) return this.container[this.getSize() - 1];
    return null;
  };

  getSize = () => this.container.length;

  clearContainer = (): void => {
    this.container = [];
  };
}
