// Top level component for all pages
// Use it for things like global style

import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}