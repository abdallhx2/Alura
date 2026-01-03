"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const switchLocale = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors"
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span>{currentLocale === "en" ? "AR" : "EN"}</span>
    </button>
  );
}
