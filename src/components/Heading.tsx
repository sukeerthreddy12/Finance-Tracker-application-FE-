import type { CSSProperties } from 'react'
import CustomBox from './CustomBox'
import CustomText from './CustomText'
import { theme } from '../theme/theme'

type HeadingProps = {
  props?: {
    heading?: string
  }
}

const Heading = ({ props }: HeadingProps) => {
  const title =
    props?.heading === 'spends'
      ? 'Your Recent Spends'
      : props?.heading || 'Your Recent Spends'

  return (
    <div style={{ margin: `${theme.spacing.md}px 0` }}>
      <CustomBox
        style={{
          mainBox: {
            backgroundColor: '#fff',
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
          },
          shadowBox: { backgroundColor: 'gray' },
        }}
      >
        <CustomText
          style={{
            color: '#111',
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold as CSSProperties['fontWeight'],
          }}
        >
          {title}
        </CustomText>
      </CustomBox>
    </div>
  )
}

export default Heading
