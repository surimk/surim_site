import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

/**
 * The main entry point for the application, which displays the home page.
 *
 * It renders a {@link Navbar}, a {@link HeroSection}, an {@link AboutSection}, and a {@link Footer}.
 *
 * @returns The JSX element representing the home page.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-12 flex-grow">
        <HeroSection />
        <AboutSection />
      </div>
      <Footer />
    </main>
  );
}
