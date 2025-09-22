import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Импорт BrowserRouter
import App from './App';
import './index.css'; // Если есть

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter> {/* Обертка для роутинга */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);