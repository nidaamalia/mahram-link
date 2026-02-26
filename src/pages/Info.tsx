import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Apa itu mahram sepersusuan?",
    a: "Mahram sepersusuan adalah hubungan kekerabatan yang terbentuk karena penyusuan. Dalam Islam, anak yang disusui oleh seorang ibu menjadi saudara sesusuan dengan anak-anak kandung ibu tersebut dan anak-anak lain yang juga disusui olehnya. Mereka tidak boleh menikah satu sama lain.",
  },
  {
    q: "Berapa kali susuan agar dianggap mahram?",
    a: "Mayoritas ulama (mazhab Syafi'i dan Hanbali) mensyaratkan minimal 5 kali susuan yang mengenyangkan. Mazhab Hanafi dan Maliki berpendapat bahwa satu kali susuan saja sudah menimbulkan hubungan mahram. Mamasi mencatat semua data tanpa membatasi jumlah susuan.",
  },
  {
    q: "Apakah data di Mamasi bisa dijadikan bukti hukum?",
    a: "Mamasi adalah alat bantu pencatatan, bukan fatwa dan bukan bukti hukum resmi. Untuk keputusan hukum syar'i, silakan konsultasi dengan ulama atau lembaga fatwa yang berwenang.",
  },
  {
    q: "Siapa yang bisa melihat data saya?",
    a: "Data NIK tidak pernah ditampilkan secara lengkap di halaman publik. Graf mahram dapat diakses melalui link khusus. Hanya admin yang bisa melihat seluruh data.",
  },
  {
    q: "Bagaimana proses verifikasi data?",
    a: "Setelah data dicatat, Ibu Susu dapat memverifikasi melalui link khusus yang dikirim via WhatsApp atau dibagikan secara manual. Verifikasi mengonfirmasi bahwa data yang tercatat memang benar.",
  },
];

const Info = () => {
  return (
    <div className="container max-w-2xl px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Tentang Mamasi</h1>
        <p className="text-muted-foreground">Memahami pencatatan mahram sepersusuan</p>
      </motion.div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-primary/5 border border-primary/10 p-6 md:p-8 mb-10 star-pattern"
      >
        <h2 className="text-xl font-display font-semibold mb-3">Apa itu Mahram Sepersusuan?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Dalam hukum Islam, hubungan persusuan (<em>raḍā'ah</em>) menciptakan ikatan kekerabatan 
          serupa dengan hubungan darah. Seorang anak yang disusui oleh seorang wanita menjadi 
          mahram (haram dinikahi) dengan anak-anak kandung wanita tersebut dan anak-anak lain 
          yang juga disusui olehnya.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Mamasi hadir untuk membantu keluarga Muslim mencatat dan menelusuri hubungan ini, 
          sehingga generasi mendatang memiliki catatan yang jelas tentang siapa saja yang menjadi 
          mahram mereka melalui jalur persusuan.
        </p>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-display font-semibold mb-5">Pertanyaan Umum</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/50 rounded-xl px-5 data-[state=open]:bg-muted/30"
            >
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 rounded-xl bg-muted/50 border border-border/50 p-5 text-center"
      >
        <p className="text-xs text-muted-foreground leading-relaxed">
          ⚠️ <strong>Disclaimer:</strong> Mamasi adalah alat bantu pencatatan digital. 
          Informasi yang tersedia bukan merupakan fatwa, rujukan hukum, atau pengganti konsultasi 
          dengan ulama. Untuk keputusan syar'i, silakan berkonsultasi dengan ahli yang berkompeten.
        </p>
      </motion.div>
    </div>
  );
};

export default Info;
