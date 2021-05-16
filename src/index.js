import React from './react';
import ReactDOM from './react-dom';

class Hello extends React.Component {
    render() {
        return <h1 id="title" className='title'>hello <span style={{color: 'red'}}>{this.props.name}</span></h1>
    }
}

ReactDOM.render(
    <Hello name='world'/>, document.getElementById('root')
);
