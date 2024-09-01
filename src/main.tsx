import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app.tsx';
import { BrowserRouter} from 'react-router-dom';
import './css/main.css'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App/>
    </StrictMode>
  </BrowserRouter>
)
document.documentElement.dir="rtl";
