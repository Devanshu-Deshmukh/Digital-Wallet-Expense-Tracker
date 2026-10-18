package com.devanshu.digitalwallet.controller;

import com.devanshu.digitalwallet.model.Transaction;
import com.devanshu.digitalwallet.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    /**
     * GET /api/transactions
     * Returns all transactions along with the current balance.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        Double balance = transactionService.getBalance();

        Map<String, Object> response = new HashMap<>();
        response.put("transactions", transactions);
        response.put("balance", balance);

        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/transactions
     * Creates a new transaction and returns it along with the updated balance.
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createTransaction(@Valid @RequestBody Transaction transaction) {
        Transaction saved = transactionService.createTransaction(transaction);
        Double balance = transactionService.getBalance();

        Map<String, Object> response = new HashMap<>();
        response.put("transaction", saved);
        response.put("balance", balance);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * DELETE /api/transactions/{id}
     * Removes a transaction and returns the updated balance.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        Double balance = transactionService.getBalance();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Transaction deleted successfully");
        response.put("balance", balance);

        return ResponseEntity.ok(response);
    }
}
