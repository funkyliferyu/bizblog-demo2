/* ===== 비즈플래닛 마케팅 채널관리 데모: 시나리오 네비게이션 + 하이라이트 ===== */
(function () {
  'use strict';

  // 사용자 이용 시나리오: 테라스의원 매장 등록부터 AI 블로그 발행, 챗봇 RAG 설정까지
  var SCENARIO = [
    {
      page: 'soho_dashboard.html',
      label: '서비스 대시보드',
      target: { selector: '.btn-store-switch', text: '매장 추가' },
      guide: '서비스 대시보드 상단에서 [+ 매장 추가]를 눌러 매장 등록을 시작합니다.',
      next: 'soho_store_register.html'
    },
    {
      page: 'soho_store_register.html',
      label: '매장 정보 등록',
      target: { selector: '#place-fetch-btn', text: '불러오기' },
      guide: '네이버 플레이스 입력창에 테라스의원 주소가 입력되어 있습니다. [불러오기]를 눌러 Place 정보를 가져옵니다.',
      next: 'soho_store_register_loaded.html'
    },
    {
      page: 'soho_store_register_loaded.html',
      label: 'SOHO업체 정보 확인',
      target: { selector: '#store-submit-btn', text: '등록 완료' },
      guide: '네이버 플레이스 정보를 기준으로 테라스의원의 매장 정보가 자동입력되었습니다. 하단의 [등록 완료] 버튼으로 매장 등록을 마칩니다.',
      next: '03_AI학습_온보딩.html'
    },
    {
      page: '03_AI학습_온보딩.html',
      label: 'AI 학습 설정',
      target: { selector: '#training-start-btn', text: '저장 후 수집 실행' },
      guide: '네이버 블로그와 플레이스 리뷰 수집 범위와 수집 주기를 설정하고 [저장 후 수집 실행]을 누릅니다.',
      next: '04_AI학습_수집중.html'
    },
    {
      page: '04_AI학습_수집중.html',
      label: '콘텐츠 수집 진행',
      target: { selector: '#collection-next-btn', text: '분석할 콘텐츠 선택' },
      guide: '수집 완료 상태를 확인한 뒤 [분석할 콘텐츠 선택]으로 이동합니다.',
      next: '05_AI학습_콘텐츠선택.html',
      entryModal: {
        title: '네이버 채널 수집 중',
        desc: '네이버 블로그와 플레이스 리뷰를 불러오고 있습니다. 잠시 후 수집 완료 상태가 표시됩니다.',
        rows: [
          ['수집 범위 확인', '완료'],
          ['블로그/플레이스 수집', '진행 중']
        ]
      }
    },
    {
      page: '05_AI학습_콘텐츠선택.html',
      label: '분석 콘텐츠 선택',
      target: { selector: '#selection-analysis-btn', text: '분석 실행' },
      guide: '분석에 사용할 블로그와 플레이스를 선택한 뒤 [분석 실행]을 누릅니다.',
      next: '06_AI학습_현황.html'
    },
    {
      page: '06_AI학습_현황.html',
      label: 'AI 학습 현황',
      target: { selector: '#learning-ruleset-alert-link', text: '마케팅 전략 룰셋' },
      guide: '학습 완료 후 생성된 [마케팅 전략 룰셋]을 확인합니다.',
      next: '07_마케팅전략룰셋.html',
      entryModal: {
        title: 'AI 분석 결과 반영 중',
        desc: '선택한 콘텐츠 분석 결과를 학습 현황과 마케팅 전략 룰셋에 반영하고 있습니다.',
        rows: [
          ['콘텐츠 분석', '완료'],
          ['룰셋 생성', '진행 중']
        ]
      }
    },
    {
      page: '07_마케팅전략룰셋.html',
      label: '마케팅 전략 룰셋 확인',
      target: { selector: '.top-tab', text: '블로그 작성 포뮬라' },
      guide: '마케팅 블로그 생성 규칙을 확인하기 위해 [블로그 작성 포뮬라] 탭으로 이동합니다.',
      next: '07_마케팅전략룰셋_블로그작성포뮬라.html'
    },
    {
      page: '07_마케팅전략룰셋_블로그작성포뮬라.html',
      label: '블로그 작성 포뮬라 확인',
      target: { selector: '.demo-flow-action', text: '블로그 관리' },
      guide: '블로그 작성 포뮬라와 AI가 생성안 초안을 확인한 뒤 [블로그 관리]로 이동합니다.',
      next: '02_블로그관리_생성완료.html'
    },
    {
      page: '02_블로그관리_생성완료.html',
      label: '자동생성 블로그 목록 조회',
      target: { selector: '#blog-post-list tr', text: '리팟레이저로' },
      guide: '자동생성 설정에 따라 블로그 글이 생성되었습니다. 승인대기 상태의 블로그를 선택해 내용을 확인합니다.',
      next: '09_AI콘텐츠생성_상세.html'
    },
    {
      page: '09_AI콘텐츠생성_상세.html',
      label: '자동생성 블로그 확인',
      target: { selector: '#openBlogPreviewBtn', text: '블로그 적용 미리보기' },
      guide: '생성된 글, 이미지 설명, SEO 점수를 확인한 뒤 [블로그 적용 미리보기]를 엽니다.',
      next: '09_AI콘텐츠생성_상세_미리보기.html',
      extraTargets: [
        { target: { selector: '#request-publish-btn', text: '바로 발행 요청' }, next: '10_블로그_발행대기_상세.html' }
      ]
    },
    {
      page: '09_AI콘텐츠생성_상세_미리보기.html',
      label: '블로그 적용 미리보기',
      target: { selector: '#preview-publish-request', text: '바로 발행 요청' },
      guide: '블로그 적용 화면을 확인한 뒤 [바로 발행 요청]으로 즉시 발행 요청 상태로 전환합니다.',
      next: '10_블로그_발행대기_상세.html'
    },
    {
      page: '10_블로그_발행대기_상세.html',
      label: '발행 후 완료 처리',
      target: { selector: '.card-footer .btn-primary', text: '발행 완료 처리' },
      guide: '블로그 포스팅 담당자가 실제 발행 수행 후 [발행 완료 처리] 합니다. 이어서 같은 매장 정보로 챗봇 설정을 진행합니다.',
      next: 'chatbot_rag_ready.html'
    },
    {
      page: 'chatbot_rag_ready.html',
      label: '챗봇용 RAG 문서 생성 준비',
      target: { selector: '#rag-generate-button', text: '챗봇용 RAG 문서 생성' },
      scrollTarget: true,
      guide: '테라스의원 매장 등록과 콘텐츠 학습이 완료된 상태입니다. [챗봇용 RAG 문서 생성]을 눌러 챗봇 지식 문서를 만듭니다.',
      next: 'chatbot_rag_generated.html'
    },
    {
      page: 'chatbot_rag_generated.html',
      label: 'RAG 문서 생성 결과',
      target: { selector: '#chatbot-create-button', text: '챗봇 생성하기' },
      scrollTarget: true,
      guide: "챗봇용 RAG 문서 2개가 생성되었습니다. 각 문서의 내용을 확인한 뒤 '챗봇 생성하기'를 선택해 RB dialog와 연동합니다.",
      next: 'chatbot_rag_download_modal.html'
    },
    {
      page: 'chatbot_rag_download_modal.html',
      label: '챗봇 초기 설정 완료',
      target: { selector: '#download-confirm-button', text: '연동 확인' },
      guide: 'RAG 문서 기반 챗봇 연동 초기 설정 완료 팝업입니다. [연동 확인]을 누르면 RB Dialog 지식 관리 메뉴로 이동합니다.',
      next: 'chatbot_knowledge_list.html'
    },
    {
      page: 'chatbot_knowledge_list.html',
      label: 'RB Dialog 지식 관리 목록',
      target: { selector: '.knowledge-row', text: 'info_terrace' },
      guide: 'RB Dialog 지식 관리 메뉴에 info_terrace와 review_terrace 문서가 자동 연동되어 있습니다. info 문서를 눌러 벡터 임베딩 설정을 확인합니다.',
      next: 'chatbot_info_embedding.html'
    },
    {
      page: 'chatbot_info_embedding.html',
      label: 'info 문서 벡터 임베딩 설정',
      target: null,
      guide: '업체 정보 문서가 청크 크기 500, 오버랩 100, 총 10개 청크로 임베딩되었습니다. 문서 내용과 오버랩 구성을 확인한 뒤 리뷰 문서 설정으로 이동합니다.',
      guideCta: '리뷰파일 보러가기',
      guidePosition: 'top-right',
      next: 'chatbot_reviews_embedding.html'
    },
    {
      page: 'chatbot_reviews_embedding.html',
      label: 'reviews 문서 벡터 임베딩 설정',
      target: null,
      guide: '방문자 리뷰 문서가 청크 크기 800, 오버랩 200, 총 849개 기준으로 임베딩되었습니다. 리뷰 내용과 오버랩 구성을 확인한 뒤 실제 챗봇 화면으로 이동합니다.',
      guideCta: '챗봇 구현 확인하기',
      guidePosition: 'top-right',
      next: 'chatbot_live.html'
    },
    {
      page: 'chatbot_live.html',
      label: '실제 챗봇 이용',
      target: null,
      guide: '실제 RB Dialog 챗봇입니다. 화면 안의 챗봇에서 테라스의원 관련 질문을 직접 확인할 수 있습니다.',
      guidePosition: 'top-right',
      next: null
    }
  ];

  var STORAGE_KEY = 'bizplanetMarketingChannelDemoGuide';
  var page = (location.pathname.split('/').pop() || 'index.html');
  try {
    page = decodeURIComponent(page);
  } catch (error) {
    // Keep the raw path if the browser supplies an undecodable URL segment.
  }
  var stepIndex = -1;
  for (var i = 0; i < SCENARIO.length; i++) {
    if (SCENARIO[i].page === page) { stepIndex = i; break; }
  }
  if (stepIndex === -1) return;

  var step = SCENARIO[stepIndex];

  function guideOn() {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  }

  function findTarget(targetConfig) {
    if (!targetConfig) return null;
    var nodes = document.querySelectorAll(targetConfig.selector);
    for (var i = 0; i < nodes.length; i++) {
      if ((nodes[i].textContent || '').indexOf(targetConfig.text) !== -1) return nodes[i];
    }
    return null;
  }

  function wireNavigation(el, nextPage) {
    if (!el || !nextPage) return;
    el.style.cursor = 'pointer';
    if ('disabled' in el) el.disabled = false;
    el.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.href = nextPage;
    }, true);
  }

  /* ---- 데모 바 (우상단 고정) ---- */
  var bar = document.createElement('div');
  bar.className = 'demo-bar';

  var homeBtn = document.createElement('a');
  homeBtn.className = 'demo-home-btn';
  homeBtn.href = 'index.html';
  homeBtn.title = '데모 홈';
  homeBtn.textContent = '⌂';

  var prevBtn = document.createElement('a');
  prevBtn.className = 'demo-nav-btn' + (stepIndex === 0 ? ' disabled' : '');
  prevBtn.href = stepIndex > 0 ? SCENARIO[stepIndex - 1].page : '#';
  prevBtn.title = '이전 화면';
  prevBtn.textContent = '‹';

  var stepLabel = document.createElement('span');
  stepLabel.className = 'demo-step-label';
  stepLabel.innerHTML = '<strong>' + (stepIndex + 1) + '/' + SCENARIO.length + '</strong>' + step.label;

  var nextBtn = document.createElement('a');
  nextBtn.className = 'demo-nav-btn' + (!step.next ? ' disabled' : '');
  nextBtn.href = step.next || '#';
  nextBtn.title = '다음 화면';
  nextBtn.textContent = '›';
  nextBtn.addEventListener('click', function (event) {
    if (!step.next) return;
    event.preventDefault();
    location.href = step.next;
  });

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'demo-toggle';
  toggle.innerHTML = '<span class="demo-dot"></span>사용자 시나리오';

  bar.appendChild(homeBtn);
  bar.appendChild(prevBtn);
  bar.appendChild(stepLabel);
  bar.appendChild(nextBtn);
  bar.appendChild(toggle);
  document.body.appendChild(bar);

  /* ---- 하이라이트 + 말풍선 ---- */
  var tooltip = null;

  function intersects(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function tooltipRect(top, left) {
    return {
      top: top,
      bottom: top + tooltip.offsetHeight,
      left: left,
      right: left + tooltip.offsetWidth
    };
  }

  function positionTooltip(el) {
    if (!tooltip) return;
    if (step.guidePosition === 'top-right') {
      tooltip.classList.add('top-right');
      tooltip.classList.remove('below');
      tooltip.style.top = '';
      tooltip.style.left = '';
      return;
    }
    if (!el) el = nextBtn;
    var rect = el.getBoundingClientRect();
    var top = rect.top + window.scrollY - tooltip.offsetHeight - 14;
    var below = false;
    if (top < window.scrollY + 8) {
      top = rect.bottom + window.scrollY + 14;
      below = true;
    }
    var left = rect.left + window.scrollX;
    var maxLeft = window.scrollX + document.documentElement.clientWidth - tooltip.offsetWidth - 12;
    if (left > maxLeft) left = Math.max(maxLeft, window.scrollX + 12);
    var barRect = bar.getBoundingClientRect();
    var safeBarRect = {
      top: barRect.top + window.scrollY - 18,
      bottom: barRect.bottom + window.scrollY + 18,
      left: barRect.left + window.scrollX - 18,
      right: barRect.right + window.scrollX + 18
    };
    if (intersects(tooltipRect(top, left), safeBarRect)) {
      top = rect.bottom + window.scrollY + 14;
      below = true;
      if (intersects(tooltipRect(top, left), safeBarRect)) {
        top = safeBarRect.bottom + 8;
      }
    }
    tooltip.classList.toggle('below', below);
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function applyHighlight(el) {
    if (el) el.classList.add('demo-highlight');
    tooltip = document.createElement('div');
    tooltip.className = 'demo-tooltip';
    tooltip.innerHTML =
      '<span class="demo-tooltip-step">STEP ' + (stepIndex + 1) + '/' + SCENARIO.length + '</span>' +
      '<div class="demo-tooltip-body">' + step.guide + '</div>' +
      (step.guideCta ? '<div class="demo-tooltip-actions"><button type="button" class="demo-tooltip-cta">' + step.guideCta + '</button></div>' : '');
    document.body.appendChild(tooltip);
    var cta = tooltip.querySelector('.demo-tooltip-cta');
    if (cta) {
      cta.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (step.next) location.href = step.next;
      });
    }
    positionTooltip(el);
    window.addEventListener('resize', function () { positionTooltip(el); });
    window.addEventListener('scroll', function () { positionTooltip(el); }, true);
  }

  function removeHighlight(el) {
    if (el) el.classList.remove('demo-highlight');
    if (tooltip) { tooltip.remove(); tooltip = null; }
  }

  function syncGuide(el) {
    var on = guideOn();
    toggle.classList.toggle('on', on);
    if (on) {
      if (!tooltip && (!el || !el.classList.contains('demo-highlight'))) applyHighlight(el);
    } else {
      removeHighlight(el);
    }
  }

  var target = findTarget(step.target);
  wireNavigation(target, step.next);
  if (step.scrollTarget && target) {
    window.setTimeout(function () { target.scrollIntoView({ block: 'center' }); }, 80);
  }
  if (step.extraTargets) {
    for (var j = 0; j < step.extraTargets.length; j++) {
      wireNavigation(findTarget(step.extraTargets[j].target), step.extraTargets[j].next);
    }
  }

  toggle.addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, guideOn() ? 'off' : 'on');
    syncGuide(target);
  });

  function showEntryModal(config, onComplete) {
    var modal = document.createElement('div');
    modal.className = 'modal-backdrop demo-entry-modal';
    modal.style.display = 'flex';
    modal.setAttribute('role', 'status');
    modal.setAttribute('aria-live', 'polite');
    var rows = (config.rows || []).map(function (row) {
      var isRunning = row[1] === '진행 중';
      return '<div class="prog-ch-row"><span class="prog-ch-name">' + row[0] + '</span><span class="' + (isRunning ? 's-ing' : 's-done') + '">' + (isRunning ? '<span class="spinner"></span> ' : '') + row[1] + '</span></div>';
    }).join('');
    modal.innerHTML = '<div class="modal modal-sm">' +
      '<div class="modal-title" style="display:flex;align-items:center;justify-content:space-between;gap:10px">' +
      '<span style="display:inline-flex;align-items:center;gap:8px"><span class="spinner" aria-hidden="true"></span>' + config.title + '</span>' +
      '<span class="demo-entry-elapsed" style="font-size:11px;font-weight:700;color:#6B7280">00:00</span>' +
      '</div>' +
      '<div class="modal-desc">' + config.desc + '</div>' +
      '<div style="display:grid;gap:8px;margin-top:12px">' + rows + '</div>' +
      '</div>';
    document.body.appendChild(modal);
    window.setTimeout(function () {
      modal.remove();
      onComplete();
    }, config.durationMs || 4000);
  }

  if (step.entryModal) {
    showEntryModal(step.entryModal, function () { syncGuide(target); });
  } else {
    syncGuide(target);
  }

  if (step.autoNextMs && step.next) {
    window.setTimeout(function () {
      location.href = step.next;
    }, step.autoNextMs);
  }
})();
