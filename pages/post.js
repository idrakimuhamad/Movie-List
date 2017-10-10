import Layout from '../components/layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Post = (props) => (
  <Layout>
    <article>
      <div
        className="cf background" style={{ backgroundImage: `url(${props.show.image.original})` }}>
        <div className="fl pa3 pa4-ns bg-white black-70 measure-narrow f3 times">
          <header className="bb b--black-70 pv4">
            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir">{ props.show.name }</h3>
            <h4 className="f3 fw4 i lh-title mt0">{ props.show.premiered }</h4>
          </header>
          <section className="pt5 pb4">
            <p className="times lh-copy measure f4 mt0">
              { props.show.summary.replace(/<[/]?p>/g, '') }
            </p>
          </section>
          <div className="bt b--black-70 pv4">
            <Link href="/">
              <a className="link dim gray f6 f5-ns dib mr3">Back</a>
            </Link>
          </div>
        </div>
      </div>
    </article>
    <style jsx>{`
      .background {
        background-repeat: no-repeat;
        background-position: center center;
        background-attachment: fixed;
        background-size: cover
      }
    `}</style>
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched: ${show.name}`);

  return { show }
}

export default Post
