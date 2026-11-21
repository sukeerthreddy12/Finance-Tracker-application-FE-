import type { CSSProperties, ReactNode } from 'react'
import styles from './CustomBox.module.css'

type BoxStyle = {
  mainBox?: CSSProperties
  shadowBox?: CSSProperties
  styles?: CSSProperties
}

type CustomBoxProps = {
  style?: BoxStyle
  children?: ReactNode
}

const CustomBox = ({ style = {}, children }: CustomBoxProps) => {
  return (
    <div className={styles.wrapper} style={style.styles}>
      <div
        className={styles.shadow}
        style={style.shadowBox}
        aria-hidden="true"
      />
      <div className={styles.main} style={style.mainBox}>
        {children}
      </div>
    </div>
  )
}

export default CustomBox
