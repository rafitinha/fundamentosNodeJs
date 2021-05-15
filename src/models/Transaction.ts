import { v4 as uuid } from 'uuid';

class Transaction {
  id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;

  constructor({ title, type, value }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.type = type;
    this.value = value;
  }
}

export default Transaction;
