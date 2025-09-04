import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

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
    enderecoPartida: '', 
    enderecoDestino: '',
    litrosParaAbastecer: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isConfigured) {
      navigate('/cadastro');
    }
  }, [isConfigured, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.enderecoPartida || !formData.enderecoPartida.trim()) {
      newErrors.enderecoPartida = 'O local de partida é obrigatório.';
    }
    
    if (!formData.enderecoDestino || !formData.enderecoDestino.trim()) {
      newErrors.enderecoDestino = 'O local de destino é obrigatório.';
    }
    
    if (formData.enderecoPartida && formData.enderecoPartida.trim() === formData.enderecoDestino.trim()) {
      newErrors.enderecoDestino = 'O destino deve ser diferente da partida.';
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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
     const dadosDaBusca = {
      enderecoPartida: formData.enderecoPartida,
      enderecoDestino: formData.enderecoDestino,
      autonomiaKmL: userData.consumo,
      litrosParaAbastecer: parseFloat(formData.litrosParaAbastecer)
    };

    navigate('/resultados', {
      state: {
        searchData: dadosDaBusca
      }
    });
  };

  const handleConfigureVehicle = () => navigate('/cadastro');

  if (!isConfigured) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
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
                  
                  <Navigation className="w-4 h-4 text-accent" />
                  Local de Partida
                </Label>
                <Input
                  id="partida"
                  type="text"
                  placeholder="Digite seu local de partida (Ex: UFAPE)"
                  value={formData.enderecoPartida}
                  onChange={(e) => handleInputChange('enderecoPartida', e.target.value)}
                />
                {errors.enderecoPartida && <p className="text-sm text-destructive mt-1">{errors.enderecoPartida}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destino" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-destructive" />
                  Local de Destino
                </Label>
                <Input
                  id="destino"
                  type="text"
                  placeholder="Digite seu destino (Ex: Rua São Sebastião)"
                  value={formData.enderecoDestino}
                  onChange={(e) => handleInputChange('enderecoDestino', e.target.value)}
                />
                {errors.enderecoDestino && <p className="text-sm text-destructive mt-1">{errors.enderecoDestino}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="litros" className="flex items-center gap-2">
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
              <Button type="submit" className="w-full h-12 text-lg">
                Encontrar Melhores Postos
              </Button>

            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Busca;