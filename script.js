const Modal = {
  // Abre o Modal caso esteja fechado
  // Fecha caso esteja aberto
  // Add a class active ao modal/remove a class active do modal
  toggle() {
    document.querySelector(".modal-overlay").classList.toggle("active");
  },
};

const transaction = {
  all: [
    {
      description: "Luz",
      amount: -50050,
      date: "28/12/2021",
    },
    {
      description: "Criação website",
      amount: 500000,
      date: "28/12/2021",
    },
    {
      description: "Internet",
      amount: -1000000,
      date: "31/01/2022",
    },
    {
      description: "App",
      amount: 200000,
      date: "23/01/2022",
    },
  ],

  add(transacao) {
    transaction.all.push(transacao);
    App.reload();
  },

  remove(index) {
    transaction.all.splice(index, 1);

    App.reload();
  },

  //soma as entradas
  incomes() {
    let income = 0;

    transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income = transaction.amount + income;
      }
    });

    return income;
  },
  //soma as saidas
  expenses() {
    let expense = 0;

    transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense = transaction.amount + expense;
      }
    });

    return expense;
  },
  //calcula o total
  total() {
    return transaction.incomes() + transaction.expenses();
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "+";

    const numValue = String(value).replace(/\D/g, "");
    const newValue = Number(numValue) / 100;
    const valueFinal = newValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const amount = signal + " " + valueFinal;

    return amount;
  },
};

const addTransactionDom = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = addTransactionDom.innerHtmlTransaction(transaction);
    const table = document.querySelector("#data-table tbody");
    table.appendChild(tr);
  },
  innerHtmlTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
    <tr>
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="./assets/minus.svg" alt="remover Transação"></td>
    </tr>
    `;
    return html;
  },
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      transaction.total()
    );
  },
  clearTransaction() {
    addTransactionDom.transactionsContainer.innerHTML = "";
  },
};

const App = {
  init() {
    transaction.all.forEach((transaction) => {
      addTransactionDom.addTransaction(transaction);
    });

    addTransactionDom.updateBalance();
  },
  reload() {
    addTransactionDom.clearTransaction();
    App.init();
  },
};

const Form = {
  description: document.querySelector("#description"),
  amount: document.querySelector("#amount"),
  date: document.querySelector("#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateFields() {
    let { description, amount, date } = Form.getValues();
    date.replace('-', '/');

      
  },

  submit(event) {
    event.preventDefault();
    Form.validateFields();
  },
};

App.init();

// transaction.add({
//   description: "Teste",
//   amount: 200,
//   date: "23/01/2022",
// });
// transaction.remove(4)
