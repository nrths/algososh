import { ElementStates } from "../types/element-states"

export type TQueueItem = {
    content: string,
    state: ElementStates,
    head: boolean,
    tail: boolean
}

interface IQueue<T> {
    enqueue: (item: T) => void
    dequeue: () => void
    peak: () => T | null
    getHead: () => number
    getTail: () => number
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = []
    private head = 0
    private tail = 0
    private readonly size: number = 0
    private length: number = 0
  
    constructor(size: number) {
      this.size = size
      this.container = Array(size)
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded")
      }
  
      this.container[this.tail] = item
      this.tail++
      this.length++
    }
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue")
      }
  
      if (this.head === this.size) {
        this.head = 0
      }
      this.container[this.head] = null
      this.length--
      this.head++
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue")
      }
      
      if (!this.isEmpty()) return this.container[this.head]
      
      return null
    }
  
    getHead = () => {
      if (this.isEmpty()) {
        throw new Error('No elements in the queue')
      }
      return this.head
    }
  
    getTail = () => {
      if (this.isEmpty()) {
        throw new Error('No elements in the queue')
      }
      return this.tail - 1
    }
  
    isEmpty = () => this.length === 0
  
    isFull = () => this.tail - 1 === 6
  
    getLength = () => this.length
  
    clear = () => {
      this.head = 0
      this.tail = 0
      this.length = 0
      this.container = []
    }
  }