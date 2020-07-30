import React from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import usePersistedState from "../../utils/usePersistedState";
import Header from "./Header";
import light from "../../styles/themes/light";
import dark from "../../styles/themes/dark";
import GlobalStyle from "../../styles/global";

import { Container } from "./styles";

const Layouts: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header toggleTheme={toggleTheme}></Header>
      </ThemeProvider>
    </Container>
  );
};

export default Layouts;
