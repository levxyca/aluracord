import appConfig from "../config.json";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "DejaVu Sans Mono", monospace;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
      ::-webkit-scrollbar-track {
        background-color: "transparent";
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background: ${appConfig.theme.colors.neutrals[800]};
      }
    `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {
  console.log("Global");
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
