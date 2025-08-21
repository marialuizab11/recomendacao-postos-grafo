package model;

/**
 * Herda de vertice, representa um posto de gasolina (um ponto no mapa)
 */
public class Posto extends Vertice {
    int id;
    String nome;
    double precoGasolina;
    
    @Override
    public int getId() {
        return this.id;
    }

    @Override
    public String getNome() {
        return this.nome;
    }
    
}