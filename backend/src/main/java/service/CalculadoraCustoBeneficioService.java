package service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
//import graph.Grafo;
import model.*;

import java.io.FileReader;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.*;

/**
 * Calcula o custo-benefício de abastercer em diferentes postos.
 */
public class CalculadoraCustoBeneficioService {
    private final List<Posto> postos;
    private final DijkstraExecutor dijkstraExecutor;
    private final Grafo grafo;
    
    public CalculadoraCustoBeneficioService(Grafo grafo, List<Posto> listaPostos){
        this.grafo = grafo;
        this.dijkstraExecutor = new DijkstraExecutor();
        this.postos = listaPostos;
    }
    
    /* Calcula e ordena as melhores opções de abastecimento */
    public List<OpcaoRecomendada> calcularMelhoresOpcoes(
            Localizacao partidaCoords, 
            Localizacao destinoCoords, 
            Veiculo veiculo, 
            double litrosParaAbastecer, 
            double precoMedioCombustivel) {

        Vertice verticePartida = grafo.encontrarVerticeMaisProximo(partidaCoords);
        Vertice verticeDestino = grafo.encontrarVerticeMaisProximo(destinoCoords);

        if (verticePartida == null || verticeDestino == null) {
            System.err.println("Não foi possível encontrar vértices próximos à partida ou destino.");
            return new ArrayList<>(); 
        }

        List<OpcaoRecomendada> recomendacoes = new ArrayList<>();

        for (Posto posto : postos) {

            double custoIda = dijkstraExecutor.calcularMenorCusto(grafo, verticePartida, posto, veiculo, precoMedioCombustivel);
            double custoVolta = dijkstraExecutor.calcularMenorCusto(grafo, posto, verticeDestino, veiculo, precoMedioCombustivel);

            if (custoIda == Double.POSITIVE_INFINITY || custoVolta == Double.POSITIVE_INFINITY) {
                continue;
            }

            double custoTrajeto = custoIda + custoVolta;

            double custoAbastecimento = litrosParaAbastecer * posto.getPrecoGasolina();

            double custoTotal = custoTrajeto + custoAbastecimento;

            OpcaoRecomendada opcao = new OpcaoRecomendada(posto, custoTotal, custoTrajeto, custoAbastecimento);
            recomendacoes.add(opcao);
        }

        recomendacoes.sort(Comparator.comparing(OpcaoRecomendada::getCustoTotal));
        return recomendacoes;
    }
}