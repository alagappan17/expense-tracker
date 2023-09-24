import { ExpenseRepository } from '@/app/data/ExpenseRepository'
import { NextResponse } from 'next/server'

const expenseService = ExpenseRepository.getInstance()
export const GET = async (request: Request, response: Request) => {
    try {
        const expenses = expenseService.getExpenses()
        return NextResponse.json({ message: 'OK', expenses }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ mesage: 'Error', error }, { status: 500 })
    }
}

export const POST = async (request: Request, response: Request) => {
    const expense = await request.json()
    console.log(expense)
    try {
        const newExpense = expenseService.addExpense(expense)
        return NextResponse.json({ message: 'OK', newExpense }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ mesage: 'Error', error }, { status: 500 })
    }
}
