import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AnakData {
  nama: string;
  jenis: "kandung" | "susuan";
  nik?: string;
  tanggalLahir?: string;
  jumlahSusuan?: number;
  tahunSusuan?: number;
}

const emptyAnak: AnakData = { nama: "", jenis: "susuan" };

const Catat = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [nikIbu, setNikIbu] = useState("");
  const [namaIbu, setNamaIbu] = useState("");
  const [namaSuami, setNamaSuami] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kota, setKota] = useState("");
  const [ibuInfoOpen, setIbuInfoOpen] = useState(false);
  const [anakList, setAnakList] = useState<AnakData[]>([{ ...emptyAnak }]);
  const [anakInfoOpen, setAnakInfoOpen] = useState<Record<number, boolean>>({});

  const updateAnak = (index: number, field: keyof AnakData, value: any) => {
    setAnakList((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
    );
  };

  const addAnak = () => {
    setAnakList((prev) => [...prev, { ...emptyAnak }]);
  };

  const removeAnak = (index: number) => {
    if (anakList.length > 1) {
      setAnakList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const canProceedStep1 = nikIbu.trim() && namaIbu.trim();
  const canSubmit = anakList.every((a) => a.nama.trim());

  const handleSubmit = () => {
    // This will be connected to Supabase later
    toast({
      title: "Data berhasil dicatat! ✨",
      description: `${anakList.length} anak telah dicatat untuk Ibu Susu ${namaIbu}.`,
    });
    setStep(3);
  };

  return (
    <div className="container max-w-2xl px-4 py-10 md:py-16">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Data Ibu Susu */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Data Ibu Susu</CardTitle>
                <p className="text-sm text-muted-foreground">Masukkan data ibu yang menyusui</p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nikIbu">
                    NIK Ibu Susu <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nikIbu"
                    placeholder="Masukkan 16 digit NIK"
                    value={nikIbu}
                    onChange={(e) => setNikIbu(e.target.value)}
                    maxLength={16}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="namaIbu">
                    Nama Ibu Susu <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="namaIbu"
                    placeholder="Nama lengkap ibu susu"
                    value={namaIbu}
                    onChange={(e) => setNamaIbu(e.target.value)}
                  />
                </div>

                <Collapsible open={ibuInfoOpen} onOpenChange={setIbuInfoOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-0">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${ibuInfoOpen ? "rotate-180" : ""}`}
                      />
                      Tambah info lainnya
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-3">
                    <div className="space-y-2">
                      <Label htmlFor="namaSuami">Nama Suami / Bapak Susu</Label>
                      <Input
                        id="namaSuami"
                        placeholder="Nama suami"
                        value={namaSuami}
                        onChange={(e) => setNamaSuami(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="noHp">No HP Ibu Susu</Label>
                      <Input
                        id="noHp"
                        placeholder="08xxxxxxxxxx"
                        value={noHp}
                        onChange={(e) => setNoHp(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kota">Kota</Label>
                      <Input
                        id="kota"
                        placeholder="Kota domisili"
                        value={kota}
                        onChange={(e) => setKota(e.target.value)}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full py-6 text-base rounded-xl"
                >
                  Lanjutkan →
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Data Anak */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-display text-2xl">Data Anak</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Anak yang disusui oleh <span className="font-semibold text-foreground">{namaIbu}</span>
                    </p>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    NIK: {nikIbu.slice(0, 4)}...
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {anakList.map((anak, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/50 p-5 space-y-4 relative"
                  >
                    {anakList.length > 1 && (
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          Anak ke-{index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive h-7 text-xs"
                          onClick={() => removeAnak(index)}
                        >
                          Hapus
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>
                        Nama Anak <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="Nama lengkap anak"
                        value={anak.nama}
                        onChange={(e) => updateAnak(index, "nama", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Jenis</Label>
                      <div className="flex gap-2">
                        {(["susuan", "kandung"] as const).map((j) => (
                          <button
                            key={j}
                            onClick={() => updateAnak(index, "jenis", j)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                              anak.jenis === j
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground border-border hover:border-primary/30"
                            }`}
                          >
                            {j === "susuan" ? "Anak Susuan" : "Anak Kandung"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Collapsible
                      open={anakInfoOpen[index]}
                      onOpenChange={(open) =>
                        setAnakInfoOpen((prev) => ({ ...prev, [index]: open }))
                      }
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 px-0">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              anakInfoOpen[index] ? "rotate-180" : ""
                            }`}
                          />
                          Tambah info lainnya
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 pt-3">
                        <div className="space-y-2">
                          <Label>NIK Anak</Label>
                          <Input
                            placeholder="NIK anak (opsional)"
                            value={anak.nik || ""}
                            onChange={(e) => updateAnak(index, "nik", e.target.value)}
                            maxLength={16}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tanggal Lahir</Label>
                          <Input
                            type="date"
                            value={anak.tanggalLahir || ""}
                            onChange={(e) => updateAnak(index, "tanggalLahir", e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Jumlah Susuan</Label>
                            <Input
                              type="number"
                              min={1}
                              placeholder="Berapa kali"
                              value={anak.jumlahSusuan || ""}
                              onChange={(e) =>
                                updateAnak(index, "jumlahSusuan", parseInt(e.target.value) || undefined)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tahun Disusui</Label>
                            <Input
                              type="number"
                              placeholder="Tahun"
                              value={anak.tahunSusuan || ""}
                              onChange={(e) =>
                                updateAnak(index, "tahunSusuan", parseInt(e.target.value) || undefined)
                              }
                            />
                          </div>
                        </div>
                        {anak.jumlahSusuan && anak.jumlahSusuan < 5 && (
                          <div className="flex gap-2 p-3 rounded-lg bg-gold/10 border border-gold/20">
                            <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                              Kurang dari 5 kali susuan belum memenuhi syarat mahram menurut mayoritas ulama — tetap kami catat.
                            </p>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addAnak}
                  className="w-full gap-2 border-dashed"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Anak Lagi
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 py-6 rounded-xl"
                  >
                    ← Kembali
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="flex-1 py-6 rounded-xl text-base"
                  >
                    Simpan Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Sukses */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-primary/20 shadow-sm">
              <CardContent className="pt-8 pb-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-2">Data Berhasil Dicatat!</h2>
                  <p className="text-muted-foreground text-sm">
                    {anakList.length} anak telah dicatat untuk Ibu Susu {namaIbu}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-5 text-left space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Ibu Susu</p>
                    <p className="font-medium">{namaIbu}</p>
                  </div>
                  {anakList.map((anak, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Anak {i + 1}</p>
                        <p className="font-medium">{anak.nama}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {anak.jenis === "susuan" ? "Susuan" : "Kandung"}
                        </Badge>
                        <Badge variant="secondary" className="text-xs gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Belum Terverifikasi
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep(1);
                      setNikIbu("");
                      setNamaIbu("");
                      setNamaSuami("");
                      setNoHp("");
                      setKota("");
                      setAnakList([{ ...emptyAnak }]);
                    }}
                    className="flex-1 rounded-xl py-5"
                  >
                    Catat Data Baru
                  </Button>
                  <Button asChild className="flex-1 rounded-xl py-5">
                    <a href={`/graf/${nikIbu}`}>Lihat Graf Mahram</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catat;
