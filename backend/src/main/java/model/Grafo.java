package model;

import app.ApiServer;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

/**
 * Representa um grafo utilizando uma lista de adjacências.
 * Armazena Vértices e as Ruas que os conectam.
 */
public class Grafo {

    // Mapeia cada Vértice a uma lista de Ruas conectadas a ele.
    private final Map<Vertice, List<Rua>> adjacencias = new HashMap<>();

    public void adicionarVertice(Vertice vertice) {
        adjacencias.putIfAbsent(vertice, new ArrayList<>());
    }

    public void adicionarRua(Vertice pontoA, Vertice pontoB, double distanciaKm, String nomeRua) {
        this.adicionarVertice(pontoA);
        this.adicionarVertice(pontoB);

        Rua novaRua = new Rua(pontoA, pontoB, distanciaKm, nomeRua);

        adjacencias.get(pontoA).add(novaRua);
        adjacencias.get(pontoB).add(novaRua);
    }

    public List<Rua> getRuasVizinhas(Vertice vertice) {
        return adjacencias.getOrDefault(vertice, Collections.emptyList());
    }

    //Retorna todos os vértices presentes no grafo.
    public Set<Vertice> getVertices() {
        return adjacencias.keySet();
    }
    
    /*Encontra o vértice no grafo que está geograficamente mais próximo das coordenadas fornecidas.*/
    public Vertice encontrarVerticeMaisProximo(Localizacao coordenadas) {
        if (adjacencias.isEmpty()) {
            return null;
        }

        Vertice verticeMaisProximo = null;
        double menorDistancia = Double.POSITIVE_INFINITY;

        // Itera por todos os vértices do grafo
        for (Localizavel local : adjacencias.keySet()) {
            if (local instanceof Vertice) {
                Vertice verticeAtual = (Vertice) local;
                // Calcula a distância em linha reta entre as coordenadas do usuário e o vértice atual
                double distancia = ApiServer.calcularDistanciaHaversine(
                        coordenadas.getLatitude(), coordenadas.getLongitude(),
                        verticeAtual.getLocalizacao().getLatitude(), verticeAtual.getLocalizacao().getLongitude()
                );

                // Se encontrarmos uma distância menor, atualizamos nosso candidato a "mais próximo"
                if (distancia < menorDistancia) {
                    menorDistancia = distancia;
                    verticeMaisProximo = verticeAtual;
                }
            }
        }
    return verticeMaisProximo;
}
}