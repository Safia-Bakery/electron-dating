import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import Container from '../../components/Container'
import { useAppSelector } from '../../store/rootConfig'
import { printerSelector } from '../../store/reducers/settings'
import { useForm } from 'react-hook-form'
import MainSelect from '../../components/BaseInputs/MainSelect'
import usePrint from '../../hooks/custom/usePrint'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { dateTimeFormat } from '../../utils/helpers'

const mockdata = {
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
}

const PrintPreview = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register, handleSubmit, getValues } = useForm()

  const [count, $count] = useState(1)
  const printers = useAppSelector(printerSelector)
  const { print } = usePrint()

  const handlePrint = () => {
    print({
      deviceName: getValues('selected_printer'),
      silent: false,
      copies: count,
      printBackground: true,
      color: false,
      margins: { marginType: 'printableArea' },
      pageSize: {
        height: Number(document.getElementById('printElement')?.clientHeight) * 100,
        width: Number(document.getElementById('printElement')?.clientWidth) * 100
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      header: 'Header of the Page',
      footer: 'Footer of the Page'
    })
  }

  const handleBack = () => navigate(-1)

  const printComponent = useMemo(() => {
    return (
      <div
        id="printElement"
        className="bg-white px-4 py-3 rounded-[40px] pb-4 flex flex-col flex-[20] h-[205px] w-[300px] justify-center items-center "
      >
        <h2 className="mx-auto text-m font-bold mb-1">{mockdata.name}</h2>

        <div className="flex justify-center items-center gap-2">
          <span className="text-xs">{t('date_from')}</span>
          <span className="text-xs">{dayjs(new Date()).format(dateTimeFormat)}</span>
        </div>
        <div className="flex items-center mt-2 justify-center gap-2">
          <span className="text-xs">{t('date_expire')}</span>
          <span className="text-xs">{dayjs(new Date()).add(3, 'days').format(dateTimeFormat)}</span>
        </div>

        <div className="flex gap-2 items-center w-full mt-2 justify-center">
          <div className="w-12 h-12">
            <QRCode value={mockdata.code} size={48} />
          </div>
          <p className="text-[7px] leading-[8px] max-w-[120px]">
            Хранить при температуре от +5°C до +25°C. Избегать прямого солнечного света. Соблюдать
            срок годности. Хранить в сухом месте. При необходимости, хранить в оригинальной
            упаковке.
          </p>
        </div>
      </div>
    )
  }, [])
  const PrintingCheckPreview = useMemo(() => {
    return (
      <div className="bg-white px-4 py-3 rounded-[40px] pb-4 flex flex-col flex-[20] ">
        <h2 className="text-center text-3xl mb-6">{mockdata.name}</h2>

        <div className="flex justify-between items-center">
          <span className="text-xl">{t('date_from')}</span>
          <span className="text-3xl">{dayjs(new Date()).format(dateTimeFormat)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl">{t('date_expire')}</span>
          <span className="text-3xl">
            {dayjs(new Date()).add(3, 'days').format(dateTimeFormat)}
          </span>
        </div>

        <div className="flex gap-2 items-center w-full mt-5 justify-center">
          <div className="w-16 h-16">
            <QRCode value={mockdata.code} size={60} />
          </div>
          <p className="text-[8px] max-w-[260px]">
            Хранить при температуре от +5°C до +25°C. Избегать прямого солнечного света. Соблюдать
            срок годности. Хранить в сухом месте. При необходимости, хранить в оригинальной
            упаковке.
          </p>
        </div>
      </div>
    )
  }, [])
  const handleIncrement = () => $count((prev) => prev + 1)
  const handleDecrement = () => count > 1 && $count((prev) => prev - 1)

  return (
    <>
      {printComponent}
      <form
        onSubmit={handleSubmit(handlePrint)}
        className="absolute left-0 right-0 bottom-0 -translate-y-1/2 top-1/2 flex flex-col"
      >
        <Container className="bg-[#ECECEC] rounded-xl flex flex-1 max-h-[50vh] h-full min-h-[300px] relative">
          <MainSelect
            register={register('selected_printer')}
            className="absolute top-2 right-2 !w-min"
          >
            {printers.map((printer) => (
              <option key={printer.displayName + printer.name} value={printer.name}>
                {printer.displayName} {printer.status}
              </option>
            ))}
          </MainSelect>
          <div className="flex items-center justify-center gap-14 flex-1 max-h-[260px] m-auto max-w-2xl">
            {PrintingCheckPreview}
            <div className="py-10 !h-full px-8 flex flex-col justify-between bg-[#CCCCCC] rounded-[20px] items-center flex-1">
              <button
                type="button"
                className="text-[50px] cursor-pointer leading-10"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="text-[50px]">{count}</span>
              <button
                type="button"
                className="text-[50px] cursor-pointer leading-10"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>
        </Container>

        <Container className="bg-[#F3F3F3] rounded-xl flex flex-[5] !mt-5 gap-6 px-10 max-h-20">
          <button
            type="button"
            onClick={handleBack}
            className="bg-[#8CA0AF] rounded-3xl border-2 border-[#8CA0AF] flex flex-[2] text-white justify-center py-4 text-3xl items-center"
          >
            {t('back')}
          </button>

          <button
            type="submit"
            className="bg-primary rounded-3xl border-2 border-[#797EFF] flex flex-[2] text-white justify-center py-4 text-3xl items-center"
          >
            {t('print')}
          </button>
        </Container>
      </form>
    </>
  )
}

export default PrintPreview
