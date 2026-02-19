"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  description: string;
  icon: React.ElementType;
};

const themes: ThemeOption[] = [
  {
    value: "light",
    label: "Claro",
    description: "Tema claro para uso diurno",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Oscuro",
    description: "Tema oscuro para uso nocturno",
    icon: Moon,
  },
  {
    value: "system",
    label: "Automático",
    description: "Sigue la configuración del sistema",
    icon: Monitor,
  },
];

export function ThemeSelector({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("space-y-3", className)}>
        {themes.map((t) => (
          <div
            key={t.value}
            className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card animate-pulse"
          >
            <div className="w-10 h-10 rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-40 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {themes.map((t) => {
        const Icon = t.icon;
        const isSelected = theme === t.value;

        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              "w-full flex items-center gap-4 p-3 rounded-lg border transition-all",
              "hover:bg-accent hover:border-accent",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">{t.label}</div>
              <div className="text-sm text-muted-foreground">
                {t.description}
              </div>
            </div>
            {isSelected && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
