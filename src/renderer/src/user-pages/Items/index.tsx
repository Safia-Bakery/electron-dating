import cl from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Container from '../../components/Container'
import useProducts from '../../hooks/useProducts'
import useProductsSync from '../../hooks/useProductsSync'
import Loading from '../../components/Loader'
import Button from '../../components/Button'
import { useEffect } from 'react'
import { errorToast, successToast } from '../../utils/toast'

const prods = {
  products: [
    {
      product_type: 'DISH',
      name: 'Маленький эклер вессовой',
      num: '00028',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '330',
      id: '861c4be9-d052-4e4b-894f-ad19d2077d77',
      price: 94000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:25.811651+00:00'
    },
    {
      product_type: 'DISH',
      name: 'Шоколадный эклер палочки весовой',
      num: '00033',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '329',
      id: 'ff875d8c-c9ea-407c-abd2-748f4333262c',
      price: 119000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:32.850221+00:00'
    },
    {
      product_type: 'DISH',
      name: 'Маленький эклер весовой шоколадный',
      num: '00027',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '6964',
      id: '67ac3e6a-dc69-499c-9e3d-e0b15445c87c',
      price: 94000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:32.935181+00:00'
    },
    {
      product_type: 'DISH',
      name: 'Мини эклер «Кокос»',
      num: '20106',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '1255292',
      id: '28e03776-1e9f-4263-84df-7980d24be644',
      price: 170000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:38.273988+00:00'
    },
    {
      product_type: 'DISH',
      name: 'Мини эклер « Кофейный»',
      num: '20105',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '1255370',
      id: 'ba31389b-2239-4d30-a803-468dff3c58f1',
      price: 170000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:44.233311+00:00'
    },
    {
      product_type: 'DISH',
      name: 'Мини эклер «Абрикос»',
      num: '30199',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '1255291',
      id: 'a88b0623-7682-4dbc-9891-64e125795be4',
      price: 170000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:44.513043+00:00'
    },
    {
      product_type: 'DISH',
      name: 'Мини эклеры цветные',
      num: '00029',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      total_price: 0,
      status: 1,
      updated_at: null,
      code: '2065',
      id: '0c5771b0-a58e-4df7-a3b5-20437cb1aa38',
      price: 160000,
      main_unit: '7ba81c3a-8de5-8f9d-fb9f-e39efcbc57cc',
      amount_left: null,
      created_at: '2024-03-12T10:33:45.890828+00:00'
    }
  ],
  groups: [
    {
      status: 1,
      id: 'f7751362-6e2c-455f-b3d3-b977daa5cac4',
      code: '2243',
      category: '0637221d-7be2-5d8a-0165-8eaefeab6849',
      created_at: '2024-03-12T10:33:47.680753+00:00',
      name: 'ШТУЧНЫЕ ЭКЛЕРЫ',
      description: '',
      num: '16800',
      parent_id: '27af897f-8bcc-49c6-bce7-3b16cfea02de',
      updated_at: null
    }
  ]
}

const Items = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const {
    isFetching: syncFetching,
    refetch: sync,
    isSuccess,
    isError
  } = useProductsSync({
    enabled: false
  })

  const {
    isFetching: productFetching,
    data,
    isLoading: productLoading
  } = useProducts({
    enabled: false
  })

  useEffect(() => {
    if (isSuccess) successToast('success')
    if (isError) errorToast('error')
  }, [isSuccess, isError])

  const handleSync = () => sync()

  return (
    <div className="w-full flex flex-col mt-4">
      <Button green onClick={handleSync} className="flex self-end mr-6">
        {t('sync_with_iico')}
      </Button>
      <Container className="flex gap-4 mt-5 max-h-[75vh] h-full min-h-[700px] pb-7 ">
        <div className="flex flex-col bg-[#FFF3E8] p-4 border border-[#C7C2B1] rounded-xl flex-1 max-w-44 overflow-y-hidden">
          <h3 className="text-center font-bold">{t('categories')}</h3>

          <div className="flex flex-col gap-4 mt-6 h-full overflow-y-auto w-min">
            {prods?.groups.map((group) => (
              <Link
                to={`/users/items/${group.id}`}
                key={group.id}
                className={cl(
                  'w-36 py-6 flex justify-center bg-primary rounded-2xl text-white transition-colors p-2 text-center',
                  { ['!bg-[#0DA700]']: id && id === group.id }
                )}
              >
                {t(group.name)}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-[#FBFBF8] rounded-xl border p-3 border-[#F0E3C9] flex-1 overflow-y-scroll">
          <h3 className="font-bold">{t('raw_materials')}</h3>
          <div className="w-full my-3 gap-4 flex-wrap px-6 grid grid-cols-4 overflow-y-auto">
            {!!id &&
              prods?.products.map((prod, idx) => (
                <Link
                  to={`${id}/${prod.id}`}
                  className="border border-[#F5E7C7] bg-white font-bold rounded-2xl w-full h-24 flex items-center justify-center flex-1 min-w-[200px] cursor-pointer p-2 text-center"
                  key={idx}
                >
                  {prod.name}
                </Link>
              ))}
          </div>
        </div>
        {(syncFetching || productFetching || productLoading) && <Loading absolute />}
      </Container>
    </div>
  )
}

export default Items
