import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDto {
  transactions: Transaction[];
  balance: Balance;
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor() {
    this.transactionsRepository = new TransactionsRepository();
  }

  public all(): TransactionDto {
    return this.transactionsRepository.all();
  }

  public execute(transaction: Transaction): Transaction {
    if (transaction.type === 'outcome') {
      this.validaOutCome(transaction.value);
    }
    return this.transactionsRepository.create(transaction);
  }

  public validaOutCome(outcome: number): void {
    const { total } = this.transactionsRepository.all().balance;
    if (outcome > total) {
      throw Error('Erro');
    }
  }
}

export default CreateTransactionService;
