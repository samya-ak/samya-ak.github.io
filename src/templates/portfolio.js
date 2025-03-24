import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"

const PortfolioPage = ({ location, data }) => {
  const { html } = data.markdownRemark
  return (
    <Layout location={location}>
      <Seo title="portfolio" pathname="/portfolio" />
      <section
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
      ></section>
    </Layout>
  )
}

export const query = graphql`
  query PortfolioQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default PortfolioPage
