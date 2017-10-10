import Head from 'next/head'
import Header from './header'
import stylesheet from 'styles/index.scss'

const layoutStyle = {
  width: '90%',
  margin: '2rem auto',
  padding: '1rem',
  border: '1px solid rgba(0,0,0, .15)',
  borderRadius: '3px'
}

const Layout = (props) => (
  <div style={ layoutStyle }>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <Header />
    { props.children }
    <style jsx global>{`
      body {
        margin: 0;
        font: 16px menlo;
        color: rgba(0,0,0, .6);
      }
    `}</style>
  </div>
)

export default Layout
