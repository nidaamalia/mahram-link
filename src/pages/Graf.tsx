import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Share2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Graf = () => {
  const { nikIbuSusu } = useParams();
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link disalin!", description: "Link graf mahram telah disalin ke clipboard." });
  };

  // Placeholder — will use React Flow with Supabase data
  return (
    <div className="container px-4 py-10 md:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Graf Mahram</h1>
            <p className="text-sm text-muted-foreground mt-1">Visualisasi hubungan persusuan</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
              <Share2 className="w-4 h-4" />
              Bagikan
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/catat">
                <Plus className="w-4 h-4" />
                Tambah Anak
              </Link>
            </Button>
          </div>
        </div>

        {/* Graph placeholder */}
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 min-h-[400px] flex flex-col items-center justify-center gap-4 p-10">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl">🌿</span>
          </div>
          <div className="text-center">
            <h3 className="font-display text-lg font-semibold mb-1">Graf Interaktif</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Setelah terhubung ke database, graf akan menampilkan hubungan mahram sepersusuan secara interaktif.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-2 p-4 rounded-xl bg-gold/5 border border-gold/15">
          <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Data dengan tanda ⚠️ belum dikonfirmasi oleh Ibu Susu. Verifikasi diperlukan untuk memastikan keakuratan.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Graf;
