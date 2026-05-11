// Class hierarchy with private state.
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    return this;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
    return this;
  }

  get balance() {
    return this.#balance;
  }
}

// TODO: extend with SavingsAccount (interest) and CheckingAccount (overdraft fee)
// Then add a Bank class that holds multiple accounts and can transfer between them.

const acct = new BankAccount();
acct.deposit(100).withdraw(40);
console.log(acct.balance); // 60
