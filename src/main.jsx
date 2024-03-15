import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/routers'
import './configs/axios'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { Result } from 'antd'
import placeholderLoading from '@/assets/placeholder-loading.gif'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={
          <Result
            extra={<img src={placeholderLoading}/>}
          />
        }>
          <RouterProvider router={router}/>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
