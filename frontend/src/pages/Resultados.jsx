import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calcularMelhorRota } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowLeft, MapPin, DollarSign, Route, Award, TrendingDown, Navigation, Fuel } from 'lucide-react';
import '../App.css';
import carrinhoLoadingGif from '../assets/carrinho.gif';

const Resultados = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [partidaCoords, setPartidaCoords] = useState(null);
  const [destinoCoords, setDestinoCoords] = useState(null);

  const searchData = location.state?.searchData;

  useEffect(() => {
    if (!searchData) {
      console.log("Nenhum resultado encontrado, voltando para a busca.");
      navigate('/busca');
      return;
    }
    
    const fetchResultados = async () => {
      try {
        const respostaCompleta = await calcularMelhorRota(searchData);

        setResultados(respostaCompleta.recomendacoes);
        setPartidaCoords(respostaCompleta.partida);
        setDestinoCoords(respostaCompleta.destino);
      } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
        navigate('/busca', { state: { error: "Não foi possível buscar os resultados." } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResultados();
  }, [searchData, navigate]);

  const handleIrParaTrajeto = (postoDaParada) => {
    if (!partidaCoords || !destinoCoords) {
      alert("Coordenadas de partida/destino não encontradas para gerar a rota.");
      return;
    }

    const origem = `${partidaCoords.latitude},${partidaCoords.longitude}`;
    const destino = `${destinoCoords.latitude},${destinoCoords.longitude}`;
    const parada = `${postoDaParada.localizacao.latitude},${postoDaParada.localizacao.longitude}`;

    // Monta a URL correta com os 3 pontos
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origem}&destination=${destino}&waypoints=${parada}`;

    window.open(googleMapsUrl, '_blank');
  };

  const handleNovaConsulta = () => {
    navigate('/busca');
  };

  const melhoresResultados = resultados.slice(0, 4);
  const custoMaisCaro = melhoresResultados.length > 0 ? melhoresResultados[melhoresResultados.length - 1].custoTotal : 0;

  if (isLoading){
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
      <div className="shadow-sm bg-primary/5 border-b">
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
          { melhoresResultados.map((resultado, index) => {
            const economia = custoMaisCaro - resultado.custoTotal;

            return(
            <Card 
              key={resultado.posto.id} 
              className={`transition-all duration-200 hover:shadow-lg ${
                index === 0 
                  ? 'border-accent/50 bg-accent/5' // Estilo da melhor opção usando a cor de sucesso
                  : 'border bg-card'                 // Estilo padrão usando cores do tema
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
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
                      Gasolina: R${resultado.posto.precoGasolina}/L
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-accent-foreground/80" />
                    <div>
                      <p className="text-sm text-accent-foreground/80 font-medium">Economia</p>
                      <p className="text-lg font-bold text-accent-foreground">
                        R$ {economia.toFixed(2)}
                      </p>
                      <p className="text-xs text-accent-foreground/60">vs. Posto mais caro</p>
                    </div>
                  </div>
                  {/* Custo do Trajeto */}
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                    <Route className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-primary/80 font-medium">Custo do Trajeto</p>
                      <p className="text-lg font-bold text-primary">
                        R$ {resultado.custoTrajeto.toFixed(2)}
                      </p>
                      <p className="text-xs text-primary/60">Ida e volta</p>
                    </div>
                  </div>
                
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg">
                    <Fuel className="w-6 h-6 text-destructive" />
                    <div>
                      <p className="text-sm text-destructive font-medium">Custo Abastecimento</p>
                      <p className="text-lg font-bold text-destructive/90">
                        R$ {resultado.custoAbastecimento.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">Valor do combustível</p>
                    </div>
                  </div>
                </div>
              </CardContent>
                <CardContent>
                  <Button 
                    onClick={() => handleIrParaTrajeto(resultado.posto)}
                    className="w-full md:col-span-2" 
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ir para o Trajeto no Google Maps
                  </Button>
                </CardContent>              
            </Card>
            )
          })
        }
        </div>
      </div>
    </div>
  );
};

export default Resultados;