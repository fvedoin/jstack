import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
    constructor(props) {
        super(props);

        let theme = 'dark';

        try {
            theme = JSON.parse(localStorage.getItem('theme'));
        } catch (err) {
            console.log(err);
        }

        this.state = {
            theme,
        };
    }

    //similar ao useEffect para monitorar a mudança de um estado
    componentDidMount(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            console.log('tema mudou');
        }
    }

    handleToggleTheme = () => {
        this.setState(prevState => ({
            theme: prevState.theme === 'dark' ? 'light' : 'dark',
        }), () => {
            localStorage.setItem('theme', this.state.theme);
        });
    }

    render() {
        return (
            <ThemeContext.Provider value={{
                theme: this.state.theme,
                handleToggleTheme: this.handleToggleTheme,
            }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}