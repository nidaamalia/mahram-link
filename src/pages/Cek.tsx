import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type HasilType = "mahram" | "mungkin" | "tidak" | null;

const Cek = () => {
  const [hasil, setHasil] = useState<HasilType>(null);
  const [loading, setLoading] = useState(false);

  const handleCek = () => {
    setLoading(true);
    // Simulated check — will connect to Supabase later
    setTimeout(() => {
      setLoading(false);
      setHasil("tidak");
    }, 1500);
  };

  return (
    <div className="container max-w-2xl px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Cek Mahram</h1>
        <p className="text-muted-foreground">
          Periksa apakah dua orang memiliki hubungan mahram sepersusuan
        </p>
      </motion.div>

      <div className="grid gap-6">
        {/* Person 1 */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Orang Pertama</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="nik" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="nik" className="flex-1">Cari dengan NIK</TabsTrigger>
                <TabsTrigger value="nama" className="flex-1">Cari dengan Nama</TabsTrigger>
              </TabsList>
              <TabsContent value="nik" className="space-y-3">
                <div className="space-y-2">
                  <Label>NIK</Label>
                  <Input placeholder="Masukkan 16 digit NIK" maxLength={16} />
                </div>
              </TabsContent>
              <TabsContent value="nama" className="space-y-3">
                <div className="space-y-2">
                  <Label>Nama</Label>
                  <Input placeholder="Nama lengkap" />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Lahir</Label>
                  <Input type="date" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground font-display text-sm">&</span>
          </div>
        </div>

        {/* Person 2 */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Orang Kedua</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="nik" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="nik" className="flex-1">Cari dengan NIK</TabsTrigger>
                <TabsTrigger value="nama" className="flex-1">Cari dengan Nama</TabsTrigger>
              </TabsList>
              <TabsContent value="nik" className="space-y-3">
                <div className="space-y-2">
                  <Label>NIK</Label>
                  <Input placeholder="Masukkan 16 digit NIK" maxLength={16} />
                </div>
              </TabsContent>
              <TabsContent value="nama" className="space-y-3">
                <div className="space-y-2">
                  <Label>Nama</Label>
                  <Input placeholder="Nama lengkap" />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Lahir</Label>
                  <Input type="date" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Button
          onClick={handleCek}
          disabled={loading}
          size="lg"
          className="w-full py-6 rounded-xl text-base gap-2"
        >
          <Search className="w-5 h-5" />
          {loading ? "Memeriksa..." : "Cek Sekarang"}
        </Button>

        {/* Result */}
        {hasil && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {hasil === "mahram" && (
              <Card className="border-accent bg-accent/5">
                <CardContent className="pt-6 flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-lg text-accent-foreground">✅ MAHRAM</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Terhubung melalui Ibu Susu: [nama], data terverifikasi.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            {hasil === "mungkin" && (
              <Card className="border-gold bg-gold/5">
                <CardContent className="pt-6 flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-gold shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-lg">⚠️ KEMUNGKINAN MAHRAM</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ada koneksi ditemukan tetapi data belum terverifikasi oleh Ibu Susu.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            {hasil === "tidak" && (
              <Card className="border-border">
                <CardContent className="pt-6 flex items-start gap-4">
                  <XCircle className="w-8 h-8 text-muted-foreground shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-lg">❌ Tidak Ditemukan</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bukan berarti bukan mahram — hanya tidak tercatat di sistem ini. Pastikan data sudah lengkap.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cek;
