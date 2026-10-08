/* ==========================================================================
   CONECTA AGRO — LÓGICA DA APLICAÇÃO (script.js)
   Tudo em português, comentado para iniciantes.
   Dados salvos no localStorage do navegador.
   ========================================================================== */

// ============================================================================
// 1. DADOS DE DEMONSTRAÇÃO
//    Carregados automaticamente quando o localStorage está vazio.
// ============================================================================
const DADOS_DEMO = [
  {
    id: 1,
    data: '2026-10-01',
    responsavel: 'João da Silva',
    area: 'Talhão 1 - Várzea',
    cultura: 'Milho',
    atividade: 'Plantio',
    condicao: 'boa',
    obs: 'Solo bem preparado após a chuva de ontem. Plantio seguiu o espaçamento recomendado de 80cm.'
  },
  {
    id: 2,
    data: '2026-10-02',
    responsavel: 'Maria Aparecida',
    area: 'Talhão 3 - Horta',
    cultura: 'Tomate',
    atividade: 'Irrigação',
    condicao: 'boa',
    obs: 'Irrigação por gotejamento funcionando normalmente. Plantas com bom desenvolvimento.'
  },
  {
    id: 3,
    data: '2026-10-03',
    responsavel: 'Carlos Eduardo',
    area: 'Talhão 2 - Encosta',
    cultura: 'Feijão',
    atividade: 'Adubação',
    condicao: 'atenção',
    obs: 'Algumas folhas amarelando. Aplicada adubação com NPK 04-14-08 conforme recomendação.'
  },
  {
    id: 4,
    data: '2026-10-04',
    responsavel: 'Ana Paula Santos',
    area: 'Pasto Norte',
    cultura: 'Capim',
    atividade: 'Inspeção',
    condicao: 'boa',
    obs: 'Capim braquiária em boa altura para pastejo. Cerca do perímetro em bom estado.'
  },
  {
    id: 5,
    data: '2026-10-05',
    responsavel: 'José Roberto',
    area: 'Talhão 5 - Baixada',
    cultura: 'Mandioca',
    atividade: 'Controle de pragas',
    condicao: 'crítica',
    obs: 'Infestação severa de mandarová. Aplicado inseticida biológico (Bt). Necessário reavaliação em 5 dias.'
  },
  {
    id: 6,
    data: '2026-10-06',
    responsavel: 'Dona Lúcia',
    area: 'Talhão 3 - Horta',
    cultura: 'Tomate',
    atividade: 'Colheita',
    condicao: 'boa',
    obs: 'Colhidos aproximadamente 80kg de tomate cereja. Frutos em ótimo estado para comercialização na feira.'
  },
  {
    id: 7,
    data: '2026-10-07',
    responsavel: 'Pedro Henrique',
    area: 'Barracão de Máquinas',
    cultura: 'Outra',
    atividade: 'Manutenção',
    condicao: 'atenção',
    obs: 'Trator com vazamento de óleo no sistema hidráulico. Peça encomendada, previsão de 3 dias para conserto.'
  },
  {
    id: 8,
    data: '2026-10-08',
    responsavel: 'Maria Aparecida',
    area: 'Talhão 4 - Pivô Central',
    cultura: 'Milho',
    atividade: 'Inspeção',
    condicao: 'boa',
    obs: 'Milho no estágio V6, desenvolvimento uniforme. Pivô central operando sem problemas.'
  }
];

// ============================================================================
// 2. CHAVE DO LOCALSTORAGE
// ============================================================================
const CHAVE_STORAGE = 'conecta_agro_registros_v2';

// ============================================================================
// 3. FUNÇÕES DE DADOS (LocalStorage)
// ============================================================================

/**
 * Carrega todos os registros do localStorage.
 * Se não existir nenhum dado, carrega os dados de demonstração.
 */
function carregarRegistros() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  if (dados) {
    return JSON.parse(dados);
  }
  // Primeira vez: carregar dados de demonstração
  salvarRegistros(DADOS_DEMO);
  return DADOS_DEMO;
}

/**
 * Salva a lista de registros no localStorage.
 */
function salvarRegistros(registros) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(registros));
}

/**
 * Gera um novo ID único baseado no timestamp.
 */
function gerarId() {
  return Date.now();
}

// ============================================================================
// 4. NAVEGAÇÃO ENTRE TELAS
// ============================================================================

/**
 * Exibe apenas a tela com o ID informado e esconde as demais.
 */
function mostrarTela(idTela) {
  // Esconder todas as telas
  document.querySelectorAll('.tela').forEach(tela => {
    tela.classList.remove('ativa');
  });
  // Mostrar a tela desejada
  const telaAlvo = document.getElementById(idTela);
  if (telaAlvo) {
    telaAlvo.classList.add('ativa');
  }
  // Voltar ao topo
  window.scrollTo(0, 0);
}

// ============================================================================
// 5. FORMATAÇÃO DE DATAS
// ============================================================================

/**
 * Converte data no formato 'aaaa-mm-dd' para 'dd/mm/aaaa'.
 */
function formatarData(dataISO) {
  if (!dataISO) return '--';
  const partes = dataISO.split('-');
  if (partes.length !== 3) return dataISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/**
 * Retorna a data de hoje no formato 'aaaa-mm-dd' (para o input date).
 */
function dataHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// ============================================================================
// 6. TOAST (Notificação visual temporária)
// ============================================================================

/**
 * Mostra um toast na tela por 3 segundos.
 * tipo: 'sucesso', 'erro' ou 'info'
 */
function mostrarToast(mensagem, tipo = 'sucesso') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.textContent = mensagem;
  container.appendChild(toast);

  // Remover após a animação (3 segundos)
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

// ============================================================================
// 7. RENDERIZAR LISTA DE REGISTROS
// ============================================================================

/**
 * Renderiza os cards de registros na tela de lista,
 * aplicando os filtros ativos.
 */
function renderizarRegistros() {
  const registros = carregarRegistros();
  const container = document.getElementById('lista-registros');
  const estadoVazio = document.getElementById('estado-vazio');
  const contador = document.getElementById('contador-registros');

  // Ler filtros
  const busca = document.getElementById('filtro-busca').value.toLowerCase().trim();
  const filtroAtividade = document.getElementById('filtro-atividade').value;
  const filtroCondicao = document.getElementById('filtro-condicao').value;

  // Filtrar
  let filtrados = registros.filter(r => {
    // Filtro de busca por texto
    if (busca) {
      const textoCompleto = `${r.responsavel} ${r.area} ${r.cultura}`.toLowerCase();
      if (!textoCompleto.includes(busca)) return false;
    }
    // Filtro por tipo de atividade
    if (filtroAtividade && r.atividade !== filtroAtividade) return false;
    // Filtro por condição
    if (filtroCondicao && r.condicao !== filtroCondicao) return false;
    return true;
  });

  // Ordenar do mais recente para o mais antigo
  filtrados.sort((a, b) => {
    if (a.data > b.data) return -1;
    if (a.data < b.data) return 1;
    return b.id - a.id;
  });

  // Limpar container
  container.innerHTML = '';

  // Atualizar contador
  contador.textContent = `${filtrados.length} de ${registros.length} registros`;

  // Estado vazio
  if (filtrados.length === 0) {
    estadoVazio.style.display = 'block';
    return;
  }
  estadoVazio.style.display = 'none';

  // Criar cards
  filtrados.forEach(reg => {
    const card = criarCardRegistro(reg);
    container.appendChild(card);
  });
}

/**
 * Cria o elemento HTML de um card de registro.
 */
function criarCardRegistro(reg) {
  const card = document.createElement('div');
  card.className = 'registro-card';
  card.dataset.id = reg.id;

  // Determinar classe do badge
  let badgeClasse = 'badge-boa';
  let badgeTexto = 'Boa';
  if (reg.condicao === 'atenção') {
    badgeClasse = 'badge-atencao';
    badgeTexto = 'Atenção';
  } else if (reg.condicao === 'crítica') {
    badgeClasse = 'badge-critica';
    badgeTexto = 'Crítica';
  }

  // Montar HTML do card
  let obsHtml = '';
  if (reg.obs && reg.obs.trim()) {
    obsHtml = `<p class="card-obs">${reg.obs}</p>`;
  }

  card.innerHTML = `
    <div class="card-topo">
      <div>
        <div class="card-area">${reg.area}</div>
        <div class="card-cultura">${reg.cultura}</div>
      </div>
      <span class="badge-condicao ${badgeClasse}">${badgeTexto}</span>
    </div>
    <div class="card-detalhes">
      <span class="detalhe-chip">📅 ${formatarData(reg.data)}</span>
      <span class="detalhe-chip">👤 ${reg.responsavel}</span>
      <span class="detalhe-chip">🔧 ${reg.atividade}</span>
    </div>
    ${obsHtml}
    <div class="card-rodape">
      <span>Registrado em ${formatarData(reg.data)}</span>
      <button class="btn-excluir" data-id="${reg.id}">Excluir</button>
    </div>
  `;

  return card;
}

// ============================================================================
// 8. ATUALIZAR CONTADOR NA TELA INÍCIO
// ============================================================================

function atualizarContadorInicio() {
  const registros = carregarRegistros();
  const el = document.getElementById('inicio-total');
  const total = registros.length;
  el.textContent = total === 1 ? '1 registro salvo' : `${total} registros salvos`;
}

// ============================================================================
// 9. VALIDAÇÃO DO FORMULÁRIO
// ============================================================================

/**
 * Valida o formulário e retorna os dados se estiver válido,
 * ou null se houver erros.
 */
function validarFormulario() {
  const msgErro = document.getElementById('msg-erro-form');
  const erros = [];

  // Limpar erros visuais anteriores
  document.querySelectorAll('.campo-invalido').forEach(el => {
    el.classList.remove('campo-invalido');
  });
  msgErro.style.display = 'none';

  // Coletar valores
  const data = document.getElementById('campo-data').value;
  const responsavel = document.getElementById('campo-responsavel').value.trim();
  const area = document.getElementById('campo-area').value.trim();
  const cultura = document.getElementById('campo-cultura').value;
  const atividade = document.getElementById('campo-atividade').value;
  const condicaoEl = document.querySelector('input[name="condicao"]:checked');
  const obs = document.getElementById('campo-obs').value.trim();

  // Validar cada campo
  if (!data) {
    erros.push('Informe a data da atividade.');
    marcarErro('campo-data');
  }
  if (!responsavel) {
    erros.push('Informe o nome do responsável.');
    marcarErro('campo-responsavel');
  }
  if (!area) {
    erros.push('Informe a área ou talhão.');
    marcarErro('campo-area');
  }
  if (!cultura) {
    erros.push('Selecione a cultura.');
    marcarErro('campo-cultura');
  }
  if (!atividade) {
    erros.push('Selecione o tipo de atividade.');
    marcarErro('campo-atividade');
  }
  if (!condicaoEl) {
    erros.push('Selecione a condição da área.');
  }

  if (erros.length > 0) {
    msgErro.innerHTML = erros.join('<br>');
    msgErro.style.display = 'block';
    return null;
  }

  return {
    id: gerarId(),
    data,
    responsavel,
    area,
    cultura,
    atividade,
    condicao: condicaoEl.value,
    obs
  };
}

/**
 * Marca visualmente um campo como inválido.
 */
function marcarErro(idCampo) {
  const campo = document.getElementById(idCampo);
  if (campo) {
    campo.closest('.campo').classList.add('campo-invalido');
  }
}

// ============================================================================
// 10. EXCLUSÃO DE REGISTROS
// ============================================================================

let idParaExcluir = null;

/**
 * Abre o diálogo de confirmação de exclusão.
 */
function abrirDialogoExcluir(id) {
  idParaExcluir = id;
  document.getElementById('dialogo-excluir').style.display = 'flex';
}

/**
 * Fecha o diálogo sem excluir.
 */
function fecharDialogo() {
  idParaExcluir = null;
  document.getElementById('dialogo-excluir').style.display = 'none';
}

/**
 * Confirma a exclusão do registro.
 */
function confirmarExclusao() {
  if (idParaExcluir === null) return;

  let registros = carregarRegistros();
  registros = registros.filter(r => r.id !== idParaExcluir);
  salvarRegistros(registros);

  fecharDialogo();
  renderizarRegistros();
  atualizarContadorInicio();
  mostrarToast('Registro excluído com sucesso.', 'info');
}

// ============================================================================
// 11. RESTAURAR DADOS DE DEMONSTRAÇÃO
// ============================================================================

function restaurarDemo() {
  salvarRegistros(DADOS_DEMO);
  renderizarRegistros();
  atualizarContadorInicio();
  mostrarToast('Dados de demonstração restaurados!', 'sucesso');
}

// ============================================================================
// 12. INICIALIZAÇÃO E EVENTOS
//     Tudo começa aqui quando a página carrega.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Carregar dados iniciais ----
  carregarRegistros(); // Garante que os dados demo existam
  atualizarContadorInicio();

  // Definir data de hoje como padrão no campo de data
  document.getElementById('campo-data').value = dataHoje();

  // ---- NAVEGAÇÃO ----

  // Botão "Novo Registro" (tela início)
  document.getElementById('btn-ir-novo-registro').addEventListener('click', function () {
    mostrarTela('tela-novo-registro');
  });

  // Botão "Ver Registros" (tela início)
  document.getElementById('btn-ir-ver-registros').addEventListener('click', function () {
    renderizarRegistros();
    mostrarTela('tela-registros');
  });

  // Botão "Voltar" do formulário
  document.getElementById('btn-voltar-form').addEventListener('click', function () {
    mostrarTela('tela-inicio');
  });

  // Botão "Voltar" da lista
  document.getElementById('btn-voltar-lista').addEventListener('click', function () {
    atualizarContadorInicio();
    mostrarTela('tela-inicio');
  });

  // ---- FORMULÁRIO ----

  // Enviar formulário
  document.getElementById('formulario-registro').addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = validarFormulario();
    if (!dados) return; // Há erros

    // Salvar no localStorage
    const registros = carregarRegistros();
    registros.push(dados);
    salvarRegistros(registros);

    // Feedback visual
    mostrarToast('✅ Registro salvo com sucesso!', 'sucesso');

    // Limpar formulário
    this.reset();
    document.getElementById('campo-data').value = dataHoje();
    document.getElementById('msg-erro-form').style.display = 'none';
    document.querySelectorAll('.campo-invalido').forEach(el => el.classList.remove('campo-invalido'));

    // Atualizar contador
    atualizarContadorInicio();
  });

  // Botão "Limpar" do formulário
  document.getElementById('btn-limpar-form').addEventListener('click', function () {
    // O reset já é feito pelo type="reset", mas limpamos os erros
    setTimeout(function () {
      document.getElementById('campo-data').value = dataHoje();
      document.getElementById('msg-erro-form').style.display = 'none';
      document.querySelectorAll('.campo-invalido').forEach(el => el.classList.remove('campo-invalido'));
    }, 10);
  });

  // ---- FILTROS ----

  // Busca por texto
  document.getElementById('filtro-busca').addEventListener('input', renderizarRegistros);

  // Filtro por atividade
  document.getElementById('filtro-atividade').addEventListener('change', renderizarRegistros);

  // Filtro por condição
  document.getElementById('filtro-condicao').addEventListener('change', renderizarRegistros);

  // ---- EXCLUSÃO ----

  // Delegar clique nos botões de excluir dentro dos cards
  document.getElementById('lista-registros').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-excluir')) {
      const id = Number(e.target.dataset.id);
      abrirDialogoExcluir(id);
    }
  });

  // Confirmar exclusão
  document.getElementById('btn-confirmar-excluir').addEventListener('click', confirmarExclusao);

  // Cancelar exclusão
  document.getElementById('btn-cancelar-excluir').addEventListener('click', fecharDialogo);

  // ---- RESTAURAR DEMO ----
  document.getElementById('btn-restaurar-demo').addEventListener('click', restaurarDemo);

});
