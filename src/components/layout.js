import * as React from "react"
import Header from "./header"
import { useStaticQuery, graphql, Link } from "gatsby"
import Github from "../images/github.svg"
import LinkedIn from "../images/linkedin.svg"
const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  )
  const title = site.siteMetadata.title
  const menuLinks = site.siteMetadata.menuLinks

  return (
    <div className="global-wrapper">
      <Header title={title} menuLinks={menuLinks} />
      <hr />
      <main>{children}</main>
      <footer>
        <Link to="https://www.linkedin.com/in/samya-ak" target="_blank">
          <LinkedIn className="social-icon" />
        </Link>{" "}
        <Link to="https://www.github.com/samya-ak" target="_blank">
          <Github className="social-icon" />
        </Link>{" "}
        <span>© </span> <span>{new Date().getFullYear()}</span>{" "}
      </footer>
    </div>
  )
}

export default Layout
