import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Headphones, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactLinks = [
  { icon: Mail, label: "ankitpaul1900@gmail.com", href: "mailto:ankitpaul1900@gmail.com" },
  { icon: Phone, label: "+918697990931", href: "tel:+918697990931" },
  // { icon: Headphones, label: "support@yoursaas.ai", href: "mailto:support@yoursaas.ai" },
];

interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

function FormDivider() {
  return (
    <div className="relative h-4 w-full" aria-hidden="true">
      <div className="absolute inset-0 bg-repeat-x text-white/20 [background-image:radial-gradient(circle,currentColor_0.8px,transparent_0.8px)] [background-size:6px_100%] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />
    </div>
  );
}

export default function ContactWithGlobe({
  title = "Let's talk",
  
  description = "Have a project in mind? I'd love to hear about it. Reach out and let's create something exceptional together.",
  className,
}: ContactWithGlobeProps) {
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    // Native `required` validation rejects empty fields; trim as well so a
    // message made only of whitespace cannot be submitted.
    for (const field of ["name", "company", "email", "message"] as const) {
      const value = formData.get(field);
      if (typeof value !== "string" || !value.trim()) {
        setSubmitMessage("Please complete every field before sending.");
        (form.querySelector(`[name="${field}"]`) as HTMLElement | null)?.focus();
        return;
      }
    }
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitMessage("Email sending isn't configured yet. Please email ankitpaul1900@gmail.com directly.");
      return;
    }

    setIsSending(true);
    setSubmitMessage("Sending your message...");
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: "ankitpaul1900@gmail.com",
          from_name: String(formData.get("name")).trim(),
          from_company: String(formData.get("company")).trim(),
          from_email: String(formData.get("email")).trim(),
          reply_to: String(formData.get("email")).trim(),
          message: String(formData.get("message")).trim(),
        },
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Email service rejected the message");
        setSubmitMessage("Message sent. Thanks for reaching out!");
        form.reset();
      })
      .catch(() => {
        setSubmitMessage("We couldn't send your message. Please try again or email ankitpaul1900@gmail.com directly.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section className={cn("relative flex min-h-full w-full py-4 text-white sm:py-6 lg:py-4 rounded-3xl mt-2 sm:mt-4", className)}>
      <div className="pointer-events-none absolute inset-0  " aria-hidden="true">
        <div className="absolute left-[8%] top-8 size-64 rounded-full bg-violet-500/15 blur-[100px]" />
        <div className="absolute bottom-8 right-[8%] size-72 rounded-full bg-cyan-400/10 blur-[110px]" />
      </div>
      <div className="relative z-10 mx-auto w-full flex flex-col max-w-7xl px-3 sm:px-5 lg:px-6 gap-2">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        className="mb-3 flex flex-col items-center gap-1.5 text-center sm:mb-4 lg:mb-2"
        >
         
          <h2 className="type-section-title font-semibold tracking-tight">{title}</h2>
          <p className="type-body max-w-lg text-slate-400">{description}</p>
        </motion.header>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch gap-4 sm:gap-4 lg:grid-cols-2 lg:gap-5 pb-5 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex min-w-0 flex-col gap-3 px-1 py-2 sm:px-4 sm:py-3 lg:gap-2.5"
          >
            <div>
              <h3 className="type-subheading font-semibold">Get in touch</h3>
              <p className="type-body mt-1 max-w-sm text-slate-400">
                Reach out via any channel below. I typically reply within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {contactLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="type-body group flex w-fit max-w-full items-center gap-2.5 break-all text-slate-400 transition-colors hover:text-white"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors group-hover:border-violet-400/40 group-hover:bg-violet-500/10">
                    <Icon className="size-3 text-slate-500 transition-colors group-hover:text-violet-300" />
                  </span>
                  {label}
                </a>
              ))}
            </div>

            {/* <Button
              type="button"
              variant="outline"
              className="type-body h-10 w-fit gap-2 rounded-xl border-white/15 bg-white/[0.04] text-white hover:bg-white/10 hover:text-white"
            >
              <Calendar className="size-4" />
              Book a call
            </Button> */}

          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            onSubmit={handleSubmit}
            whileHover={{ y: -8 }}
            className="flex min-w-0 flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.01] px-3 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-colors hover:border-violet-300/20 hover:bg-white/[0.02] sm:gap-3 sm:px-5 sm:py-6 lg:gap-4 lg:px-6 lg:py-6"
          >
            <div>
              <h3 className="type-subheading font-semibold">Send a message</h3>
              <p className="type-body mt-1 text-slate-400">Fill out the form and I’ll get back to you.</p>
            </div>

            <div className="hidden sm:block"><FormDivider /></div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label className="type-label flex flex-col gap-1.5 font-semibold uppercase tracking-widest text-slate-500">
                Full Name
                <input name="name" type="text" autoComplete="name" placeholder="Your name" required className="type-body w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-1.5 font-normal normal-case tracking-normal text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10 placeholder:text-slate-600" />
              </label>
              <label className="type-label flex flex-col gap-1.5 font-semibold uppercase tracking-widest text-slate-500">
                Company
                <input name="company" type="text" autoComplete="organization" placeholder="Your company" required className="type-body w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-1.5 font-normal normal-case tracking-normal text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10 placeholder:text-slate-600" />
              </label>
            </div>

            <label className="type-label flex flex-col gap-1.5 font-semibold uppercase tracking-widest text-slate-500">
              Email Address
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="type-body w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-1.5 font-normal normal-case tracking-normal text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10 placeholder:text-slate-600" />
            </label>

            <label className="type-label flex flex-col gap-1.5 font-semibold uppercase tracking-widest text-slate-500">
              Message
              <textarea name="message" placeholder="Type your message here" rows={2} required className="type-body w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3.5 py-2 font-normal normal-case tracking-normal text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10 placeholder:text-slate-600" />
            </label>

            <Button type="submit" disabled={isSending} className="type-body group h-9 w-fit rounded-xl border border-white/15 bg-white/[0.045] px-6 font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,.12)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-violet-400/[0.1]">
              {isSending ? "Sending..." : "Send message"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            {submitMessage && <p className="type-label text-slate-400" role="status" aria-live="polite">{submitMessage}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
