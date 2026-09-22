import { Link, useLoaderData } from 'react-router-dom'
import Seo from '../seo/Seo'
import { absUrl } from '../seo/siteConfig'
import './BlogPost.css'

export default function BlogPost() {
  const { post, related = [] } = useLoaderData() || {}

  if (!post) {
    return (
      <div className="bp-missing">
        <Seo title="Article not found" noindex />
        <h1>Article not found</h1>
        <Link to="/blog" className="bp-back-link">Back to the blog</Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.img,
    articleSection: post.category,
    author: { '@type': 'Organization', name: post.author || 'Hunt & Harris Real Estate' },
    publisher: { '@type': 'Organization', name: 'Hunt & Harris Real Estate' },
    mainEntityOfPage: absUrl(`/blog/${post.slug}`),
  }

  return (
    <article className="bp">
      <Seo path={`/blog/${post.slug}`} title={post.title} description={post.excerpt} image={post.img} type="article" jsonLd={jsonLd} />

      <div className="bp-head">
        <Link to="/blog" className="bp-back">&larr; All articles</Link>
        <span className="bp-tag">{post.category}</span>
        <h1 className="bp-title">{post.title}</h1>
        <div className="bp-meta">{post.author} &middot; {post.date} &middot; {post.read}</div>
      </div>

      <div className="bp-hero">
        <img src={post.img} alt={post.title} />
      </div>

      <div className="bp-body">
        {post.body.map((block, i) =>
          block.type === 'h2'
            ? <h2 key={i} className="bp-h2">{block.text}</h2>
            : <p key={i} className="bp-p">{block.text}</p>
        )}
      </div>

      <div className="bp-cta">
        <h3>Thinking about your next move in RAK?</h3>
        <p>Our team is here to help — honest advice, no pressure.</p>
        <Link to="/contact" className="bp-cta-btn">Get in touch</Link>
      </div>

      {related.length > 0 && (
        <div className="bp-related">
          <h2 className="bp-related-title">More articles</h2>
          <div className="bp-related-grid">
            {related.map((r) => (
              <Link className="bp-rel" to={`/blog/${r.slug}`} key={r.slug}>
                <div className="bp-rel-img">
                  <img src={r.img} alt={r.title} loading="lazy" />
                  <span className="bp-rel-tag">{r.category}</span>
                </div>
                <div className="bp-rel-body">
                  <div className="bp-rel-meta">{r.date} &middot; {r.read}</div>
                  <h3 className="bp-rel-title">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
