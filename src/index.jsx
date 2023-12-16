import App from './App';
import { createRoot } from 'react-dom/client';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
