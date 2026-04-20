import { useState } from "react";
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

const briefingSchema = z.object({
  videoTitle: z.string().min(2, { message: "Título é obrigatório" }),
  description: z.string().min(10, { message: "Conte um pouco mais sobre o projeto" }),
  rawMinutes: z.string().min(1, { message: "Informe a duração bruta" }),
  targetDuration: z.string().min(1, { message: "Informe a duração desejada" }),
  hasOtherContact: z.boolean().default(false),
  otherContact: z.string().optional(),
});

type BriefingValues = z.infer<typeof briefingSchema>;

export const BriefingForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const form = useForm<BriefingValues>({
    resolver: zodResolver(briefingSchema),
    defaultValues: {
      videoTitle: "",
      description: "",
      rawMinutes: "",
      targetDuration: "",
      hasOtherContact: false,
      otherContact: "",
    },
  });

  const onSubmit = async (values: BriefingValues) => {
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/yuriceditor@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _subject: `Novo Briefing: ${values.videoTitle}`,
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Título do Vídeo */}
                <FormField
                  control={form.control}
                  name="videoTitle"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                        {t("briefing.fields.videoTitle")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("briefing.fields.videoTitlePlaceholder")} 
                          className="bg-transparent border-cream/20 text-cream h-14 rounded-none focus-visible:ring-ember focus-visible:border-ember"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-ember text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                {/* Minutos Brutos */}
                <FormField
                  control={form.control}
                  name="rawMinutes"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                        {t("briefing.fields.rawMinutes")}
                      </FormLabel>
                      <FormControl>
                        <Input 
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
                      <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                        {t("briefing.fields.targetDuration")}
                      </FormLabel>
                      <FormControl>
                        <Input 
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

                {/* Outro Contato */}
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="hasOtherContact"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0 pt-8">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-cream/20 data-[state=checked]:bg-ember data-[state=checked]:border-ember rounded-none w-5 h-5"
                          />
                        </FormControl>
                        <FormLabel className="mono-text text-[10px] uppercase tracking-widest text-cream/70 cursor-pointer">
                          {t("briefing.fields.otherContact")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasOtherContact") && (
                    <FormField
                      control={form.control}
                      name="otherContact"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in-up">
                          <FormControl>
                            <Input 
                              placeholder={t("briefing.fields.otherContactPlaceholder")} 
                              className="bg-transparent border-cream/20 text-cream h-10 rounded-none focus-visible:ring-ember focus-visible:border-ember"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Descrição */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="mono-text text-xs uppercase tracking-widest text-cream/70">
                      {t("briefing.fields.description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("briefing.fields.descriptionPlaceholder")} 
                        className="bg-transparent border-cream/20 text-cream min-h-[150px] rounded-none focus-visible:ring-ember focus-visible:border-ember resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-ember text-[10px] uppercase" />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-8">
                <Button 
                  type="submit" 
                  disabled={loading}
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
        </div>
      </div>
    </section>
  );
};
