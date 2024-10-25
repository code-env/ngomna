import Benefits from './_components/benefits';
import Footer from './_components/footer';
import Hero from './_components/hero';
import MarketingHeader from './_components/navbar';
import Problem from './_components/problem';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
