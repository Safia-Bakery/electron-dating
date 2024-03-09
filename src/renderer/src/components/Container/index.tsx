import { FC, ReactNode } from 'react'
import styles from './index.module.scss'

interface Props {
  children: ReactNode
  className?: string
  admin?: boolean
}

const Container: FC<Props> = ({ children, className = '', admin = false }) => {
  return (
    <div className={`${className} ${styles.container} ${admin ? 'pl-24' : ''}`}>{children}</div>
  )
}

export default Container
