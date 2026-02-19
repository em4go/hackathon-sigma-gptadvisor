"use client";

import { useState } from "react";
import { Building2, Check, Loader2, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BANKS = [
  { id: "santander", name: "Santander", color: "#CC0000" },
  { id: "bbva", name: "BBVA", color: "#004481" },
  { id: "caixa", name: "CaixaBank", color: "#005D5D" },
  { id: "sabadell", name: "Banco Sabadell", color: "#0066B3" },
  { id: "bankinter", name: "Bankinter", color: "#0077C8" },
  { id: "ing", name: "ING", color: "#FF6600" },
];

interface BankButtonProps {
  bank: (typeof BANKS)[number];
  onSelect: (bankId: string) => void;
  isLoading: boolean;
}

function BankButton({ bank, onSelect, isLoading }: BankButtonProps) {
  return (
    <button
      onClick={() => onSelect(bank.id)}
      disabled={isLoading}
      className="flex items-center gap-3 w-full p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors disabled:opacity-50"
    >
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: bank.color }}
      >
        {bank.name.substring(0, 2).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-foreground">{bank.name}</span>
      {isLoading && <Loader2 className="size-4 animate-spin ml-auto" />}
    </button>
  );
}

export function BankSyncButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    setIsSyncing(true);

    // Simular sincronización
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
    }, 2000);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state cuando se cierra
      setTimeout(() => {
        setSelectedBank(null);
        setSyncComplete(false);
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <RefreshCw className="size-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <span className="text-sm font-medium text-foreground">
              Sync with Bank
            </span>
            <p className="text-xs text-muted-foreground">
              Connect your bank account
            </p>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="size-5" />
            Connect Your Bank
          </DialogTitle>
          <DialogDescription>
            Select your bank to synchronize your account data
          </DialogDescription>
        </DialogHeader>

        {syncComplete ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="size-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground">
                Successfully Connected!
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your {BANKS.find((b) => b.id === selectedBank)?.name} account
                has been linked
              </p>
            </div>
            <Button onClick={() => setIsOpen(false)} className="mt-2">
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-2 mt-2">
            {BANKS.map((bank) => (
              <BankButton
                key={bank.id}
                bank={bank}
                onSelect={handleBankSelect}
                isLoading={isSyncing && selectedBank === bank.id}
              />
            ))}
          </div>
        )}

        {isSyncing && !syncComplete && (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Connecting to {BANKS.find((b) => b.id === selectedBank)?.name}...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
