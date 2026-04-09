/*
   * ┌─────────────────────────────────────────────────────────────┐
   * │  DADOS DOS PROJETOS — edite aqui para adicionar os seus!    │
   * └─────────────────────────────────────────────────────────────┘
   *
   * Campos de cada projeto:
   *   emoji    → ícone exibido no card e no carrossel (ou use uma URL de imagem)
   *   label    → categoria curta (ex: "Mobile", "SaaS")
   *   title    → nome do projeto
   *   desc     → descrição curta exibida no card
   *   techs    → array de tecnologias utilizadas
   *   goal     → objetivo do projeto (exibido no modal)
   *   how      → como foi desenvolvido (exibido no modal)
   *   medias   → array de emojis ou URLs de imagem para o carrossel
   *   link     → URL do repositório ou demo (opcional)
   */
  const projects = [
    {
      emoji: "🛒",
      label: "E-commerce",
      title: "Plataforma de Vendas Online",
      desc: "Sistema completo de e-commerce com carrinho, pagamentos e painel admin.",
      techs: ["React", "Node.js", "Stripe"],
      goal: "Criar uma plataforma de compras fluida, segura e escalável para pequenas e médias empresas.",
      how: "Desenvolvido com arquitetura fullstack moderna, integrando gateway de pagamento Stripe e painel administrativo em tempo real.",
      medias: ["🛒", "📊", "💳", "📦"],
      link: "#"
    },
    {
      emoji: "🤖",
      label: "IA & Automação",
      title: "Dashboard de Análise com IA",
      desc: "Painel de análise de dados com insights gerados por inteligência artificial.",
      techs: ["Python", "FastAPI", "OpenAI"],
      goal: "Automatizar relatórios e gerar insights acionáveis a partir de grandes volumes de dados.",
      how: "Integração com APIs de LLMs para resumir e interpretar dados de forma natural, com visualizações interativas.",
      medias: ["🤖", "📈", "🧠", "📋"],
      link: "#"
    },
    {
      emoji: "📱",
      label: "Mobile",
      title: "App de Hábitos e Produtividade",
      desc: "Aplicativo mobile para rastreamento de hábitos e metas pessoais.",
      techs: ["React Native", "Firebase", "Expo"],
      goal: "Ajudar usuários a manterem consistência nos seus hábitos com uma interface motivadora.",
      how: "Construído com React Native e notificações push, com sincronização em tempo real via Firebase.",
      medias: ["📱", "✅", "🏆", "🔔"],
      link: "#"
    },
    {
      emoji: "🎨",
      label: "Design System",
      title: "Componentes UI Open Source",
      desc: "Biblioteca de componentes reutilizáveis com Storybook e testes automatizados.",
      techs: ["TypeScript", "Storybook", "Jest"],
      goal: "Padronizar a UI em múltiplos projetos, reduzindo tempo de desenvolvimento em 40%.",
      how: "Sistema de design baseado em tokens CSS, documentado no Storybook com cobertura de testes acima de 90%.",
      medias: ["🎨", "🧩", "📚", "🔧"],
      link: "#"
    },
    {
      emoji: "🌐",
      label: "SaaS",
      title: "Plataforma de Agendamentos",
      desc: "Sistema SaaS para gestão de agendamentos com múltiplos prestadores.",
      techs: ["Next.js", "PostgreSQL", "Tailwind"],
      goal: "Substituir planilhas e agendas físicas por um sistema digital intuitivo e robusto.",
      how: "Arquitetura multi-tenant com controle de acesso granular, sistema de notificações e relatórios.",
      medias: ["🌐", "📅", "👥", "📊"],
      link: "#"
    },
    {
      emoji: "🔒",
      label: "Segurança",
      title: "Autenticação Zero Trust",
      desc: "Módulo de autenticação seguro com 2FA, OAuth e auditoria de acessos.",
      techs: ["Auth0", "JWT", "Node.js"],
      goal: "Garantir segurança máxima com zero impacto na experiência do usuário.",
      how: "Implementação de fluxos OAuth 2.0, autenticação multifator e logs de auditoria detalhados.",
      medias: ["🔒", "🔑", "🛡️", "📜"],
      link: "#"
    }
  ];

  /* ── Estado do modal ── */
  let currentProject = null;
  let currentMedia = 0;

  /* ── Renderiza os cards ── */
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map((p, i) => `
      <div class="project-card reveal" onclick="openModal(${i})" style="transition-delay:${i * 0.08}s">
        <div class="card-thumb">
          ${p.emoji.startsWith('http') ? `<img src="${p.emoji}" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:3.5rem">${p.emoji}</span>`}
          <div class="card-thumb-overlay"></div>
        </div>
        <div class="card-body">
          <div class="card-label">${p.label}</div>
          <div class="card-title">${p.title}</div>
          <div class="card-desc">${p.desc}</div>
        </div>
        <div class="card-footer">
          ${p.techs.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
    observeReveal();
  }

  /* ── Abre o modal ── */
  function openModal(idx) {
    currentProject = idx;
    currentMedia = 0;
    const p = projects[idx];

    updateMedia();

    document.getElementById('modalInfo').innerHTML = `
      <div class="modal-cat">${p.label}</div>
      <div class="modal-title">${p.title}</div>
      <div class="modal-divider"></div>
      <div>
        <div class="modal-section-label">Objetivo</div>
        <div class="modal-text">${p.goal}</div>
      </div>
      <div>
        <div class="modal-section-label">Como foi desenvolvido</div>
        <div class="modal-text">${p.how}</div>
      </div>
      <div>
        <div class="modal-section-label">Tecnologias</div>
        <div class="modal-techs">${p.techs.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
      </div>
      <div style="margin-top:auto; padding-top:0.5rem;">
        <a href="${p.link}" target="_blank" class="btn btn-primary" style="width:100%; justify-content:center; border-radius:10px;">
          Ver repositório ↗
        </a>
      </div>
    `;

    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* ── Atualiza a mídia exibida no carrossel ── */
  function updateMedia() {
    const p = projects[currentProject];
    const media = p.medias[currentMedia];
    const viewer = document.getElementById('mediaViewer');

    if (media.startsWith('http')) {
      /* Imagem/vídeo real */
      if (media.match(/\.(mp4|webm|ogg)$/i)) {
        viewer.innerHTML = `<video src="${media}" controls style="width:100%;height:100%;object-fit:cover"></video>`;
      } else {
        viewer.innerHTML = `<img src="${media}" alt="Mídia do projeto" style="width:100%;height:100%;object-fit:cover">`;
      }
    } else {
      /* Emoji placeholder */
      viewer.innerHTML = `<span style="font-size:5rem">${media}</span>`;
    }

    /* Atualiza os dots */
    const dots = document.getElementById('mediaDots');
    dots.innerHTML = p.medias.map((_, i) =>
      `<div class="media-dot ${i === currentMedia ? 'active' : ''}" onclick="setMedia(${i})"></div>`
    ).join('');
  }

  function setMedia(i) {
    currentMedia = i;
    updateMedia();
  }

  /* ── Navegação do carrossel ── */
  document.getElementById('mediaPrev').addEventListener('click', () => {
    const p = projects[currentProject];
    currentMedia = (currentMedia - 1 + p.medias.length) % p.medias.length;
    updateMedia();
  });
  document.getElementById('mediaNext').addEventListener('click', () => {
    const p = projects[currentProject];
    currentMedia = (currentMedia + 1) % p.medias.length;
    updateMedia();
  });

  /* ── Fecha o modal ── */
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ── Animações de scroll (IntersectionObserver) ── */
  function observeReveal() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  /* ── Init ── */
  renderProjects();
  observeReveal();