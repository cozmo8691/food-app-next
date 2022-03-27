import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="h-screen bg-gradient-to-b from-lime-600 to-lime-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
