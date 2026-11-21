import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Expense from '../components/Expense'
import CustomBox from '../components/CustomBox'
import CustomText from '../components/CustomText'
import type { ExpenseDto } from './dto/ExpenseDto'
import { SERVER_BASE_URL } from '../api/config'
import { storage } from '../utils/storage'

const headingBox = {
  mainBox: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  shadowBox: {
    backgroundColor: 'gray',
  },
  styles: {
    marginTop: 20,
  },
}

const Spends = () => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const accessToken = storage.getItem('accessToken')

      if (!accessToken) {
        throw new Error('No access token found.')
      }

      const response = await fetch(`${SERVER_BASE_URL}/expense/v1/getExpense`, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      console.log('Token is:', accessToken)

      if (!response.ok) {
        throw new Error(`Failed to fetch expenses. Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Expenses fetched:', data)

      const transformedExpenses: ExpenseDto[] = data.map(
        (expense: Record<string, unknown>, index: number) => ({
          key: index + 1,
          amount: Number(expense['amount']),
          merchant: String(expense['merchant']),
          currency: String(expense['currency']),
          createdAt: new Date(String(expense['created_at'])),
        }),
      )
      console.log('Transformed expenses:', transformedExpenses)

      setExpenses(transformedExpenses)
      setIsLoading(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      console.error('Error fetching expenses:', err)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
          <CustomText>Loading expenses...</CustomText>
        </CustomBox>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
          <CustomText>Error: {error}</CustomText>
        </CustomBox>
      </div>
    )
  }

  return (
    <div>
      <Heading props={{ heading: 'spends' }} />
      <CustomBox style={headingBox}>
        <div style={{ marginTop: 20 }}>
          {expenses.map(expense => (
            <Expense key={expense.key} props={expense} />
          ))}
        </div>
      </CustomBox>
    </div>
  )
}

export default Spends
