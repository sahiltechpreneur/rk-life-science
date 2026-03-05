import Container from "@/components/ui/Container"
import ContactForm from "@/components/user/ContactForm"
import ContactInfo from "@/components/user/ContactInfo"

export default function ContactPage() {
  return (
    <Container>
      <div className="py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Our Info</h2>
          <ContactInfo />
        </div>
      </div>
    </Container>
  )
}