interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag: (
    command: "config" | "event" | "js",
    targetId: string | Date,
    config?: GtagEventParams | { page_path?: string }
  ) => void;
  dataLayer: unknown[];
}
