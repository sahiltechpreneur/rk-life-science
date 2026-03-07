import Container from "@/components/ui/Container"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

export default function AboutPage() {
  return (
    <Container>
      <div className="py-20 space-y-16">

        {/* Company Overview */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            About R.K Life Science
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            R.K Life Science is a wholesale distributor of nutraceutical products including
            multivitamins, tablets, capsules and non-medicinal products. Our mission is to
            provide high-quality, authentic products with fast delivery and excellent customer service.
          </p>
        </section>

        {/* Social Media Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Follow Us</h2>
          <div className="flex justify-center gap-6 text-3xl text-darkGreen">
            <a href="https://www.facebook.com/rklifescience2080" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </section>

        {/* Developer Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-8">Developer</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">

            <img src="/images/sahil.jpg" alt="Sahil Gupta" className="w-48 h-48 object-cover rounded-full border-4 border-primary" />

            <div className="space-y-4 text-left">
              <h3 className="text-xl font-semibold text-darkGreen">Sahil Gupta</h3>
              <p className="text-gray-700 max-w-md">
                Full Stack Developer & IT Student, passionate about building modern web applications, ecommerce systems, and interactive platforms.
              </p>

              <div className="flex gap-4 text-2xl text-darkGreen">
                <a href="https://instagram.com/sahiltechpreneur" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://github.com/sahiltechpreneur" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/sahiltechpreneur" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </Container>
  )
}