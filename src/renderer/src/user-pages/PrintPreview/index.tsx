import { forwardRef, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import ReactToPrint from 'react-to-print'
import dayjs from 'dayjs'
import Container from '../../components/Container'
import { dateTimeFormat } from '../../utils/helpers'

const PrintPreview = () => {
  const { t } = useTranslation()
  // const { checkid } = useParams()
  const printComponentRef = useRef()

  const [count, $count] = useState(1)

  const PrintComponent = forwardRef((_props: any, ref: any) => {
    return (
      <div
        ref={ref}
        id="printElement"
        className="bg-white px-[3mm] rounded-[40px] flex flex-col w-[57mm] h-[47mm] pt-[7mm] absolute -left-52"
      >
        <h2 className="text-center text-l mb-[2mm]">apple</h2>

        <div className="flex justify-between items-center">
          <span className="text-[2mm] font-bold">{t('date_from')}</span>
          <span className="text-[2mm] font-bold">{dayjs(new Date()).format(dateTimeFormat)}</span>
        </div>
        <div className="flex justify-between items-center mt-[2mm]">
          <span className="text-[2mm] font-bold">{t('date_expire')}</span>
          <span className="text-[2mm] font-bold">{dayjs(new Date()).format(dateTimeFormat)}</span>
        </div>

        <div className="flex gap-2 items-center w-full mt-[5mm] justify-center">
          <div className="w-[15mm] h-[15mm]">
            <QRCode value="fu*k" size={50} className="w-full" />
          </div>
          <p className="text-[1.6mm] max-w-[25mm] font-extrabold">
            111 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, quae aut autem
            consequatur inventore voluptate aliquid dolorem nulla modi amet doloribus eos soluta
            iusto esse iure
          </p>
        </div>
      </div>
    )
  })
  const PrintingCheck = useMemo(() => {
    return (
      <div className="bg-white px-4 py-3 rounded-[40px] pb-4 flex flex-col flex-[20]">
        <h2 className="text-center text-3xl mb-6">Банан</h2>

        <div className="flex justify-between items-center">
          <span className="text-xl">{t('date_from')}</span>
          <span className="text-3xl">22.02.2024 12:00</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl">{t('date_expire')}</span>
          <span className="text-3xl">27.02.2024 12:00</span>
        </div>

        <div className="flex gap-2 items-center w-full mt-5 justify-center">
          <div className="w-16 h-16">
            <QRCode value="fu*k" size={60} />
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

  const renderLeft = useMemo(() => {
    return <PrintComponent ref={printComponentRef} />
  }, [])

  return (
    <div className="absolute left-0 right-0 -translate-y-1/2 top-1/2 hide-on-print">
      <Container className="bg-[#ECECEC] rounded-xl flex flex-1 max-h-[50vh] h-full min-h-[400px]">
        <div className="flex items-center justify-center gap-14 flex-1 max-h-[260px] m-auto max-w-2xl">
          {renderLeft}
          {PrintingCheck}
          <div className="py-10 !h-full px-8 flex flex-col justify-between bg-[#CCCCCC] rounded-[20px] items-center flex-1">
            <button className="text-[50px] cursor-pointer leading-10" onClick={handleDecrement}>
              -
            </button>
            <span className="text-[50px]">{count}</span>
            <button className="text-[50px] cursor-pointer leading-10" onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
      </Container>

      <Container className="bg-[#F3F3F3] rounded-xl flex flex-[5] mt-5 gap-6 px-10">
        <button className="bg-[#8CA0AF] rounded-3xl border-2 border-[#8CA0AF] flex flex-[2] text-white justify-center py-4 text-3xl">
          {t('back')}
        </button>

        {/* <button
          onClick={handlePrint}
          className="bg-primary rounded-3xl border-2 border-[#797EFF] flex flex-[2] text-white justify-center py-4 text-3xl"
        >
          {t("print")}
        </button> */}

        <ReactToPrint
          trigger={() => (
            <button className="bg-primary rounded-3xl border-2 border-[#797EFF] flex flex-[2] text-white justify-center py-4 text-3xl">
              {t('print')}
            </button>
          )}
          content={() => printComponentRef.current || null}
        />
      </Container>
    </div>
  )
}

export default PrintPreview
