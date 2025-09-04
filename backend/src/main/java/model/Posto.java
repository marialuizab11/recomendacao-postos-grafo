package model;

/**
 * Representa um posto de gasolina (um vertice) e armazena suas informações.
 */
public class Posto extends Vertice {
    private double precoGasolina;
    private String endereco;
    
    public Posto(String id, String nome, double precoGasolina, Localizacao localizacao, String endereco){
        super(id, nome, localizacao);
        this.endereco = endereco;
        this.precoGasolina = precoGasolina;
    }
    
    public double getPrecoGasolina(){
        return precoGasolina;
    }
    
    public String getEndereco() {
        return endereco;
    }
}