import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDto {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionDto {
    const balance = this.getBalance();
    const { transactions } = this;
    const transactionDto = {
      transactions,
      balance,
    };
    return transactionDto;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;

    const somaIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(item => item.value)
      .reduce(reducer, 0);

    const somaOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(item => item.value)
      .reduce(reducer, 0);

    const balance = {
      income: somaIncome,
      outcome: somaOutcome,
      total: somaIncome - somaOutcome,
    };

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
