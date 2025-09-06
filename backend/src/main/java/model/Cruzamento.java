package model;

/**
 * Representa um cruzamento no mapa (um vertice), é usado como um ponto de
 * conexão entre ruas.
 */
public class Cruzamento extends Vertice {

    public Cruzamento(String id, String nome, Localizacao localizacao) {
        super(id, nome, localizacao);
    }
}