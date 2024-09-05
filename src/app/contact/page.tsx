import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

  /**
   * The contact page component.
   *
   * It renders the contact form in between the navbar and footer.
   *
   * @returns The contact page component.
   */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-12 flex-grow">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
