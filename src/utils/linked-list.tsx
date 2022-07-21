export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  getNodeByIndex: (index: number) => T | null;
  prepend: (value: T) => void
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteByIndex: (index: number) => void
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  private tail: LinkedListNode<T> | null;

  constructor(initialState?: T[]) {
    this.size = 0;
    this.head = null;
    this.tail = null;
    initialState?.forEach((el) => {
      this.insertAt(el, 0);
    });
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }
    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < index && current) {
      current = current.next;
      currentIndex++;
    }
    return current ? current.value : null;
  }

  prepend(value: T) {    
    let node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  append(element: T) {
    const node = new LinkedListNode(element);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;

      return this;
    }
    this.tail.next = node;
    this.tail = node;

    this.size++;
  }

  deleteHead() {
    if (!this.head) return null;
    let deletedHead = this.head;

    if (this.head.next) {
      this.head = deletedHead.next;
    } else {
      this.head = null;
    }
    this.size--;
    return deletedHead ? deletedHead.value : null;
  }

  deleteTail() {
    if (this.size === 0) return null

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < this.size - 1 && current) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    if (previous && current) {
      previous.next = current.next;
    }
    this.size--;
    return current ? current.value : null;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let current = this.head;

    if (index === 0 && current) {
      this.head = current.next;
    } else {
      let previous = null;
      let currentIndex = 0;

      while (currentIndex < index && current) {
        previous = current;
        current = current.next;
        currentIndex++;
      }

      if (previous && current) {
        previous.next = current.next;
      }
    }
    this.size--;
    return current ? current.value : null;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.getSize()) {
      console.log('index is invalid');
      return;
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = this.head;

        while (currIndex < index) {
          if(curr){
            currIndex++
            prev = curr;
            curr = curr.next;
          }
        }

        node.next = curr;
        if(prev){
          prev.next = node;}
      }

      this.size++;
    }
  }

  getSize() {
    return this.size
  }
}