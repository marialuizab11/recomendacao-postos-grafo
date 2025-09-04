package model;

import java.util.Objects;
/**
 * Classe abstrata que serve como base para todos os tipos de ponto no grafo.
 */
public abstract class Vertice implements Localizavel {
    private String id;
    private String nome;
    private Localizacao localizacao;
    
    public Vertice(String id, String nome, Localizacao localizacao){
        this.id = id;
        this.nome = nome;
        this.localizacao = localizacao;
    }
    
    public Localizacao getLocalizacao() {
        return localizacao;
    }
    
    @Override
    public String getId(){
        return id;
    }
    
    @Override
    public String getNome(){
        return nome;
    }
    
    /* Compara este Vértice com outro objeto para determinar se são funcionalmente iguais, baseando-se no ID. */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vertice vertice = (Vertice) o;
        return Objects.equals(id, vertice.id);
    }

    /* Gera um código numérico (hash) para o objeto. */
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return this.nome; // Ou getNome(), o resultado é o mesmo.
    }
}