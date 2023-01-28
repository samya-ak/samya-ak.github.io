import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "./about.module.scss"
import { Link } from "gatsby"

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <Seo title="About Page" pathname="/about" />
    <section>
      <h1>
        Hi! <span className="grayscale">👋</span>
      </h1>
      <p>I'm Samyak.</p>
      <p className="justify">
        I am a full-stack developer who has enjoyed two-plus years in the
        software industry working on domains such as workforce management and
        e-commerce platforms. Honestly, chasing dopamine is what led me to be a
        software engineer. With numerous problems to solve that impact peoples'
        lives, and the opportunity to work with people from a wide range of
        disciplines, I'm all in for this. In my spare time, I enjoy learning
        about music, and finance, and keeping myself updated on new and upcoming
        technologies. Feel free to send me a message if you would like to know
        more about me. Currently working at{" "}
        <Link to="https://www.lftechnology.com/" target="_blank">
          leapfrog
        </Link>
        , I am always eager to hear from others and expand my network on
        LinkedIn.
      </p>
      <p>
        If you're more of a visual person, here are some of the things I love.
      </p>
      <div className={styles.row}>
        <div className={styles.column}>
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/futsal.png"
            quality={95}
            alt="futsal"
          />
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/guitar.png"
            quality={95}
            alt="guitar"
          />
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/dog.png"
            quality={95}
            alt="dog"
          />{" "}
        </div>
        <div className={styles.column}>
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/tt.png"
            quality={95}
            alt="tt"
          />
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/mountains.png"
            quality={95}
            alt="mountains"
          />
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/music.png"
            quality={95}
            alt="music"
          />
        </div>
        <div className={styles.column}>
          <StaticImage
            className={styles.imgMargin}
            formats={["png"]}
            src="../images/mug.png"
            quality={95}
            alt="mug"
          />{" "}
        </div>
      </div>
    </section>
  </Layout>
)

export default AboutPage
