import Link from 'next/link'

const Header = () => (
  <div className="pl0 mt0 measure center">
    <nav className="pa3 pa4-ns">
      <h3 className="link dim black b f3 f-headline-ns tc db mb3 mb4-ns" title="Home">Movies</h3>
      <div className="tc pb3">
        <Link href="/">
          <a className="link dim gray f6 f5-ns dib mr3">Home</a>
        </Link>
        <Link href="/about">
          <a className="link dim gray f6 f5-ns dib mr3">About</a>
        </Link>
      </div>
    </nav>
  </div> 
)

export default Header
