import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import WifiDetailsStyles from '../styles/WifiDetails.module.css'
import {useEffect, useState} from "react";
import {WifiInformation} from "../types/wifiInformation";
import WifiDetails from "../components/wifiDetails";

const Home: NextPage = () => {
  const [accessPointList, setAccessPointList] = useState<WifiInformation[]>([]);
  const [accessPointIndex, setAccessPointIndex] = useState(0);
  const [manualAccessPoint, setManualAccessPoint] = useState("");
  const [password, setPassword] = useState("");

  // determine if we need to ask user for a password
  const needsPassword = (accessPointIndex == -1)
      || (accessPointList[accessPointIndex] && accessPointList[accessPointIndex].secure);

  // determine if we can enable the connect button
  let connectButtonEnabled = false;
  if (accessPointList[accessPointIndex] && !accessPointList[accessPointIndex].secure) {
    // selected access point doesn't require password
    connectButtonEnabled = true;
  } else if (accessPointList[accessPointIndex] && accessPointList[accessPointIndex].secure && !!password) {
    // selected access point requires password and password entered
    connectButtonEnabled = true;
  } else if (accessPointIndex == -1 && manualAccessPoint && password) {
    // manual access point name and password
    connectButtonEnabled = true;
  }

  // fetch access point names from the server
  useEffect( () => {
    setAccessPointList([
        {name: "OneAccessPoint", strength: 100, secure: true},
        {name: "TwoAccessPoint", strength: 60, secure: false},
        {name: "Three", strength: 20, secure: true},
      ]);
    setAccessPointIndex(0);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Setup Wifi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.section}>
          <Image src="/wifi.svg" width={48} height={48} alt="WiFi symbol"/>
          <h1 className={styles.title}>
            Setup your device!
          </h1>
        </div>

        <div className={styles.section}>
          <div>Select WiFi access point:</div>
          <div className={styles.wifiList} >
            {accessPointList.map((info, index) => {
              return (<WifiDetails className={accessPointIndex == index ? WifiDetailsStyles.selected : ""} key={index} {...info} onClick={() => setAccessPointIndex(index)}/>);
            })}
            <button className={WifiDetailsStyles.wifiDetails + " " + (accessPointIndex == -1 && WifiDetailsStyles.selected)} key={"Other"} value={-1} onClick={() => setAccessPointIndex(-1)}>Other...</button>
          </div>
        </div>
        { accessPointIndex == -1 &&
            <div className={styles.section}>
              <div>Enter the access point SSID:</div>
              <input type="text" placeholder="Access Point Name"
                   value={manualAccessPoint}
                   onChange={(e) => setManualAccessPoint(e.target.value)}/>
            </div>
        }

        { needsPassword &&
            <div className={styles.section}>
              <div>Enter the password:</div>
              <input type="text" name="apkey" autoComplete="off"
                     placeholder="Password Required"
                     onChange={(e) => setPassword(e.target.value)}/>
            </div>
        }

        <div className={styles.section}>
          <button className={styles.connectButton} disabled={!connectButtonEnabled}>Connect!</button>
        </div>
      </main>
    </div>
  )
}

export default Home
