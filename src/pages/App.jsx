import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Mail, Phone, MapPin, Clock, Scissors, Sparkles, Calendar, Instagram, Facebook, Gem, Star } from "lucide-react";
import { ImageModal } from "../components/ui/image-modal";

// Simple container
const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

export default function HairwayToHeaven() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar */}
      <div className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-40">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-black text-white grid place-items-center">
                <Scissors className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Hairway to Heaven</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#services" className="hover:text-black/70">Services</a>
              <a href="#artists" className="hover:text-black/70">Stylists</a>
              <a href="#gallery" className="hover:text-black/70">Gallery</a>
              <a href="#testimonials" className="hover:text-black/70">Reviews</a>
              <a href="#contact" className="hover:text-black/70">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button className="rounded-2xl" asChild>
                <a href="/appointments"><Calendar className="mr-2 h-4 w-4"/>Book Now</a>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/appointments_background3.png"
            alt="Salon hero"
            className="h-[70vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"/>
        </div>
        <Container>
          <div className="pt-24 pb-16 md:pt-28 lg:pt-32 lg:pb-24 grid md:grid-cols-2 items-end">
            <div className="max-w-xl">
              <h1 className="text-4xl/tight md:text-5xl/tight font-semibold tracking-tight">
                Elevated hair. Effortless confidence.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Cuts, color, and styling tailored to you. Book a seat with me today.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-2xl" asChild>
                  <a href="/appointments" className="inline-flex items-center">
                    <Calendar className="mr-2 h-5 w-5"/>Book an Appointment
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-2xl" asChild>
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-5 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4"/> Mon–Sat</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Springfield, MO</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> (573) 714‑2083</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Badges */}
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-6">
          {[
            {icon: <Sparkles className="h-4 w-4"/>, label: "Balayage"},
            {icon: <Scissors className="h-4 w-4"/>, label: "Precision Cuts"},
            {icon: <Gem className="h-4 w-4"/>, label: "Bridal"},
            {icon: <Star className="h-4 w-4"/>, label: "5★ Rated"},
            {icon: <Calendar className="h-4 w-4"/>, label: "Online Booking"},
            {icon: <Sparkles className="h-4 w-4"/>, label: "Color Experts"},
          ].map((b,i)=> (
            <div key={i} className="rounded-2xl border bg-white p-3 text-sm flex items-center gap-2 justify-center">
              {b.icon}
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* Services */}
      <section id="services" className="py-12 md:py-16">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Featured Services</h2>
            <button onClick={() => alert('Full service menu coming soon!')} className="text-sm font-medium hover:text-gray-600 transition-colors">
              View full menu →
            </button>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Cut & Style",
                desc: "Custom cut, wash, and blowout designed for your face shape and lifestyle.",
                price: "$45+",
                img: "/past_works/work1.jpg",
              },
              {
                title: "Color & Balayage",
                desc: "Dimension, shine, and low‑maintenance color tailored to your tone.",
                price: "$120+",
                img: "/past_works/work2.jpg",
              },
              {
                title: "Bridal & Event",
                desc: "On‑site or in‑studio styling for weddings, photos, and special events.",
                price: "Custom",
                img: "/past_works/work3.jpg",
              },
            ].map((s, i) => (
              <Card key={i} className="overflow-hidden rounded-2xl">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover object-center"/>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {s.title}
                    <span className="text-base font-medium text-gray-600">{s.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  {s.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Stylists */}
      <section id="artists" className="py-12 md:py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Meet Your Stylist</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">Experienced, friendly, and obsessed with great hair. Book with me today.</p>
          <div className="mt-6 max-w-2xl mx-auto">
            <Card className="rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src="/stylist.jpg" 
                  alt="Kaitlin Coombs" 
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Kaitlin Coombs</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p className="mb-4">Blonde + lived‑in color specialist with over 5 years of experience. Passionate about creating beautiful, low-maintenance looks that enhance your natural beauty.</p>
                <div className="flex flex-wrap gap-2">
                  {["Balayage", "Color Correction", "Lived-in Blonde", "Beach Waves"].map((skill) => (
                    <span key={skill} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-12 md:py-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Recent Work</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n)=> (
              <div 
                key={n} 
                className="aspect-square overflow-hidden rounded-2xl cursor-pointer group relative"
                onClick={() => setSelectedImage(`/past_works/work${n}.jpg`)}
              >
                <img 
                  src={`/past_works/work${n}.jpg`} 
                  alt="Gallery" 
                  className="h-full w-full object-cover object-center transform transition duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </Container>
        <ImageModal 
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage}
        />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What Clients Say</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {["I’ve never loved my color more.", "The booking process is so easy and the salon is beautiful.", "Professional, kind, and insanely talented."].map((quote, i)=> (
              <Card key={i} className="rounded-2xl">
                <CardContent className="pt-6 text-gray-700">
                  <p className="text-base">“{quote}”</p>
                  <div className="mt-4 text-sm text-gray-500">— Happy Client</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Booking / CTA */}
      <section id="booking" className="py-12 md:py-16">
        <Container>
          <Card className="rounded-2xl border-2">
            <CardContent className="p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Ready for great hair?</h3>
                <p className="mt-2 text-gray-600">Choose your service and time — all online. We’ll send text + email confirmations.</p>
                <div className="mt-5 flex gap-3">
                  <Button size="lg" className="rounded-2xl" asChild>
                    <a href="/appointments">Book Online</a>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-2xl" asChild>
                    <a href="#contact">Call the salon</a>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-3"><Clock className="h-4 w-4"/> Mon–Fri 9–7, Sat 10–2</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4"/> 3444 S Campbell, Springfield, MO</div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4"/> (573) 714‑2083</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Newsletter / Contact */}
      <section id="contact" className="py-12 md:py-16 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Stay in the loop</h2>
              <p className="mt-2 text-gray-600">Promotions, last‑minute openings, and hair tips right to your inbox.</p>
              <form className="mt-4 flex gap-3 max-w-md">
                <Input placeholder="Your email" type="email" className="rounded-2xl"/>
                <Button className="rounded-2xl"><Mail className="mr-2 h-4 w-4"/>Subscribe</Button>
              </form>
            </div>
            <div className="rounded-2xl border bg-white p-6 grid gap-3">
              <a href="tel:5737142083" className="flex items-center gap-3 hover:text-gray-600 transition-colors">
                <Phone className="h-4 w-4"/> (573) 714‑2083
              </a>
              <a href="mailto:kdeken1218@gmail.com" className="flex items-center gap-3 hover:text-gray-600 transition-colors">
                <Mail className="h-4 w-4"/> kdeken1218@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4"/> 3444 S Campbell, Springfield, MO
              </div>
              <a href="https://instagram.com/hairwaytoheaven" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gray-600 transition-colors">
                <Instagram className="h-4 w-4"/> @hairwaytoheaven
              </a>
              <a href="https://www.facebook.com/p/Hairway-to-Heaven-100091898793241/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gray-600 transition-colors">
                <Facebook className="h-4 w-4"/> Hairway to Heaven Salon
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div>© {new Date().getFullYear()} Hairway to Heaven. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Accessibility</a>
              <a href="#" className="hover:text-gray-900">Gift Cards</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
