import { Link } from 'react-router-dom'
import Container from '../Container'
import MainInput from '../BaseInputs/MainInput'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/rootConfig'
import { changeLanguage, langSelector } from '../../store/reducers/selects'
import { Language } from '../../utils/types'

const Header = () => {
  const { t } = useTranslation()
  const { register, getValues, handleSubmit } = useForm()
  const dispatch = useAppDispatch()
  const lang = useAppSelector(langSelector)
  const handleLang = () =>
    dispatch(changeLanguage(lang === Language.ru ? Language.uz : Language.ru))

  const onSubmit = () => {
    console.log(getValues())
  }

  return (
    <Container>
      <div className="flex justify-between items-center gap-16">
        <div className="flex items-center ml-4 gap-6 flex-1">
          <Link to={'/'} className="rounded-full h-[50px] w-[50px] ">
            <img src="/images/safia-logo.png" alt="safia-logo" />
          </Link>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1">
            <MainInput register={register('search')} placeholder={'search'} />
            <button type="submit" className="hidden" />
          </form>

          <div
            className="w-40 rounded-3xl bg-primary h-[50px] cursor-pointer border border-borderColor flex items-center justify-center text-white text-lg"
            onClick={handleLang}
          >
            {lang === Language.ru ? t(Language.uz) : t(Language.ru)}
          </div>
        </div>
        <span className="mr-8 cursor-pointer flex">
          <img src="/icons/logout.svg" alt="logout" className="h-7 w-7" />
        </span>
      </div>
    </Container>
  )
}
export default Header
