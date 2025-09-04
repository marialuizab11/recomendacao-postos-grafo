import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, CheckCircle, AlertCircle } from "lucide-react";
import "../App.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const { userData, updateUserData, isConfigured } = useUser();

  // O formulário agora só se preocupa com o 'consumo'
  const [formData, setFormData] = useState({
    consumo: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Carrega os dados existentes se já configurado
  useEffect(() => {
    if (isConfigured) {
      setFormData({ consumo: userData.consumo || "" });
    }
  }, [userData, isConfigured]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.consumo || parseFloat(formData.consumo) <= 0) {
      newErrors.consumo = "O consumo deve ser um número maior que 0.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    updateUserData({ consumo: parseFloat(formData.consumo) });
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/busca");
    }, 1000); // Redireciona após 1.5s
  };

  const handleSkipToBusca = () => {
    navigate("/busca");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Car className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isConfigured ? "Atualizar Veículo" : "Bem-vindo(a)!"}
          </h1>
          <p className="text-muted-foreground">
            Para começar, informe o consumo médio do seu veículo.
          </p>
        </div>

        {/* ALTERAÇÃO: Alerta de sucesso usa as cores de destaque do tema */}
        {showSuccess && (
          <Alert
            variant="default"
            className="mb-6 bg-accent/10 border-accent/50 text-accent"
          >
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Dados salvos! Redirecionando para a busca...
            </AlertDescription>
          </Alert>
        )}

        {/* O Card já usa as cores do tema por padrão */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Consumo do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="consumo" className="text-sm font-medium">
                  Consumo (km/litro)
                </Label>
                <Input
                  id="consumo"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Ex: 12.5"
                  value={formData.consumo}
                  onChange={(e) => handleInputChange("consumo", e.target.value)}
                />
                {errors.consumo && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    {errors.consumo}
                  </div>
                )}
                <p className="text-xs text-muted-foreground pt-1">
                  Quantos quilômetros seu carro faz por litro de combustível.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || showSuccess}
                >
                  {isLoading
                    ? "Salvando..."
                    : isConfigured
                    ? "Atualizar Dados"
                    : "Salvar e Continuar"}
                </Button>

                {isConfigured && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSkipToBusca}
                  >
                    Voltar para a Busca
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
