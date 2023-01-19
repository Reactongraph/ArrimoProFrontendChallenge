import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";

import { saveState } from "../redux/localStorage";

store.subscribe(() => {
  saveState({
    user: store.getState().users,
    event: store.getState().events
  });
}); 

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
