import Image from "next/image";
import styles from '../styles/WifiDetails.module.css';
import Wifi from '../public/wifi.svg';
import React from 'react';

export interface WifiDetailsProps extends React.ComponentProps<"button">{
  name: string
  strength: number
  secure: boolean
}

const WifiDetails = ({name, strength, secure, className, ...props}: WifiDetailsProps ) => {
  let signalClass = styles.good;
  if (strength < 30) {
    signalClass = styles.poor;
  } else if ( 30 < strength && strength < 70) {
    signalClass = styles.fair;
  }
  return (
      <button className={styles.wifiDetails + " " + className} {...props}>
        <span className={styles.title}>{name}</span>
        {secure && <Image src="/lock.svg" width={24} height={24} alt="Secure Wifi Icon"/>}
        <Wifi className={signalClass} width={24} height={24}
              alt={"Wifi Strength Indicator: " + strength.toString(10) + "%"} />
      </button>
  )
}

export default WifiDetails;
