'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
       <h1>demo page </h1>      </main>
    </div>
  );
}
