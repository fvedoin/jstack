import React, { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { ThemeContext } from "./ThemeContext";

function Header({ title, children }) {
    const { onToggleTheme } = useContext(ThemeContext);

    return (
        <>
            <h1>{title}</h1>
            <Button onClick={onToggleTheme}>
                Mudar tema
            </Button>
            {children}
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

Header.defaultProps = {
    title: `JStack's blog`
}

export default Header;