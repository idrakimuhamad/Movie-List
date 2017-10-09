import Link from 'next/link'

const linkStyle = {
  marginRight: 16
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={ linkStyle }>Home</a>
    </Link>
    <Link href="/about">
      <a style={ linkStyle }>About</a>
    </Link>
    <style jsx>{`
      a {
        text-decoration: none;
        color: #444;
        text-transform: uppercase;
        font-size: .8rem;
        letter-spacing: 1px;
      }
    `}</style>
  </div>
)

export default Header
