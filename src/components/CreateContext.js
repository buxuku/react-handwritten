import React from '../react';

const ThemeContext = React.createContext();

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'gray',
        }
    }

    changeColor = (color) => {
        this.setState({color})
    }

    render() {
        const value = {color: this.state.color, changeColor: this.changeColor}
        return <ThemeContext.Provider value={value}>
            <Child/>
        </ThemeContext.Provider>
    }
}

class Child extends React.Component {
    static contextType = ThemeContext;

    render() {
        return <div>{this.context.color}
            <ChangeButton/>
        </div>
    }
}

function ChangeButton() {
    return <ThemeContext.Consumer>
        {value => <button onClick={() => value.changeColor('red')}>change</button>}
    </ThemeContext.Consumer>
}

export default Parent;
