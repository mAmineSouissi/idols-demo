import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden bg-(--color-bg) text-(--color-fg)",
        className
      )}
    >
      <Navbar />
      <main className={cn("relative z-10")}>{children}</main>
      <Footer />
    </div>
  );
}
