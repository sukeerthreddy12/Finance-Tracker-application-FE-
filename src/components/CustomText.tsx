import type { CSSProperties, ReactNode } from 'react'

type CustomTextProps = {
  style?: CSSProperties
  children?: ReactNode
  className?: string
}

const CustomText = ({ style, children, className, ...props }: CustomTextProps) => {
  return (
    <span
      className={className}
      style={{
        color: 'black',
        fontFamily: 'Helvetica, Arial, sans-serif',
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

export default CustomText
