import CustomText from './CustomText'
import type { ExpenseDto } from '../pages/dto/ExpenseDto'
import styles from './Expense.module.css'

type ExpenseProps = {
  props: ExpenseDto
}

const Expense = ({ props }: ExpenseProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className={styles.expenseContainer}>
      <div className={styles.leftContent}>
        <div className={styles.imageContainer}>
          <img
            className={styles.expenseImage}
            alt=""
            src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA="
          />
        </div>
        <div className={styles.merchantInfo}>
          <CustomText className={styles.merchantText} style={{ color: '#fff' }}>
            {props.merchant}
          </CustomText>
          <CustomText className={styles.dateText} style={{ color: '#8E8E93' }}>
            {formatDate(props.createdAt)}
          </CustomText>
        </div>
      </div>
      <div className={styles.rightContent}>
        <CustomText className={styles.amountText} style={{ color: '#007AFF' }}>
          {props.currency} {props.amount.toFixed(2)}
        </CustomText>
      </div>
    </div>
  )
}

export default Expense
