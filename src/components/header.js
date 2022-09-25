import * as React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import * as styles from "./header.module.scss"

const Header = ({ title, menuLinks }) => (
  <header>
    <div className={styles.nav}>
      <ul>
        <li className={styles.logo}>
          <Link to="/">{title}</Link>
        </li>
        {menuLinks.map(props => (
          <li key={props.name}>
            <Link to={props.link}>{props.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
  menuLinks: PropTypes.array,
}

Header.defaultProps = {
  title: `tai-tle`,
  menuLinks: [],
}

export default Header
