package service;

import model.Grafo;
import model.Rua;
import model.Veiculo;
import model.Vertice;

import java.util.*;

public class DijkstraExecutor {

    // Executa o algoritmo de Dijkstra para encontrar o menor caminho de uma origem a um destino.
    public ResultadoDijkstra executar(Grafo grafo, Vertice origem, Vertice destino) {

        // 1. Ferramentas do Algoritmo
        Map<Vertice, Double> distancias = new HashMap<>();
        PriorityQueue<Vertice> fila = new PriorityQueue<>(Comparator.comparing(distancias::get));
        Map<Vertice, Vertice> predecessores = new HashMap<>();

        // 2. Inicialização
        for (Vertice v : grafo.getVertices()) {
            distancias.put(v, Double.POSITIVE_INFINITY);
            predecessores.put(v, null);
        }
        distancias.put(origem, 0.0);
        fila.add(origem);

        // 3. Loop Principal do Algoritmo
        while (!fila.isEmpty()) {
            // Pega o vértice da fila que tem a menor distância conhecida.
            Vertice verticeAtual = fila.poll();

            // Se chegamos ao destino, podemos parar antes. (Opcional, mas otimiza)
            if (verticeAtual.equals(destino)) {
                break;
            }

            // Para cada rua/vizinho do vértice atual...
            for (Rua rua : grafo.getRuasVizinhas(verticeAtual)) {
                Vertice vizinho = (Vertice) rua.getVizinho(verticeAtual);

                // Calcula a nova distância potencial passando pelo vértice atual.
                double novaDistancia = distancias.get(verticeAtual) + rua.getDistanciaKm();

                // A "pergunta" de Dijkstra: encontramos um caminho melhor para o vizinho?
                if (novaDistancia < distancias.get(vizinho)) {
                    // Sim, encontramos! Atualiza as informações.
                    distancias.put(vizinho, novaDistancia);
                    predecessores.put(vizinho, verticeAtual);

                    // Re-adiciona o vizinho na fila para que sua nova prioridade (distância menor)
                    // seja considerada.
                    // A PriorityQueue lida com elementos duplicados, mantendo a ordem correta.
                    fila.add(vizinho);
                }
            }
        }

        // 4. Reconstrução do Caminho
        // Se a distância até o destino ainda é infinita, significa que ele é inalcançável.
        if (distancias.get(destino) == Double.POSITIVE_INFINITY) {
            return null; // Não há caminho
        }

        // Monta a lista do caminho, começando do destino e voltando para a origem usando os predecessores.
        LinkedList<Vertice> caminho = new LinkedList<>();
        Vertice passo = destino;
        while (passo != null) {
            caminho.addFirst(passo); // Adiciona no início da lista para manter a ordem correta
            passo = predecessores.get(passo);
        }

        return new ResultadoDijkstra(caminho, distancias.get(destino));
    }

    // Classe auxiliar para encapsular o resultado
    public static class ResultadoDijkstra {
        public final List<Vertice> caminho;
        public final double distanciaTotal;

        public ResultadoDijkstra(List<Vertice> caminho, double distanciaTotal) {
            this.caminho = caminho;
            this.distanciaTotal = distanciaTotal;
        }

        @Override
        public String toString() {
            return "Caminho: " + caminho + "\nDistância Total: " + String.format("%.2f", distanciaTotal) + " km";
        }
    }

    /* 
     * Calcula o custo em Reais do trajeto mais curto entre dois vértices.
    */
    public double calcularMenorCusto(Grafo grafo, Vertice origem, Vertice destino, Veiculo veiculo,
            double precoCombustivelAtual) {
        // 1. Primeiro, usamos o método principal para encontrar o caminho e a distância.
        ResultadoDijkstra resultado = executar(grafo, origem, destino);

        // 2. Verificamos se um caminho foi encontrado.
        if (resultado == null) {
            return Double.POSITIVE_INFINITY; // Indica que o destino é inalcançável.
        }

        // 3. Se existe um caminho, calculamos o custo.
        double distanciaKm = resultado.distanciaTotal;
        double autonomiaKmL = veiculo.getAutonomiaKmL();

        if (autonomiaKmL <= 0) {
            return Double.POSITIVE_INFINITY; // Evita divisão por zero.
        }

        double litrosConsumidos = distanciaKm / autonomiaKmL;
        double custoTotal = litrosConsumidos * precoCombustivelAtual;

        return custoTotal;
    }
}