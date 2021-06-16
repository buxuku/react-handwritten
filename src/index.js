import React from './react';
import ReactDOM from './react-dom';
// import LifeCycle from './components/LifeCycle';
// import ComponentWillUnmount from './components/ComponenntWillUnmount';
// import GetDerivedStateFromProps from "./components/GetDerivedStateFromProps";
import GetSnapshotBeforeUpdate from './components/GetSnapshotBeforeUpdate';

ReactDOM.render(
    <GetSnapshotBeforeUpdate />,
    document.getElementById('root')
);
