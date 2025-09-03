import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowLeft, MapPin, DollarSign, Route, Award } from 'lucide-react';
import '../App.css';
import carrinhoLoadingGif from '../assets/carrinho.gif';

const Resultados = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisualLoading, setIsVisualLoading] = useState(true);

  const resultados = location.state?.resultados || [];
  const searchData = location.state?.searchData || {}; 


  useEffect(() => {
    if (!location.state || !location.state.resultados) {
      console.log("Nenhum resultado encontrado, voltando para a busca.");
      navigate('/busca');
      return;
    }
    const timer = setTimeout(() => {
      setIsVisualLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  const handleIrParaTrajeto = (postoDaParada) => {
    const partidaOriginal = resultados.find(res => res.posto.id === searchData.idPartida)?.posto;
    const destinoOriginal = resultados.find(res => res.posto.id === searchData.idDestino)?.posto;

    // Se não encontrarmos a partida ou destino, não fazemos nada (fallback)
    if (!partidaOriginal || !destinoOriginal) {
      alert("Não foi possível encontrar as coordenadas de partida/destino para gerar a rota.");
      return;
    }

    const origemCoords = `${partidaOriginal.localizacao.latitude},${partidaOriginal.localizacao.longitude}`;
    const destinoCoords = `${destinoOriginal.localizacao.latitude},${destinoOriginal.localizacao.longitude}`;
    const paradaCoords = `${postoDaParada.localizacao.latitude},${postoDaParada.localizacao.longitude}`;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origemCoords}&destination=${destinoCoords}&waypoints=${paradaCoords}`;

    // Abre o link em uma nova aba
    window.open(googleMapsUrl, '_blank');
  };

  const handleNovaConsulta = () => {
    navigate('/busca');
  };

  const melhoresResultados = resultados.slice(0, 4);

  if (isVisualLoading){
     return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <img 
            src={carrinhoLoadingGif} 
            alt="Carrinho andando enquanto a rota é calculada" 
            className="w-48 mx-auto mb-4" // Tamanho ajustado
          />
          <h2 className="text-xl font-semibold text-foreground">Otimizando sua rota...</h2>
          <p className="text-muted-foreground">Estamos encontrando o caminho mais econômico!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm bg-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleNovaConsulta} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Nova Consulta
            </Button>
            <h1 className="text-xl font-bold text-foreground">Resultados da Busca</h1>
            <Badge variant="secondary">{melhoresResultados.length} melhores opções</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Lista de Postos */}
        <div className="space-y-6">
          {melhoresResultados.map((resultado, index) => (
            <Card 
              key={resultado.posto.id} 
              className={`transition-all duration-200 hover:shadow-lg ${
                index === 0 
                  ? 'border-accent/50 bg-accent/10' // Estilo da melhor opção usando a cor de sucesso
                  : 'border bg-card'                 // Estilo padrão usando cores do tema
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    {index === 0 && (
                      // Badge usa a cor de sucesso (--accent)
                      <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 mb-2">
                        <Award className="w-3 h-3 mr-1" />
                        Melhor Custo-Benefício
                      </Badge>
                    )}
                    <CardTitle className="text-xl mb-1 text-card-foreground">{resultado.posto.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {resultado.posto.endereco}
                    </CardDescription>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      R$ {resultado.custoTotal.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Custo Total da Viagem
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Custo do Trajeto */}
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                    <Route className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-primary font-medium">Custo do Deslocamento</p>
                      <p className="text-lg font-bold text-primary/90">
                        R$ {resultado.custoTrajeto.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Custo do Abastecimento */}
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                    <DollarSign className="w-6 h-6 text-accent" />
                    <div>
                      <p className="text-sm text-accent font-medium">Custo do Abastecimento</p>
                      <p className="text-lg font-bold text-accent/90">
                        R$ {resultado.custoAbastecimento.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Botão principal já usa a cor --primary por padrão */}
                  <Button 
                    onClick={() => handleIrParaTrajeto(resultado.posto)}
                    className="w-full md:col-span-2" // Sem classes de cor, ele pega o padrão do tema
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ir para o Trajeto no Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resultados;