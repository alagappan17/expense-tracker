import { Expense, ExpenseRepository } from '@/app/data/ExpenseRepository'
import { NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'

const expenseService = ExpenseRepository.getInstance()

export const GET = async (request: Request, response: Response) => {
    const id = request.url?.split('expenses/')[1]
    const numberId = Number(id)
    try {
        const expense = expenseService.getOneExpense(numberId)
        if (!expense)
            return NextResponse.json({ message: 'ERROR' }, { status: 404 })
        return NextResponse.json({ message: 'OK', expense }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ mesage: 'Error', error }, { status: 500 })
    }
}

export const PUT = async (request: Request, response: Response) => {
    try {
        const expense: Expense = await request.json()
        const id = request.url?.split('expenses/')[1]
        const numberId = Number(id)
        expenseService.updateExpense(numberId, expense)
        return NextResponse.json({ message: 'OK' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ mesage: 'Error', error }, { status: 500 })
    }
}

export const DELETE = async (request: Request, response: Response) => {
    const id = request.url?.split('expenses/')[1]
    const numberId = Number(id)
    try {
        expenseService.deleteExpense(numberId)
        return NextResponse.json({ message: 'OK' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ mesage: 'Error', error }, { status: 500 })
    }
}

export const PATCH = async (request: Request, response: Response) => {
    try {
        const expense = await request.json()
        const id = request.url?.split('expenses/')[1]
        const numberId = Number(id)
        const oldExpense = expenseService.getOneExpense(numberId)
        expenseService.updateExpense(numberId, { ...oldExpense, ...expense })
        return NextResponse.json({ message: 'OK' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ mesage: 'Error', error }, { status: 500 })
    }
}
