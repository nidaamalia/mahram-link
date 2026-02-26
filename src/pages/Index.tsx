import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: BookOpen,
    title: "Catat",
    desc: "Masukkan data ibu susu dan anak-anak yang disusui. Cukup 3 data utama.",
  },
  {
    icon: Search,
    title: "Hubungkan",
    desc: "Sistem otomatis memetakan hubungan mahram antar anak sepersusuan.",
  },
  {
    icon: Shield,
    title: "Jaga",
    desc: "Generasi berikutnya bisa mengecek status mahram kapan saja.",
  },
];

const Index = () => {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden geometric-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative container px-4 py-24 md:py-36 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative element */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Pencatatan Mahram Digital
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground tracking-tight mb-6">
              Mamasi
            </h1>

            <p className="text-2xl md:text-3xl font-display italic text-primary mb-4">
              Catat. Hubungkan. Jaga.
            </p>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Bantu keluarga mencatat hubungan mahram sepersusuan agar generasi berikutnya terlindungi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/20">
                <Link to="/catat">📖 Catat Susuan</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl border-2">
                <Link to="/cek">🔍 Cek Mahram</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="container px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-3">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-muted-foreground">Tiga langkah sederhana untuk menjaga catatan keluarga</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary/5 border border-primary/10 p-10 md:p-14 text-center star-pattern"
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">
            Mulai Mencatat Sekarang
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Setiap catatan hari ini adalah perlindungan untuk generasi esok.
          </p>
          <Button asChild size="lg" className="px-8 py-6 rounded-xl text-base shadow-lg shadow-primary/20">
            <Link to="/catat">Mulai Catat Susuan</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
