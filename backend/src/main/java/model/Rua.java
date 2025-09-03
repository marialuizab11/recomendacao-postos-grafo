package model;

/**
 * Representa uma aresta no grafo, conectando dois vertices.
 */
public class Rua {
    private Localizavel pontoA;
    private Localizavel pontoB;
    private double distanciaKm;
    private String nomeRua;
    
    public Rua(Localizavel pontoA, Localizavel pontoB, double distanciaKm, String nomeRua){
        this.pontoA = pontoA;
        this.pontoB = pontoB;
        this.distanciaKm = distanciaKm;
        this.nomeRua = nomeRua;
    }
    
    public Localizavel getPontoA() {
        return pontoA;
    }

    public Localizavel getPontoB() {
        return pontoB;
    }

    //Dado um ponto da rua, retorna o ponto que está na outra extremidade.
    public Localizavel getVizinho(Localizavel pontoAtual) {
        if (pontoAtual.equals(pontoA)) {
            return pontoB;
        } else if (pontoAtual.equals(pontoB)) {
            return pontoA;
        }
        return null; // Ou lançar uma exceção se o ponto não pertencer à rua
    }

    public double getDistanciaKm() {
        return distanciaKm;
    }

    public String getNomeRua() {
        return nomeRua;
    }
}