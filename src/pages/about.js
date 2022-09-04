import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({location}) => (
	<Layout location={location}>
		<Seo title="About Page" pathname="/about"/>	
		<section>
			<h1>Hi! 👋</h1>
			<p>I'm Samyak.</p>
		</section>
	</Layout>
)

export default AboutPage
