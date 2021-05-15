import { Router } from 'express';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const createTransactionService = new CreateTransactionService();

transactionRouter.get('/', (request, response) => {
  try {
    const transaction = createTransactionService.all();
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const data: Omit<Transaction, 'id'> = request.body;
    const createTransaction = new Transaction(data);
    const transaction = createTransactionService.execute(createTransaction);
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
