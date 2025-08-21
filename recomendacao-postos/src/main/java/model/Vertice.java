package model;

import java.util.Objects;
/**
 * Base para todos os pontos (vértice) do mapa
 */
public abstract class Vertice implements Localizavel {
    String id;
    String nome;
    
    public Vertice(String id, String nome){
        this.id = id;
        this.nome = nome;
    }
    
    @Override
    public String getId(){
        return id;
    }
    
    @Override
    public String getNome(){
        return nome;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vertice vertice = (Vertice) o;
        return Objects.equals(id, vertice.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}