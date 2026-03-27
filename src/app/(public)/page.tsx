import { Hero } from '@/app/components/sections/hero';
import { ContactForm } from '@/app/components/sections/contact-form';
import { Portfolio } from '../components/sections/portfolio';

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <ContactForm />
    </>
  );
}
