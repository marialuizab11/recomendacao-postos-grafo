package model;

/**
 * Representa um posto de gasolina (um vertice) e armazena suas informações.
 */
public class Posto extends Vertice {
    private double precoGasolina;
    private Localizacao localizacao;
    
    public Posto(String id, String nome, double precoGasolina, Localizacao localizacao){
        super(id, nome);
        this.precoGasolina = precoGasolina;
        this.localizacao = localizacao;
    }
    
    public double getPrecoGasolina(){
        return precoGasolina;
    }
    
    public Localizacao getLocalizacao(){
        return localizacao;
    }
    
}