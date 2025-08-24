package model;

/**
 * Classe para encapsular o resultado de uma análise de custo-benefício para um determinado posto.
 */
public class OpcaoRecomendada {
    private Posto posto;
    private double custoTotal;
    private double custoTrajeto;
    private double custoAbastecimento;
    
     public OpcaoRecomendada(Posto posto, double custoTotal, double custoTrajeto, double custoAbastecimento) {
        this.posto = posto;
        this.custoTotal = custoTotal;
        this.custoTrajeto = custoTrajeto;
        this.custoAbastecimento = custoAbastecimento;
    }

    public Posto getPosto() {
        return posto;
    }

    public double getCustoTotal() {
        return custoTotal;
    }

    public double getCustoTrajeto() {
        return custoTrajeto;
    }

    public double getCustoAbastecimento() {
        return custoAbastecimento;
    }
}