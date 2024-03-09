import cl from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { MockCategories } from '../../utils/helpers'
import Container from '../../components/Container'

const Items = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  return (
    <Container className="flex gap-4 mt-5 max-h-[75vh] h-full min-h-[700px] pb-7 ">
      <div className="flex flex-col bg-[#FFF3E8] p-4 border border-[#C7C2B1] rounded-xl flex-1 max-w-44 overflow-y-hidden">
        <h3 className="text-center font-bold">{t('categories')}</h3>

        <div className="flex flex-col gap-4 mt-6 h-full overflow-y-auto">
          {MockCategories.map((item) => (
            <Link
              to={`/users/items/${item.id}`}
              key={item.id}
              className={cl(
                'w-36 py-6 flex justify-center bg-primary rounded-2xl text-white transition-colors',
                { ['!bg-[#0DA700]']: id && +id === item.id }
              )}
            >
              {t(item.name)}
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-[#FBFBF8] rounded-xl border p-3 border-[#F0E3C9] flex-1 overflow-y-scroll">
        <h3 className="font-bold">{t('raw_materials')}</h3>
        <div className="w-full my-3 gap-4 flex-wrap px-6 grid grid-cols-4 overflow-y-auto">
          {[...Array(20)].map((_, idx) => (
            <Link
              to={`${id}/${idx}`}
              className="border border-[#F5E7C7] bg-white font-bold rounded-2xl w-full h-24 flex items-center justify-center flex-1 min-w-[200px] cursor-pointer"
              key={idx}
            >
              apple
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Items
