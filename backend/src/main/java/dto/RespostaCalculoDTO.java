package dto;

import model.Localizacao;
import model.OpcaoRecomendada;

import java.util.List;

/**
 * Encapsula a resposta completa da API de /calculo-rota.
 */
public class RespostaCalculoDTO {
    private final Localizacao partida;
    private final Localizacao destino;
    private final List<OpcaoRecomendada> recomendacoes;
    
    public RespostaCalculoDTO(Localizacao partida, Localizacao destino, List<OpcaoRecomendada> recomendacoes) {
        this.partida = partida;
        this.destino = destino;
        this.recomendacoes = recomendacoes;
    }

    public Localizacao getPartida() {
        return partida;
    }

    public Localizacao getDestino() {
        return destino;
    }

    public List<OpcaoRecomendada> getRecomendacoes() {
        return recomendacoes;
    }
}