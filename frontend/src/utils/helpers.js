// Funções utilitárias para a aplicação Posto Finder

/**
 * Formatar valor monetário para exibição
 * @param {number} value - Valor numérico
 * @returns {string} - Valor formatado em reais
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Calcular economia entre dois preços
 * @param {number} precoMenor - Preço menor
 * @param {number} precoMaior - Preço maior
 * @param {number} quantidade - Quantidade de combustível
 * @returns {number} - Economia em reais
 */
export const calcularEconomia = (precoMenor, precoMaior, quantidade) => {
  return (precoMaior - precoMenor) * quantidade;
};

/**
 * Calcular consumo de combustível para uma distância
 * @param {number} distancia - Distância em km
 * @param {number} consumo - Consumo em km/litro
 * @returns {number} - Litros necessários
 */
export const calcularCombustivelNecessario = (distancia, consumo) => {
  return distancia / consumo;
};

/**
 * Calcular custo do combustível para uma distância
 * @param {number} distancia - Distância em km
 * @param {number} consumo - Consumo em km/litro
 * @param {number} precoCombustivel - Preço por litro
 * @returns {number} - Custo total em reais
 */
export const calcularCustoCombustivel = (distancia, consumo, precoCombustivel) => {
  const litrosNecessarios = calcularCombustivelNecessario(distancia, consumo);
  return litrosNecessarios * precoCombustivel;
};

/**
 * Validar se um endereço tem formato básico válido
 * @param {string} endereco - Endereço a ser validado
 * @returns {boolean} - True se válido
 */
export const validarEndereco = (endereco) => {
  if (!endereco || endereco.trim().length < 5) {
    return false;
  }
  
  // Verificar se contém pelo menos uma letra e um número
  const temLetra = /[a-zA-ZÀ-ÿ]/.test(endereco);
  const temNumero = /\d/.test(endereco);
  
  return temLetra && (temNumero || endereco.includes(','));
};

/**
 * Calcular tempo estimado de percurso baseado na distância
 * @param {number} distancia - Distância em km
 * @param {number} velocidadeMedia - Velocidade média em km/h (padrão: 30 km/h urbano)
 * @returns {number} - Tempo em minutos
 */
export const calcularTempoPercurso = (distancia, velocidadeMedia = 30) => {
  return Math.round((distancia / velocidadeMedia) * 60);
};

/**
 * Gerar cor baseada no índice (para diferenciação visual)
 * @param {number} index - Índice do item
 * @returns {string} - Classe CSS de cor
 */
export const getCorPorIndice = (index) => {
  const cores = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-orange-100 text-orange-800',
    'bg-pink-100 text-pink-800'
  ];
  
  return cores[index % cores.length];
};

/**
 * Debounce para otimizar chamadas de API
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @returns {Function} - Função com debounce aplicado
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Verificar se o navegador suporta geolocalização
 * @returns {boolean} - True se suporta
 */
export const suportaGeolocalizacao = () => {
  return 'geolocation' in navigator;
};

/**
 * Obter localização atual do usuário
 * @returns {Promise} - Promise com coordenadas ou erro
 */
export const obterLocalizacaoAtual = () => {
  return new Promise((resolve, reject) => {
    if (!suportaGeolocalizacao()) {
      reject(new Error('Geolocalização não suportada'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      }
    );
  });
};

