import { Provider } from "react-redux";
import { ThemeProvider } from "./components/ui/theme-provider";
import Routes from "./Routes";
import store from "./redux/store";
import type { JSX } from "react";
import ToasterProvider from "./components/ui/toaster-provider";
import { AuthProvider } from "./components/auth/AuthProvider";

const App = (): JSX.Element => {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system">
        <ToasterProvider />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
