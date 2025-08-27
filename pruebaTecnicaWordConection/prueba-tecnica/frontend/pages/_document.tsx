import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/logo.png" />
  <meta name="theme-color" content="#555555" />
  <meta name="description" content="Gtask - Gestión de Tareas" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
