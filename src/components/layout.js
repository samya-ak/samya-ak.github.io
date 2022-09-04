import * as React from "react"
import Header from "./header"
import { useStaticQuery, graphql} from "gatsby"

const Layout = ({ children }) => {
  const {site} = useStaticQuery(
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
  const title = site.siteMetadata.title;
  const menuLinks = site.siteMetadata.menuLinks;

  return (
    <div className="global-wrapper">
      <Header title={title} menuLinks={menuLinks} />
      <main>{children}</main>
      <footer>© {new Date().getFullYear()} </footer>
    </div>
  )
}

export default Layout
