export type Expense = {
    title: string
    description?: string
    date: Date
    amount: number
    category?: string
}

type ExpenseEntity = {
    id: number
    title: string
    description?: string
    date: Date
    amount: number
    category?: string
}

export class ExpenseRepository {
    private idCounter = 0
    private expenses: ExpenseEntity[] = []
    private static expenseRepo: ExpenseRepository

    private constructor() {}

    public static getInstance = (): ExpenseRepository => {
        if (!ExpenseRepository.expenseRepo) {
            ExpenseRepository.expenseRepo = new ExpenseRepository()
        }
        return ExpenseRepository.expenseRepo
    }

    public getExpenses = () => ExpenseRepository.expenseRepo.expenses

    public getNextId = () => {
        return ++ExpenseRepository.expenseRepo.idCounter
    }

    public addExpense = (newExpense: Expense) => {
        const expense: ExpenseEntity = {
            ...newExpense,
            id: ExpenseRepository.expenseRepo.getNextId(),
        }
        ExpenseRepository.expenseRepo.expenses.push(expense)
        return expense
    }

    public deleteExpense = (expenseId: number) => {
        ExpenseRepository.expenseRepo.expenses =
            ExpenseRepository.expenseRepo.expenses.filter(
                (expense) => expense.id !== expenseId
            )
    }

    public updateExpense = (expenseId: number, newExpense: Expense) => {
        const index = ExpenseRepository.expenseRepo.expenses.findIndex(
            (expense: ExpenseEntity) => expense.id === expenseId
        )
        ExpenseRepository.expenseRepo.expenses[index] = {
            ...newExpense,
            id: expenseId,
        }
        ExpenseRepository.expenseRepo.expenses = [
            ...ExpenseRepository.expenseRepo.expenses,
        ]
    }

    public getOneExpense = (id: number) => {
        return ExpenseRepository.expenseRepo.expenses.find(
            (expense) => expense.id == id
        )
    }
}
