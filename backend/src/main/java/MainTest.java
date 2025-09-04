import model.Cruzamento;
import model.Grafo;
import model.Posto;
import model.Veiculo;
import model.Vertice;
import model.DijkstraExecutor;

public class MainTest {

    public static void main(String[] args) {
        /*
        Grafo mapa = new Grafo();
        Posto postoA = new Posto("pA", "Posto A (Origem)", 5.50, null);
        Posto postoB = new Posto("pB", "Posto B (Destino)", 5.40, null);;
        mapa.adicionarRua(postoA, new Cruzamento("c1", "Cruzamento 1"), 2.0, "Rua Alfa");
        mapa.adicionarRua(new Cruzamento("c1", "Cruzamento 1"), postoB, 3.0, "Rua Beta");
        mapa.adicionarRua(postoA, postoB, 8.0, "Avenida Principal");

        DijkstraExecutor executor = new DijkstraExecutor();
        Vertice origem = postoA;
        Vertice destino = postoB;

        Veiculo meuCarro = new Veiculo(10.0);
        double precoCombustivelNoTanque = 5.00;

        System.out.println("Calculando o custo do trajeto mais curto de: " + origem.getNome() + " para " + destino.getNome());
        System.out.println("-------------------------------------------------");

        double custo = executor.calcularMenorCusto(mapa, origem, destino, meuCarro, precoCombustivelNoTanque);

        if (custo != Double.POSITIVE_INFINITY) {
            System.out.println("O custo do trajeto é: R$ " + String.format("%.2f", custo));

            DijkstraExecutor.ResultadoDijkstra resultadoCaminho = executor.executar(mapa, origem, destino);
            System.out.println(resultadoCaminho);

        } else {
            System.out.println("Não foi encontrado um caminho entre a origem e o destino.");
        }
*/
    }
}