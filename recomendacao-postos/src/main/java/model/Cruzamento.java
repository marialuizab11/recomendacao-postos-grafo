package model;

/**
 * Herda de vértice, representa um cruzamento no mapa (um ponto)
 */
public class Cruzamento extends Vertice{

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getNome() {
        return nome;
    }

}