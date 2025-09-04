import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { calcularMelhorRota } from '../services/api.js';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Fuel, Search, Settings, Car, Droplets, Navigation, MapPin } from 'lucide-react'; 
import '../App.css';

const Busca = () => {
  const navigate = useNavigate();
  const { userData, isConfigured } = useUser();

  const [formData, setFormData] = useState({
    idPartida: '', 
    idDestino: '',
    litrosParaAbastecer: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isConfigured) {
      navigate('/cadastro');
    }
  }, [isConfigured, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.idPartida || !formData.idPartida.trim()) {
      newErrors.idPartida = 'O local de partida é obrigatório.';
    }
    
    if (!formData.idDestino || !formData.idDestino.trim()) {
      newErrors.idDestino = 'O local de destino é obrigatório.';
    }
    
    if (formData.idPartida && formData.idPartida.trim() === formData.idDestino.trim()) {
      newErrors.idDestino = 'O destino deve ser diferente da partida.';
    }
    
    const quantidade = parseFloat(formData.litrosParaAbastecer);
    if (isNaN(quantidade) || quantidade <= 0) {
      newErrors.litrosParaAbastecer = 'A quantidade deve ser um número maior que zero.';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const dadosDaBusca = {
        idPartida: formData.idPartida,
        idDestino: formData.idDestino,
        autonomiaKmL: userData.consumo,
        litrosParaAbastecer: parseFloat(formData.litrosParaAbastecer)
      };

      const recomendacoes = await calcularMelhorRota(dadosDaBusca);

      console.log(recomendacoes);
      navigate('/resultados', {
        state: {
          resultados: recomendacoes,
          searchData: dadosDaBusca
        }
      });
      
    } catch (error) {
      console.error('Erro ao buscar postos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigureVehicle = () => navigate('/cadastro');

  return (
    // ALTERAÇÃO: Usando a cor de fundo do tema (--background)
    <div className="min-h-screen bg-background">
      
      {/* Header (reintroduzido para uma melhor UI) */}
      <header className="bg-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                  <h1 className="text-xl font-bold text-foreground">Gas Finder</h1>
                  <p className="text-sm text-muted-foreground">Encontre o melhor posto para abastecer</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleConfigureVehicle} className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configurar Veículo
            </Button>
        </div>
      </header>
      
      <main className="max-w-xl mx-auto px-4 py-4">
        
        {/* Card de Info do Veículo */}
        <Card className="mb-8 bg-secondary border-secondary">
          <CardContent className="py-1 flex items-center gap-4">
              <Car className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-foreground">Seu Veículo</h3>
                <div className="flex gap-4 mt-2">
                    <Badge variant="secondary">
                      <Droplets className="w-3 h-3 mr-1.5" />
                      {userData.consumo} km/litro
                    </Badge>
                </div>
              </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Encontrar Postos</CardTitle>
            <CardDescription className="text-center">
              Informe sua rota e a quantidade de combustível 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="partida" className="flex items-center gap-2">
                  {/* ALTERAÇÃO: Ícone usa a cor de sucesso (verde) do tema */}
                  <Navigation className="w-4 h-4 text-accent" />
                  Local de Partida
                </Label>
                <Input
                  id="partida"
                  type="text"
                  placeholder="Digite seu local de partida (Ex: UFAPE)"
                  value={formData.idPartida}
                  onChange={(e) => handleInputChange('idPartida', e.target.value)}
                />
                {/* ALTERAÇÃO: Mensagem de erro usa a cor de perigo (vermelho) do tema */}
                {errors.idPartida && <p className="text-sm text-destructive mt-1">{errors.idPartida}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destino" className="flex items-center gap-2">
                  {/* ALTERAÇÃO: Ícone usa a cor de perigo (vermelho) do tema */}
                  <MapPin className="w-4 h-4 text-destructive" />
                  Local de Destino
                </Label>
                <Input
                  id="destino"
                  type="text"
                  placeholder="Digite seu destino (Ex: Av. São Sebastião)"
                  value={formData.idDestino}
                  onChange={(e) => handleInputChange('idDestino', e.target.value)}
                />
                {errors.idDestino && <p className="text-sm text-destructive mt-1">{errors.idDestino}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="litros" className="flex items-center gap-2">
                  {/* ALTERAÇÃO: Ícone usa a cor primária (azul) do tema */}
                  <Fuel className="w-4 h-4 text-primary" />
                  Quantidade a Abastecer (Litros)
                </Label>
                <Input
                  id="litros"
                  type="number"
                  step="0.1"
                  min="1"
                  placeholder="Ex: 40"
                  value={formData.litrosParaAbastecer}
                  onChange={(e) => handleInputChange('litrosParaAbastecer', e.target.value)}
                />
                {errors.litrosParaAbastecer && <p className="text-sm text-destructive mt-1">{errors.litrosParaAbastecer}</p>}
              </div>
              
              {/* O botão padrão já usa a cor primária do tema, não precisa de classe de cor */}
              <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                {isLoading ? 'Buscando...' : 'Encontrar Melhores Postos'}
              </Button>

            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Busca;