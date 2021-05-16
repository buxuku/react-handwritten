import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>hello <span>world!</span></h1>;

ReactDOM.render(
    element, document.getElementById('root')
);
