import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'components/Layout';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Layout />, document.getElementById('root'));
serviceWorker.unregister();
