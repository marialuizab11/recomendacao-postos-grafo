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
    //private final DijstraExecutador dijstraExecutador;
    
    public CalculadoraCustoBeneficioService(Grafo grafo){
        //this.dijkstraExecutador = new DijkstraExecutador();
        this.postos = carregarPostosJson();
    }
    
    /* Calcula e ordena as melhores opções de abastecimento */
/*
    public List<OpcaoRecomendada> calcularMelhoresOpcoes(Localizavel localizavel){
        List<OpcaoRecomendada> recomendacoes = new ArrayList<>();
        
        for (Posto posto : postos){
            double custoIda = dijkstraExecutador.calcularMenorCusto(partida, posto, veiculo, precoMedioCombustivel);
            double custoVolta = dijkstraExecutador.calcularMenorCusto(posto, destino, veiculo, precoMedioCombustivel);
        
            Se o posto é inalcançável a partir da partida ou não leva ao destino, pula para o próximo
            if (custoIda == Double.POSITIVE_INFINITY || custoVolta == Double.POSITIVE_INFINITY) {
                continue;
            }
            
            double custoTrajeto = custoIda + custoVolta;;;
            
            double custoAbastecimento = listroParaAbastecer * posto.getPrecoGasolina();
            
            double custoTotal = custoTrajeto + custoAbastecimento;
            
            OpcaoRecomendada opcao = new OpcaoRecomendada(posto, custoTotal, custoTrajeto, custoAbastecimento);
            recomendacoes.add(opcao);
        }
        recomendacoes.sort(Comparator.comparing(OpcaoRecomendada::getCustoTotal));
        return recomendacoes;        
    }
*/
    
    /* Carrega a lista de postos do arquivo Json */
    private List<Posto> carregarPostosJson(){
        try(Reader reader = new FileReader("postos-gasolina.json")){
            Type listType = new TypeToken<ArrayList<Posto>>(){}.getType();
            return new Gson().fromJson(reader, listType);
        } catch (Exception e){
            System.out.println("Erro ao ler arquivo");;
            return new ArrayList<>();
        }
    }
}