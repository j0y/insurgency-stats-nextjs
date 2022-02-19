import '../css/global.css'
import '../css/App.css'
import Head from "next/head";
import Matches from "../components/Matches";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <div className="App">
        <Head>
            <title>BeF stats</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />

    </div>

}