import App from './App';
import { createRoot } from 'react-dom/client';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
