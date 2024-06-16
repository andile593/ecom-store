import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import './index.css';
import App from './App'


const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider
            maxSnack={2}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SnackbarProvider>
        </PersistGate>
    </Provider>
);