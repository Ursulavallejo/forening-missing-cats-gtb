import "../styles/globals.scss";
import "../styles/NavbarHamburger.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/api/apolloClient";
import Layout from "../lib/components/Layout";
import { ParallaxProvider } from "react-scroll-parallax";



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <Layout>
       <ParallaxProvider>
      <Component {...pageProps} />

       </ParallaxProvider>
      </Layout>


    </ApolloProvider>
  );
}

export default MyApp;
