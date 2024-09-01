import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page';
import GlobalContextProvider from './context/global-context';


const App=()=>{
    return(
        <GlobalContextProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </GlobalContextProvider>

    );
}
export default App;