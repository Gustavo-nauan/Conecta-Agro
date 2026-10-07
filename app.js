/**
 * ============================================================================
 * CONECTA AGRO — MOTOR LÓGICO DA APLICAÇÃO (app.js)
 * Gerenciamento de Estado, LocalStorage, Validação Agronômica e Renderização
 * ============================================================================
 */

(function () {
  'use strict';

  // Chave canônica para persistência local
  const STORAGE_KEY = 'conecta_agro_records_v1';

  // ==========================================================================
  // 1. DADOS DE DEMONSTRAÇÃO (SEED DATA INICIAL)
  // ==========================================================================
  const DEFAULT_SEED_RECORDS = [
    {
      id: 'ca_seed_1',
      dateTime: '2026-10-07T11:30',
      field: 'Talhão 04 - Setor Norte',
      crop: 'Milho Safrinha DKB',
      soilMoisture: 28.0,
      temperature: 31.5,
      pestStatus: 'alert',
      observations: 'Presença inicial de lagarta do cartucho na bordadura leste; monitorar seletivamente para avaliação de pulverização.',
      createdAt: 1728312600000
    },
    {
      id: 'ca_seed_2',
      dateTime: '2026-10-07T09:15',
      field: 'Talhão 01 - Baixada',
      crop: 'Soja Intacta BMX',
      soilMoisture: 42.5,
      temperature: 27.2,
      pestStatus: 'safe',
      observations: 'Boa retenção de umidade no solo após irrigação noturna. Folhagem vigorosa sem sinais de pragas.',
      createdAt: 1728304500000
    },
    {
      id: 'ca_seed_3',
      dateTime: '2026-10-06T16:40',
      field: 'Talhão 08 - Colina Sul',
      crop: 'Café Arábica Catuaí',
      soilMoisture: 18.0,
      temperature: 34.0,
      pestStatus: 'danger',
      observations: 'Estresse hídrico severo detectado nas plantas do topo e focos de bicho-mineiro em expansão. Irrigação emergencial requisitada.',
      createdAt: 1728244800000
    },
    {
      id: 'ca_seed_4',
      dateTime: '2026-10-06T10:00',
      field: 'Talhão 03 - Pivô Central',
      crop: 'Feijão Carioca',
      soilMoisture: 36.0,
      temperature: 28.5,
      pestStatus: 'warn',
      observations: 'Pequenos focos isolados de mosca-branca observados na reboleira central. Recomenda-se acompanhamento e defensivo biológico.',
      createdAt: 1728220800000
    }
  ];

  // ==========================================================================
  // 2. ELEMENTOS DO DOM
  // ==========================================================================
  const DOM = {
    form: document.getElementById('form-measurement'),
    inputDateTime: document.getElementById('input-datetime'),
    inputField: document.getElementById('input-field'),
    inputCrop: document.getElementById('input-crop'),
    inputMoisture: document.getElementById('input-moisture'),
    inputTemp: document.getElementById('input-temp'),
    inputObservations: document.getElementById('input-observations'),
    btnResetForm: document.getElementById('btn-reset-form'),

    // KPIs
    kpiTotal: document.getElementById('kpi-total-val'),
    kpiMoisture: document.getElementById('kpi-moisture-val'),
    kpiTemp: document.getElementById('kpi-temp-val'),
    kpiAlerts: document.getElementById('kpi-alerts-val'),

    // Consulta & Filtros
    searchInput: document.getElementById('search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    filterStatusSelect: document.getElementById('filter-status-select'),
    recordsContainer: document.getElementById('records-container'),
    recordsCounterText: document.getElementById('records-counter-text'),
    emptyState: document.getElementById('empty-state'),
    emptyStateMessage: document.getElementById('empty-state-message'),
    btnEmptyReset: document.getElementById('btn-empty-reset'),

    // Ações globais
    btnDemoSeed: document.getElementById('btn-demo-seed'),
    toastContainer: document.getElementById('toast-container')
  };

  // ==========================================================================
  // 3. STORAGE SERVICE (PERSISTÊNCIA LOCAL)
  // ==========================================================================
  const StorageService = {
    getRecords: function () {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          this.saveRecords(DEFAULT_SEED_RECORDS);
          return [...DEFAULT_SEED_RECORDS];
        }
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        console.error('Erro ao ler do LocalStorage:', err);
        return [...DEFAULT_SEED_RECORDS];
      }
    },

    saveRecords: function (records) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      } catch (err) {
        console.error('Erro ao salvar no LocalStorage:', err);
        ToastService.show('Espaço insuficiente no navegador para salvar.', 'error');
      }
    },

    resetSeed: function () {
      this.saveRecords(DEFAULT_SEED_RECORDS);
      return [...DEFAULT_SEED_RECORDS];
    }
  };

  // ==========================================================================
  // 4. TOAST SERVICE (NOTIFICAÇÕES FLUTUANTES)
  // ==========================================================================
  const ToastService = {
    show: function (message, type = 'success') {
      if (!DOM.toastContainer) return;

      const toast = document.createElement('div');
      toast.className = `ca-toast ca-toast--${type}`;
      
      const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
      toast.innerHTML = `
        <span aria-hidden="true">${icon}</span>
        <span>${message}</span>
      `;

      DOM.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  };

  // ==========================================================================
  // 5. ESTADO DA APLICAÇÃO (STATE)
  // ==========================================================================
  let appState = {
    records: [],
    searchTerm: '',
    statusFilter: 'all'
  };

  // ==========================================================================
  // 6. UTILITÁRIOS & FORMATAÇÃO
  // ==========================================================================
  function getLocalDateTimeString() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  function formatDateTimeBR(isoString) {
    if (!isoString) return '--/--/----';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return isoString;
    }
  }

  function getStatusMeta(status) {
    switch (status) {
      case 'danger':
        return { label: 'Crítico', badgeClass: 'ca-badge--danger', itemClass: 'ca-record-item--danger' };
      case 'alert':
        return { label: 'Alerta', badgeClass: 'ca-badge--alert', itemClass: 'ca-record-item--alert' };
      case 'warn':
        return { label: 'Atenção', badgeClass: 'ca-badge--warn', itemClass: 'ca-record-item--warn' };
      case 'safe':
      default:
        return { label: 'Normal', badgeClass: 'ca-badge--safe', itemClass: 'ca-record-item--safe' };
    }
  }

  // ==========================================================================
  // 7. CÁLCULO DE KPIS
  // ==========================================================================
  function updateKPIs() {
    const total = appState.records.length;
    DOM.kpiTotal.textContent = total;

    if (total === 0) {
      DOM.kpiMoisture.textContent = '--%';
      DOM.kpiTemp.textContent = '--°C';
      DOM.kpiAlerts.textContent = '0';
      return;
    }

    const moistureSum = appState.records.reduce((acc, r) => acc + Number(r.soilMoisture || 0), 0);
    const tempSum = appState.records.reduce((acc, r) => acc + Number(r.temperature || 0), 0);
    const alertsCount = appState.records.filter(r => r.pestStatus === 'alert' || r.pestStatus === 'danger').length;

    const avgMoisture = (moistureSum / total).toFixed(1);
    const avgTemp = (tempSum / total).toFixed(1);

    DOM.kpiMoisture.innerHTML = `${avgMoisture}<span style="font-size: 1rem; color: var(--ca-text-muted);">%</span>`;
    DOM.kpiTemp.innerHTML = `${avgTemp}<span style="font-size: 1rem; color: var(--ca-text-muted);">°C</span>`;
    DOM.kpiAlerts.textContent = alertsCount;
  }

  // ==========================================================================
  // 8. RENDERIZAÇÃO DA LISTA DE REGISTROS
  // ==========================================================================
  function renderRecords() {
    const term = appState.searchTerm.toLowerCase().trim();
    const filter = appState.statusFilter;

    // Filtragem combinada
    const filtered = appState.records.filter(record => {
      const matchSearch = !term ||
        (record.field && record.field.toLowerCase().includes(term)) ||
        (record.crop && record.crop.toLowerCase().includes(term)) ||
        (record.observations && record.observations.toLowerCase().includes(term));

      const matchStatus = (filter === 'all') || (record.pestStatus === filter);

      return matchSearch && matchStatus;
    });

    // Atualiza contador
    const total = appState.records.length;
    DOM.recordsCounterText.textContent = `Exibindo ${filtered.length} de ${total} medições cadastradas`;

    // Limpa lista
    DOM.recordsContainer.innerHTML = '';

    if (filtered.length === 0) {
      DOM.emptyState.style.display = 'block';
      if (total === 0) {
        DOM.emptyStateMessage.textContent = 'Nenhuma medição registrada ainda. Preencha o formulário ao lado para começar.';
      } else {
        DOM.emptyStateMessage.textContent = 'Nenhum resultado corresponde à sua busca ou filtro selecionado.';
      }
      return;
    }

    DOM.emptyState.style.display = 'none';

    // Cria os cards dinamicamente
    filtered.forEach(record => {
      const meta = getStatusMeta(record.pestStatus);
      const card = document.createElement('article');
      card.className = `ca-record-item ${meta.itemClass}`;
      card.id = `record-${record.id}`;

      card.innerHTML = `
        <div class="ca-record-item__top">
          <div>
            <h3 class="ca-record-item__field">${escapeHTML(record.field)}</h3>
            <span class="ca-record-item__crop">🌱 ${escapeHTML(record.crop)}</span>
          </div>
          <span class="ca-badge ${meta.badgeClass}">${meta.label}</span>
        </div>

        <div class="ca-record-metrics-row">
          <div class="ca-metric-chip ca-metric-chip--hydro" title="Umidade do Solo">
            <span>💧</span>
            <span>${Number(record.soilMoisture).toFixed(1)}% Solo</span>
          </div>
          <div class="ca-metric-chip ca-metric-chip--temp" title="Temperatura Ambiente">
            <span>🌡️</span>
            <span>${Number(record.temperature).toFixed(1)}°C</span>
          </div>
        </div>

        ${record.observations ? `
          <div class="ca-record-obs-box">
            <strong>Manejo:</strong> ${escapeHTML(record.observations)}
          </div>
        ` : ''}

        <footer class="ca-record-footer">
          <span>📅 Coletado em: ${formatDateTimeBR(record.dateTime)}</span>
          <button 
            type="button" 
            class="ca-btn-delete" 
            data-id="${record.id}"
            title="Excluir medição"
            aria-label="Excluir medição do ${escapeHTML(record.field)}"
          >
            🗑️ Excluir
          </button>
        </footer>
      `;

      DOM.recordsContainer.appendChild(card);
    });

    // Vincula eventos de exclusão aos botões recém-renderizados
    DOM.recordsContainer.querySelectorAll('.ca-btn-delete').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        deleteRecord(id);
      });
    });
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // 9. AÇÕES DE CADASTRO E EXCLUSÃO
  // ==========================================================================
  function handleFormSubmit(event) {
    event.preventDefault();

    const dateTime = DOM.inputDateTime.value;
    const field = DOM.inputField.value.trim();
    const crop = DOM.inputCrop.value.trim();
    const moistureRaw = DOM.inputMoisture.value;
    const tempRaw = DOM.inputTemp.value;
    const observations = DOM.inputObservations.value.trim();

    // Seletor de status de pragas marcado
    const pestStatusRadio = DOM.form.querySelector('input[name="pestStatus"]:checked');
    const pestStatus = pestStatusRadio ? pestStatusRadio.value : 'safe';

    // Validações agronômicas e de preenchimento
    if (!dateTime) {
      ToastService.show('Informe a data e hora da coleta.', 'error');
      DOM.inputDateTime.focus();
      return;
    }

    if (!field) {
      ToastService.show('Identifique o talhão ou lote.', 'error');
      DOM.inputField.focus();
      return;
    }

    if (!crop) {
      ToastService.show('Informe a cultura ou variedade plantada.', 'error');
      DOM.inputCrop.focus();
      return;
    }

    const moisture = parseFloat(moistureRaw);
    if (isNaN(moisture) || moisture < 0 || moisture > 100) {
      ToastService.show('A umidade do solo deve estar entre 0% e 100%.', 'error');
      DOM.inputMoisture.focus();
      return;
    }

    const temp = parseFloat(tempRaw);
    if (isNaN(temp) || temp < -10 || temp > 60) {
      ToastService.show('A temperatura deve estar entre -10°C e 60°C.', 'error');
      DOM.inputTemp.focus();
      return;
    }

    // Cria novo registro
    const newRecord = {
      id: `ca_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      dateTime: dateTime,
      field: field,
      crop: crop,
      soilMoisture: moisture,
      temperature: temp,
      pestStatus: pestStatus,
      observations: observations,
      createdAt: Date.now()
    };

    // Insere no início do array
    appState.records.unshift(newRecord);
    StorageService.saveRecords(appState.records);

    // Feedback e atualização
    ToastService.show(`Medição registrada no ${field}!`, 'success');
    DOM.form.reset();
    resetFormDateTime();

    // Mantém o rádio em seguro por padrão
    const safeRadio = DOM.form.querySelector('input[name="pestStatus"][value="safe"]');
    if (safeRadio) safeRadio.checked = true;

    updateKPIs();
    renderRecords();
  }

  function deleteRecord(id) {
    const item = appState.records.find(r => r.id === id);
    const fieldName = item ? item.field : 'Medição';

    if (!confirm(`Deseja realmente remover o registro do "${fieldName}"?`)) {
      return;
    }

    appState.records = appState.records.filter(r => r.id !== id);
    StorageService.saveRecords(appState.records);

    ToastService.show(`Registro de "${fieldName}" removido.`, 'info');
    updateKPIs();
    renderRecords();
  }

  function resetFormDateTime() {
    if (DOM.inputDateTime) {
      DOM.inputDateTime.value = getLocalDateTimeString();
    }
  }

  // ==========================================================================
  // 10. INICIALIZAÇÃO E BINDING DE EVENTOS
  // ==========================================================================
  function init() {
    // 1. Carrega dados do LocalStorage
    appState.records = StorageService.getRecords();

    // 2. Preenche data/hora atual no formulário
    resetFormDateTime();

    // 3. Atualiza métricas e renderiza lista
    updateKPIs();
    renderRecords();

    // 4. Listeners do formulário
    DOM.form.addEventListener('submit', handleFormSubmit);

    DOM.btnResetForm.addEventListener('click', () => {
      setTimeout(() => {
        resetFormDateTime();
        const safeRadio = DOM.form.querySelector('input[name="pestStatus"][value="safe"]');
        if (safeRadio) safeRadio.checked = true;
      }, 50);
    });

    // 5. Listeners de busca e filtros
    DOM.searchInput.addEventListener('input', function () {
      appState.searchTerm = this.value;
      DOM.btnClearSearch.style.display = this.value ? 'block' : 'none';
      renderRecords();
    });

    DOM.btnClearSearch.addEventListener('click', function () {
      DOM.searchInput.value = '';
      appState.searchTerm = '';
      this.style.display = 'none';
      renderRecords();
    });

    DOM.filterStatusSelect.addEventListener('change', function () {
      appState.statusFilter = this.value;
      renderRecords();
    });

    DOM.btnEmptyReset.addEventListener('click', function () {
      DOM.searchInput.value = '';
      appState.searchTerm = '';
      DOM.btnClearSearch.style.display = 'none';
      DOM.filterStatusSelect.value = 'all';
      appState.statusFilter = 'all';
      renderRecords();
    });

    // 6. Botão de restauração do Seed Demo
    DOM.btnDemoSeed.addEventListener('click', function () {
      if (confirm('Deseja restaurar as 4 medições de demonstração originais?')) {
        appState.records = StorageService.resetSeed();
        appState.searchTerm = '';
        appState.statusFilter = 'all';
        DOM.searchInput.value = '';
        DOM.filterStatusSelect.value = 'all';
        DOM.btnClearSearch.style.display = 'none';
        updateKPIs();
        renderRecords();
        ToastService.show('Dados de demonstração restaurados com sucesso!', 'success');
      }
    });

    console.log('🌱 Conecta Agro inicializado com sucesso.');
  }

  // Dispara quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
