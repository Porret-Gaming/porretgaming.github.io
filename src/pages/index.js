import NavBar from '../components/NavBar';
import Background from '../components/Background';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Porret Gaming | Unreal Engine Android Code Plugins</title>
        <link rel="icon" href="/images/general/PorretGaming_Logo_cut.png" />
      </Head>
      <NavBar />
      <Background />
      <main className={styles.main}>
        {/* <h1 className={styles.heading}>Hello World!</h1> */}
      </main>
    </div>
  );
}
