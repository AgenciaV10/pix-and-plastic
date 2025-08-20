import { Shield, Lock } from "lucide-react";

interface SecurityMessageProps {
  message?: string;
}

export function SecurityMessage({ 
  message = "Protegemos seus dados de pagamento com criptografia para garantir segurança bancária." 
}: SecurityMessageProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-blue-800">
        <p>{message}</p>
      </div>
    </div>
  );
}