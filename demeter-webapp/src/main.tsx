import "./index.css";
import App from "@D/App";
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {demeterStore, persistor} from "@D/core/store/demeter-store";
import {PRIMARY_COLOR} from "@D/core/style/theme";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{
            token: {
                colorPrimary: PRIMARY_COLOR,
            },
        }}>
            <Provider store={demeterStore}>
                <PersistGate persistor={persistor} loading={null}>
                    <App/>
                </PersistGate>
            </Provider>
        </ConfigProvider>
    </StrictMode>,
)
