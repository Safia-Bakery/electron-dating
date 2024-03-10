import cl from 'classnames'
import styles from './index.module.scss'
import { ReactNode } from 'react'

type Props = {
  green?: boolean
  className: string
  children: ReactNode
  onClick?: () => void
  type?: 'reset' | 'submit' | 'button' | undefined
}

const Button = ({ green, children, className = '', ...others }: Props) => {
  return (
    <button className={`${className} ${cl(styles.btn, { [styles.green]: green })}`} {...others}>
      {children}
    </button>
  )
}

export default Button
