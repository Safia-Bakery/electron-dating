import ReactDOM from 'react-dom/client'
import App from './App'
import BaseAPIClient from './api/axiosConfig'
import { persistor, store } from './store/rootConfig'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './components/Loader'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/helpers'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/main.css'

export const baseURL = 'https://api.service.safiabakery.uz' // todo
export default new BaseAPIClient(baseURL, store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading absolute />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer autoClose={600} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
)
