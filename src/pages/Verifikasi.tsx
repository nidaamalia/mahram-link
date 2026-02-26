import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type VerifStatus = "pending" | "verified" | "ditolak" | "used";

const Verifikasi = () => {
  const { token } = useParams();
  const [status, setStatus] = useState<VerifStatus>("pending");

  // Placeholder data — will fetch from Supabase
  const namaAnak = "Ahmad";

  const handleVerif = (confirm: boolean) => {
    // Will connect to Supabase later
    setStatus(confirm ? "verified" : "ditolak");
  };

  return (
    <div className="container max-w-md px-4 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {status === "pending" && (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-semibold mb-2">Konfirmasi Penyusuan</h1>
                <p className="text-muted-foreground">
                  Apakah Anda pernah menyusui <strong className="text-foreground">{namaAnak}</strong>?
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleVerif(false)}
                  className="flex-1 py-5 rounded-xl gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Tidak, ini salah
                </Button>
                <Button
                  onClick={() => handleVerif(true)}
                  className="flex-1 py-5 rounded-xl gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Ya, benar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {status === "verified" && (
          <Card className="border-accent/30 shadow-sm">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-display font-semibold">Terverifikasi!</h2>
              <p className="text-sm text-muted-foreground">
                Terima kasih. Data penyusuan {namaAnak} telah dikonfirmasi.
              </p>
            </CardContent>
          </Card>
        )}

        {status === "ditolak" && (
          <Card className="border-destructive/30 shadow-sm">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-xl font-display font-semibold">Ditolak</h2>
              <p className="text-sm text-muted-foreground">
                Data telah ditandai sebagai tidak valid. Terima kasih atas konfirmasinya.
              </p>
            </CardContent>
          </Card>
        )}

        {status === "used" && (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <p className="text-muted-foreground">Link verifikasi ini sudah pernah digunakan.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Verifikasi;
