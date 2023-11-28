import { Component, useEffect, useState } from "react";
import { Status, State, TaskState, Message } from "../../types/Status";
import { BiRefresh, BiCopy } from "react-icons/bi";
import { interval, Subject, takeUntil } from "rxjs";
import { Contract, Signer, ethers, providers, utils } from "ethers";

import Header from "../Header";
import "./style.css";

import Loading from "../Loading";
import Button from "../Button";

import { usePrivySmartAccount } from "@zerodev/privy";
import { useWallets } from "@privy-io/react-auth";


import { counterAbi } from "../../assets/contracts/counterAbi";

import "react-dropdown-now/style.css";
import { raasNetwork } from "../..";
import { config } from "./constant";


const App = () => {
  const { zeroDevReady, sendTransaction, authenticated, user, login, logout, getEthersProvider} =
    usePrivySmartAccount();


  const targetAddress = config[raasNetwork].simpleCounter;

  const [counterContract, setCounterContract] = useState<Contract>();
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [wallet, setWallet] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>({
    header: "Loading",
    body: undefined,
    taskId: undefined,
  });
  const [counter, setCounter] = useState<string>("Loading");

  const [connectStatus, setConnectStatus] = useState<Status | null>({
    state: State.missing,
    message: "Loading",
  });

  const onDisconnect = async () => {
    setLoading(true);
    setConnectStatus({
      state: State.failed,
      message: "Waiting for Disconnection",
    });
    await logout();
    setLoading(false);
  };


  const onCopy = async (text: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
    alert("Copied to Clipboard");
  };

  const onAction = async (action: number) => {
    switch (action) {
      case 0:
        increment();

        break;

      default:
        setLoading(false);
        break;
    }
  };

  const increment = async () => {
    try {
      setMessage({
        header: "Waiting for tx...",
        body: undefined,
        taskId: undefined,
      });
      setLoading(true);
      let tmpCountercontract = await getCounterContract(provider!);

      const { data: dataCounter } =
        await tmpCountercontract!.populateTransaction.increment();
        setMessage({
          header: "sending User Operation",
          body: "Waiting....",
          taskId: undefined,
        });
        const txData = {
          to: config[raasNetwork].simpleCounter,
          data: dataCounter
        }

        await sendTransaction(txData);
    
        await doRefresh()
        setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const doRefresh = async () => {
    setMessage({
      header: "Checking counter....",
      body: undefined,
      taskId: undefined,
    });
    setLoading(true);
    await refresh(provider!);
  };

  const refresh = async (provider: providers.Web3Provider) => {
  
    setProvider(provider);
;
    setConnectStatus({
      state: State.success,
      message: "Connection Succeed",
    });
    await getCounter(provider);
 

;
  };

  const getCounterContract = async (provider: providers.Web3Provider) => {
    if (counterContract == undefined) {
      const signer = await provider?.getSigner();
      const counterAddress = targetAddress;
      const _counterContract = new Contract(counterAddress, counterAbi, signer);

      setCounterContract(counterContract);
      return _counterContract;
    } else {
      return counterContract;
    }
  };



  const getCounter = async (provider: providers.Web3Provider) => {
    const contract = await getCounterContract(provider);

    const balance = await contract.counter();

    setCounter(balance.toString());
  };

  useEffect(() => {
    (async () => {

      setConnectStatus({
        state: State.failed,
        message: "Waiting for Disconnection",
      });
    })();
  }, []);
  useEffect(() => {
    (async () => {
        if (user !== undefined && zeroDevReady && authenticated ){
    
          setWallet(user!.wallet!.address!)
          setConnectStatus({state:State.success, message:"connected"})
          const provider = getEthersProvider()
          refresh(provider)

         setLoading(false)
        }

    })();
  }, [zeroDevReady,authenticated,user]);

  //

  return (
    <div className="App">
      <div className="container">
        <Header
          status={connectStatus}
          ready={zeroDevReady}
  
          onDisconnect={onDisconnect}
    
        />
        {connectStatus?.state! == State.success && (
          <div>
            {loading && <Loading message={message} />}
            <main>
              <div className="flex">
                <p className="title">Privy -- ZeroDev -- Gelato</p>
                <p className="title">on {raasNetwork}</p>
                {wallet != undefined ? (
                  <div className="isDeployed">
                    {wallet != undefined ? (
                      <div style={{ width: "350px", margin: "25px auto 10px" }}>
                        <p style={{ fontWeight: "600" }}>Your wallet</p>
                        <p className="highlight">
                          <a
                            href={`${config[raasNetwork].privyConfig.blockExplorers.default.url}/address/${wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {wallet.substring(0, 6) +
                              "..." +
                              wallet.substring(wallet.length - 6, wallet.length)}
                            <span
                              style={{
                                position: "relative",
                                top: "5px",
                                left: "5px",
                              }}
                            >
                              <BiCopy
                                cursor={"pointer"}
                                color="white"
                                fontSize={"20px"}
                                onClick={() => onCopy(wallet!)}
                              />
                            </span>
                          </a>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontWeight: "600" }}>
                          No wallets associated to this user
                        </p>
                        <Button  onClick={() => onAction(1)}>
                          {" "}
                          Get wallet Address
                        </Button>
                      </div>
                    )}
                    {wallet != undefined && (
                      <div>
                        <p style={{ fontWeight: "600" }}>
                          Counter:
                          <span
                            style={{ marginLeft: "10px", fontSize: "15px" }}
                            className="highlight"
                          >
                            {counter}
                            <span style={{ position: "relative", top: "5px" }}>
                              <BiRefresh
                                color="white"
                                cursor={"pointer"}
                                fontSize={"20px"}
                                onClick={doRefresh}
                              />
                            </span>
                          </span>
                        </p>
                        <p className="highlight">
                          <a
                            href={`${config[raasNetwork].privyConfig.blockExplorers.default.url}/address/${config[raasNetwork].simpleCounter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                             {config[raasNetwork].simpleCounter.substring(0, 6) +
                              "..." +
                              config[raasNetwork].simpleCounter.substring(config[raasNetwork].simpleCounter.length - 6, config[raasNetwork].simpleCounter.length)}
                            <span
                              style={{
                                position: "relative",
                                top: "5px",
                                left: "5px",
                              }}
                            >
                              <BiCopy
                                cursor={"pointer"}
                                color="white"
                                fontSize={"20px"}
                                onClick={() =>
                                  onCopy(
                                    config[raasNetwork].simpleCounter
                                  )
                                }
                              />
                            </span>
                          </a>
                        </p>
                        <Button onClick={() => onAction(0)}>
                          {" "}
                          Increment
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </main>
          </div>
        )}{" "}
        {connectStatus?.state! == State.missing && (
          <p style={{ textAlign: "center" }}>Metamask not Found</p>
        )}
           {(connectStatus?.state == State.pending ||
          connectStatus?.state == State.failed) && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h3> Please Sign In</h3>
            <Button status={connectStatus}  onClick={login}>
              <span style={{ position: "relative", top: "0px" }}>Sign In</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
