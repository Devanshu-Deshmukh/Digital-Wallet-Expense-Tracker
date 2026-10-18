package com.devanshu.digitalwallet.service;

import com.devanshu.digitalwallet.model.Transaction;
import com.devanshu.digitalwallet.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    /**
     * Fetch all transactions ordered by date descending.
     */
    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        transactions.sort((a, b) -> b.getDate().compareTo(a.getDate()));
        return transactions;
    }

    /**
     * Create a new transaction.
     */
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    /**
     * Delete a transaction by ID.
     * Throws RuntimeException if not found.
     */
    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("Transaction not found with id: " + id);
        }
        transactionRepository.deleteById(id);
    }

    /**
     * Calculate total balance = sum of INCOME - sum of EXPENSE.
     */
    public Double getBalance() {
        return transactionRepository.findAll().stream()
                .mapToDouble(t -> {
                    switch (t.getType()) {
                        case INCOME:
                            return t.getAmount();
                        case EXPENSE:
                            return -t.getAmount();
                        default:
                            return 0;
                    }
                })
                .sum();
    }
}
