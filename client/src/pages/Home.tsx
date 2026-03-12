/**
 * Home — My Tec. Odonto Soluções
 */
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CatalogSection from '@/components/sections/CatalogPdfSection';
import RentalSection from '@/components/sections/RentalSection';
import MaintenanceSection from '@/components/sections/MaintenanceSection';
import ContactSection from '@/components/sections/ContactSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CatalogSection />
      <RentalSection />
      <MaintenanceSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
