import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // Busca no banco - Ele existe ? Caso sim deletar. Se nao retornar AppError.
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const getTransactionFromDatabase = await transactionsRepository.findOne(id);

    if (!getTransactionFromDatabase) {
      throw new AppError('Transaction does not exist');
    }

    await transactionsRepository.remove(getTransactionFromDatabase);
  }
}

export default DeleteTransactionService;
