import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './style.css';
import { PrivyProvider } from "@privy-io/react-auth";
import { ZeroDevProvider } from "@zerodev/privy";
import { config } from './components/App/constant';

export const raasNetwork = "zKatana"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
       <ZeroDevProvider
            projectId={config[raasNetwork].zeroDevId!}
            bundlerProvider="GELATO"
          >
            <PrivyProvider
              appId={config[raasNetwork].privyId!}
              config={{
                loginMethods: ["email", "google", "twitter"],
                appearance: {
                  theme: "dark",
                  accentColor: "#676FFF",
                  logo: "https://www.gelato.network/brand-assets/GEL_Token_Logos/GEL%20Token%20Logo.svg",
                  showWalletLoginFirst: true,
                },
                defaultChain: config[raasNetwork].privyConfig,
                supportedChains: [config[raasNetwork].privyConfig],
                embeddedWallets: {
                  createOnLogin: "users-without-wallets",
                  noPromptOnSignature: true,
                },
              }}
              onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
            >
                  <App />
            </PrivyProvider>
          </ZeroDevProvider>

  </React.StrictMode>
);
