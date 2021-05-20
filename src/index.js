import React from './react';
import ReactDOM from './react-dom';

class Hello extends React.Component {
    handleClick = (type) => {
        console.log('clicked', type);
    }

    render() {
        return <h1 id="title" className='title' onClick={() => this.handleClick('h1')}>hello <span
            style={{color: 'red'}} onClick={() => this.handleClick('span')}>{this.props.name}</span></h1>
    }
}

ReactDOM.render(
    <Hello name='world'/>, document.getElementById('root')
);
