import { ThemeProvider } from '@/theme';
import { useRoute } from '@/router';
import { useReveal } from '@/hooks/useReveal';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Workflow } from '@/components/sections/Workflow';
import { Categories } from '@/components/sections/Categories';
import { RepairReview } from '@/components/sections/RepairReview';
import { Security } from '@/components/sections/Security';
import { Footer } from '@/components/sections/Footer';
import { AnalysePage } from '@/components/analyse/AnalysePage';

function App() {
  useReveal();
  const { path } = useRoute();

  if (path === '/analyse') {
    return (
      <ThemeProvider>
        <div className="app-backdrop min-h-screen">
          <div className="relative z-10">
            <Nav />
            <AnalysePage />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="app-backdrop min-h-screen">
        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
            <Workflow />
            <div className="section-divider" />
            <Categories />
            <div className="section-divider" />
            <RepairReview />
            <div className="section-divider" />
            <Security />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
