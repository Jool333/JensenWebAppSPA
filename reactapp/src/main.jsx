import React from 'react'
import ReactDOM from 'react-dom/client'
//import 'bootstrap/dist/css/bootstrap.css'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton.jsx'
import Grid from '@/components/grid/grid.jsx'
import Login from '@/components/loginform/login.jsx'
import createaccount from '@/components/loginform/createaccount.jsx'


//import './site.css'


const App = () => {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <Router>
                    <div>
                        <ScrollToTopButton />
                        <Routes>
                            <Route path="/*" element={<Grid />} />

                        </Routes>
                    </div>
                </Router>
            </Provider>
        </CookiesProvider>
    );
};


ReactDOM.createRoot(document.getElementById('root')).render( <App />)
