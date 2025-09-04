package app;

import io.javalin.Javalin;
import dto.RequisicaoCalculoDTO;
import data.DataLoader;
import service.CalculadoraCustoBeneficioService;
import model.*;
import io.javalin.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import service.GeocodingService;


/**
 * Classe principal que inicializa e configura o servidor web da API.
 */
public class ApiServer {   

    public static void main(String[] args) {
        DataLoader dataLoader = new DataLoader("postos-gasolina.json");
        List<Posto> postos = dataLoader.carregarPostos();
        
        if(postos.isEmpty()){
            System.err.println("Nenhum posto carregado...");
            return;
        }
        
        Grafo grafo = criarGrafoSimples(postos);
        CalculadoraCustoBeneficioService calculadoraService = new CalculadoraCustoBeneficioService(grafo, postos);
        
        Javalin app = Javalin.create();

        app.before(ctx -> {
            ctx.header("Access-Control-Allow-Origin", "*");

            ctx.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

            ctx.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

        app.options("/*", ctx -> {
            ctx.status(204);
        });

        app.post("/calcular-rota", ctx -> {
            try{
                GeocodingService geocodingService = new GeocodingService();
                RequisicaoCalculoDTO requisicao = ctx.bodyAsClass(RequisicaoCalculoDTO.class);
                
                Localizacao coordsPartida = geocodingService.getCoordenadas(requisicao.getEnderecoPartida());
                Localizacao coordsDestino = geocodingService.getCoordenadas(requisicao.getEnderecoDestino());
                
                if (coordsPartida == null || coordsDestino == null) {
                    ctx.status(HttpStatus.BAD_REQUEST);
                    ctx.json(Map.of("erro", "Coordenadas do endereço não encontradas"));
                    return;
                }
                
                Veiculo veiculo = new Veiculo(requisicao.getAutonomiaKmL());
                double precoMedio = 5.90; 

                List<OpcaoRecomendada> resultado = calculadoraService.calcularMelhoresOpcoes(
                    coordsPartida,
                    coordsDestino,
                    veiculo,
                    requisicao.getLitrosParaAbastecer(),
                    precoMedio
                );
                ctx.status(HttpStatus.OK);
                ctx.json(resultado);
                
            } catch (Exception e) {
                ctx.status(HttpStatus.BAD_REQUEST);
                ctx.json(Map.of("erro", "Não foi possível processar sua requisição: " + e.getMessage()));
            }
        });
        
        System.out.println("Iniciando o servidor na porta 7070...");
        app.start(7070);
        System.out.println("Servidor iniciado!");
    }
    
    /**
     * Encontra um Posto na nossa lista de dados pelo ID.
     */
    private static Localizavel encontrarLocalizavelPorId(String id, List<Posto> postos) {
        return postos.stream()
                     .filter(p -> p.getId().equalsIgnoreCase(id))
                     .findFirst()
                     .orElse(null);
    }

    /**
     * Cria um grafo simples contendo apenas os postos, com arestas (Ruas)
     * diretas entre todos eles, cuja distância é calculada por Haversine.
     */
    private static Grafo criarGrafoSimples(List<Posto> postos) {
        Grafo g = new Grafo();
        for (Posto p : postos) {
            g.adicionarVertice(p);
        }

        for (Posto p1 : postos) {
            for (Posto p2 : postos) {
                if (!p1.equals(p2)) {
                    double distancia = calcularDistanciaHaversine(
                        p1.getLocalizacao().getLatitude(), p1.getLocalizacao().getLongitude(),
                        p2.getLocalizacao().getLatitude(), p2.getLocalizacao().getLongitude()
                    );
                    // Adicionando como mão dupla. Assumimos que o método em Grafo existe.
                    g.adicionarRua(p1, p2, distancia, "Rua 1");
                }
            }
        }
        return g;
    }

    /**
     * Calcula a distância em linha reta (as-the-crow-flies) entre dois pontos de coordenadas.
     */
    public static double calcularDistanciaHaversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Raio da Terra em km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}