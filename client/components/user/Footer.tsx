import Link from "next/link"
import Container from "@/components/ui/Container"

export default function Footer() {

  return (

    <footer className="bg-gray-100 mt-20">

      <Container>

        <div className="grid md:grid-cols-3 gap-8 py-10">

          {/* Column 1 */}

          <div>

            <h2 className="text-xl font-bold text-primary">
              R. K. Life Science
            </h2>

            <p className="text-gray-600 mt-3">
              Wholesale distributor for nutraceutical products including
              multivitamins, capsules, tablets and non medicinal products.
            </p>

          </div>

          {/* Column 2 */}

          <div>

            <h3 className="font-semibold mb-3">
              Useful Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-600">

              <Link href="#">Policy</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">FAQs</Link>
              <Link href="#">Rules</Link>

            </div>

          </div>

          {/* Column 3 */}

          <div>

            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-600">
              Shankhamul, Kathmandu, Nepal, 44600
            </p>

            <p className="text-gray-600">
              Phone: +977-9768771762
            </p>

            <p className="text-gray-600">
              Email: info.rklifescience2080@gmail.com
            </p>

          </div>

        </div>

        <div className="text-center pb-6 text-gray-500">

          © {new Date().getFullYear()} R. K. Life Science by Sahil Gupta

        </div>

      </Container>

    </footer>

  )
}