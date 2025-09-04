package model;

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
}