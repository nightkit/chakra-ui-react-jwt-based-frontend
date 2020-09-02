import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { HelmetProvider } from 'react-helmet-async';
// Page imports
import { Home, Login, Register, Logout } from './pages/default';

// Misc Pages Import
import SecurePage from './pages/Misc/SecurePage';
import UnsecurePage from './pages/Misc/UnsecurePage';


const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};


function App() {
  return (
    <div>
     <HelmetProvider>
     <ThemeProvider theme={newTheme}>
       <CSSReset />
       <div>
       <Router>
        <Switch>
          <Route exact path="/secured-page" component={SecurePage} />
          <Route exact path="/unsecured-page" component={UnsecurePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path = "/" component={Home} />
          <Route path="*">404</Route>
        </Switch>
      </Router>
       </div>
     </ThemeProvider>
     </HelmetProvider>
    </div>
  );
}

export default App;
