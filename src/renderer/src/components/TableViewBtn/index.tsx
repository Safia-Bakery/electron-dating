import { FC } from 'react'
import edit from '../../assets/icons/edit.svg'

interface Props {
  onClick: () => void
}

const TableViewBtn: FC<Props> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <img className={'h-4 w-4 cursor-pointer'} src={edit} alt="edit" />
    </div>
  )
}

export default TableViewBtn
