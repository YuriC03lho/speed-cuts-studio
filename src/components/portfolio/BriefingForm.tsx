import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Phone, MessageSquare, Send, Instagram, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const briefingSchema = z.object({
  videoTitle: z.string().min(2, { message: "Título é obrigatório" }),
  description: z.string().min(10, { message: "Conte um pouco mais sobre o projeto" }),
  rawMinutes: z.string().min(1, { message: "Informe a duração bruta" }),
  targetDuration: z.string().min(1, { message: "Informe a duração desejada" }),
  rawFilesUrl: z.string().url({ message: "O link dos arquivos é obrigatório" }),
  hasOtherContact: z.boolean().default(false),
  phone: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
});

type BriefingValues = z.infer<typeof briefingSchema>;

const CLICK_SOUND = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const SUCCESS_SOUND = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

export const BriefingForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const successAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickAudio.current = new Audio(CLICK_SOUND);
    clickAudio.current.volume = 0.2; // Bem sutil
    successAudio.current = new Audio(SUCCESS_SOUND);
    successAudio.current.volume = 0.4;
  }, []);

  const playClick = () => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
    }
  };

  const playSuccess = () => {
    if (successAudio.current) {
      successAudio.current.currentTime = 0;
      successAudio.current.play().catch(() => {});
    }
  };

  const form = useForm<BriefingValues>({
    resolver: zodResolver(briefingSchema),
    defaultValues: {
      videoTitle: "",
      description: "",
      rawMinutes: "",
      targetDuration: "",
      rawFilesUrl: "",
      hasOtherContact: false,
      phone: "+55 ",
      discord: "",
      telegram: "",
      instagram: "",
    },
  });

  const onSubmit = async (values: BriefingValues) => {
    playSuccess();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/mbdqadez", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _subject: `Novo Pedido: ${values.videoTitle}`,
        }),
      });

      if (response.ok) {
        toast.success(t("briefing.success"));
        form.reset();
      } else {
        throw new Error("Falha no envio");
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="briefing" className="relative py-24 md:py-40 bg-cream border-t-2 border-foreground/10">
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div>
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-foreground/40">{t("briefing.section").split(" ")[0]} </span> 
              {t("briefing.section").split(" ").slice(1).join(" ")}
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl">
              {t("briefing.title")}
              <br />
              <span className="text-ember">{t("briefing.titleHighlight")}</span>
            </h2>
          </div>
          <p className="mono-text text-xs uppercase tracking-widest text-foreground/60 max-w-xs">
            {t("briefing.tagline")}
          </p>
        </div>

        <div className="bg-ink p-8 md:p-12 shadow-brutal border-2 border-ink reveal">
          <TooltipProvider delayDuration={200}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Título do Projeto */}
                  <FormField
                    control={form.control}
                    name="videoTitle"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                            {t("briefing.fields.videoTitle")}
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-3 h-3 text-ember cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-ember text-cream border-none mono-text text-[10px] rounded-none">
                              <p>{t("briefing.fields.help.videoTitle")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <Input 
                            onFocus={playClick}
                            placeholder={t("briefing.fields.videoTitlePlaceholder")} 
                            className="bg-transparent border-cream/20 text-cream h-14 rounded-none focus-visible:ring-ember focus-visible:border-ember"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-ember text-[10px] uppercase" />
                      </FormItem>
                    )}
                  />

                  {/* Video Bruto */}
                  <FormField
                    control={form.control}
                    name="rawMinutes"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                            {t("briefing.fields.rawMinutes")}
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-3 h-3 text-ember cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-ember text-cream border-none mono-text text-[10px] rounded-none">
                              <p>{t("briefing.fields.help.rawMinutes")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <Input 
                            onFocus={playClick}
                            type="number"
                            placeholder={t("briefing.fields.rawMinutesPlaceholder")} 
                            className="bg-transparent border-cream/20 text-cream h-14 rounded-none focus-visible:ring-ember focus-visible:border-ember"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-ember text-[10px] uppercase" />
                      </FormItem>
                    )}
                  />

                  {/* Duração Final */}
                  <FormField
                    control={form.control}
                    name="targetDuration"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                            {t("briefing.fields.targetDuration")}
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-3 h-3 text-ember cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-ember text-cream border-none mono-text text-[10px] rounded-none">
                              <p>{t("briefing.fields.help.targetDuration")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <Input 
                            onFocus={playClick}
                            type="number"
                            placeholder={t("briefing.fields.targetDurationPlaceholder")} 
                            className="bg-transparent border-cream/20 text-cream h-14 rounded-none focus-visible:ring-ember focus-visible:border-ember"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-ember text-[10px] uppercase" />
                      </FormItem>
                    )}
                  />

                  {/* Outro Contato Toggle */}
                  <div className="flex flex-col justify-end">
                    <FormField
                      control={form.control}
                      name="hasOtherContact"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0 h-14">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                playClick();
                              }}
                              className="border-cream/20 data-[state=checked]:bg-ember data-[state=checked]:border-ember rounded-none w-5 h-5"
                            />
                          </FormControl>
                          <div className="flex items-center gap-2">
                            <FormLabel className="mono-text text-[10px] uppercase tracking-widest text-cream/70 cursor-pointer">
                              {t("briefing.fields.otherContact")}
                            </FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-3 h-3 text-ember cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-ember text-cream border-none mono-text text-[10px] rounded-none">
                                <p>{t("briefing.fields.help.otherContact")}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                </div>

                {/* Conditional Optional Fields */}
                {form.watch("hasOtherContact") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-cream/10 bg-cream/5 animate-fade-in-up">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mono-text text-[10px] text-cream/40 uppercase flex items-center gap-2">
                            <Phone className="w-3 h-3" /> {t("briefing.fields.phone")}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              onFocus={playClick}
                              className="bg-transparent border-cream/10 text-cream h-10 rounded-none text-xs"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discord"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mono-text text-[10px] text-cream/40 uppercase flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" /> {t("briefing.fields.discord")}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              onFocus={playClick}
                              className="bg-transparent border-cream/10 text-cream h-10 rounded-none text-xs"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telegram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mono-text text-[10px] text-cream/40 uppercase flex items-center gap-2">
                            <Send className="w-3 h-3" /> {t("briefing.fields.telegram")}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              onFocus={playClick}
                              className="bg-transparent border-cream/10 text-cream h-10 rounded-none text-xs"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mono-text text-[10px] text-cream/40 uppercase flex items-center gap-2">
                            <Instagram className="w-3 h-3" /> {t("briefing.fields.instagram")}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              onFocus={playClick}
                              className="bg-transparent border-cream/10 text-cream h-10 rounded-none text-xs"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Descrição */}
                {/* Descrição */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                          {t("briefing.fields.description")}
                        </FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-ember cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-ember text-cream border-none mono-text text-[10px] rounded-none">
                            <p>{t("briefing.fields.help.description")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Textarea 
                          onFocus={playClick}
                          placeholder={t("briefing.fields.descriptionPlaceholder")} 
                          className="bg-transparent border-cream/20 text-cream min-h-[150px] rounded-none focus-visible:ring-ember focus-visible:border-ember resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-ember text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                {/* Link dos Arquivos */}
                <FormField
                  control={form.control}
                  name="rawFilesUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                        {t("briefing.fields.rawFilesUrl")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          onFocus={playClick}
                          placeholder={t("briefing.fields.rawFilesUrlPlaceholder")} 
                          className="bg-transparent border-cream/20 text-cream h-14 rounded-none focus-visible:ring-ember focus-visible:border-ember"
                          {...field} 
                        />
                      </FormControl>
                      <p className="text-[10px] mono-text text-ember/80 mt-2 uppercase tracking-tighter">
                        {t("briefing.fields.rawFilesUrlHint")}
                      </p>
                      <FormMessage className="text-ember text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-8">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    onClick={playClick}
                    className="btn-brutal !bg-cream !text-ink hover:!bg-ember hover:!text-cream w-full md:w-auto px-12 h-16 transition-all shadow-brutal-sm group"
                  >
                    <span className="mono-text font-bold tracking-widest uppercase">
                      {loading ? t("briefing.sending") : t("briefing.submit")}
                    </span>
                    {!loading && <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>}
                  </Button>
                </div>
              </form>
            </Form>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};
