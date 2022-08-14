import React from 'react';

export const THEME = {
    default: {
        color: "white"
    },
    fantacy: {
        color: "aqua"
    },
    warning:{
        color:"red"
    }
}
export const { Provider, Consumer } = React.createContext({
    theme: THEME.warning,
    changeTheme: () => {
        console.warn('Please override changeTheme');
    }
});

export class Theme extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            theme: THEME.default
        }
    }
    toggleTheme(evt) {
        this.setState(prevState => {
            return { theme: prevState.theme === THEME.default ? THEME.fantacy : THEME.default }
        });
    }
    render() {
        return (<Provider value={{ theme: this.state.theme, changeTheme: this.toggleTheme.bind(this) }}>
            <div className="container">
                <h1 className="lead"><u>THEME</u></h1>
                <button className="btn btn-default" onClick={this.toggleTheme.bind(this)}>Toggle Theme</button>
                {this.props.children}
            </div>
        </Provider>);
    }
}