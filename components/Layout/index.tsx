import Navbar from "../NavBar";
import Footer from "../Footer";
import { LayoutContextProvider } from "@store/layoutStore";

export default function Layout({ children }) {
  return (
    <>
      <LayoutContextProvider>
        <Navbar />
        {children}
        <Footer />
      </LayoutContextProvider>
    </>
  );
}
