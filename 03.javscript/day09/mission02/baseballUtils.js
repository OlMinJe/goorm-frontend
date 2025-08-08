export function createEl({ tag, className, text, inner }) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  if (inner) el.innerHTML = inner;
  return el;
}

export function createTeamEl(name, logoUrl, isHome) {
  const container = createEl({ tag: 'td' });
  const teamBox = createEl({ tag: 'div', className: 'team-box font-size-lg' });

  const img = createEl({ tag: 'img' });
  img.setAttribute('src', logoUrl);
  img.setAttribute('alt', `${name} 로고`);

  const text = createEl({ tag: 'span', text: name });

  if (isHome) teamBox.append(img, text); // 홈팀: 로고 먼저
  else teamBox.append(text, img); // 원정팀: 이름 먼저

  container.appendChild(teamBox);
  return container;
}

export function isToday(dateStr) {
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10).replaceAll('-', '');
  return dateStr === formattedToday;
}

export function getFormattedDate(dateStr) {
  const date = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)} <span class="font-size-sm"> ${dayNames[date.getDay()]}</span>`;
}

export const getFormattedTime = ({ startTime }) =>
  `<span class="font-size-lg">${startTime.replace(/(\d{2})(\d{2})/, '$1:$2')}</span>`;

const GAME_STATUS_LABEL = {
  BEFORE: '경기 전',
  LIVE: '경기 중',
  END: '경기 종료',
  CANCEL: '경기 취소',
};

export function getFormattedScore(game) {
  const { gameStatus, awayWlt, homeWlt, awayResult, homeResult } = game;

  const statusText = GAME_STATUS_LABEL[gameStatus];

  if (gameStatus === 'END') {
    const awayScore = `<span class="${awayWlt === 'W' && 'win'}">${awayResult ?? '-'}</span>`;
    const homeScore = `<span class="${homeWlt === 'W' && 'win'}">${homeResult ?? '-'}</span>`;
    const statusLabel = `<span class="font-size-xs">${statusText}</span>`;

    return `${awayScore} ${statusLabel} ${homeScore}`;
  }

  return `- <span class="font-size-xs">${statusText}</span> -`;
}

export function getBroadcastLabel(game) {
  const container = document.createDocumentFragment();

  if (game.gameStatus === 'CANCEL') {
    container.append('경기취소');
  } else if (game.op?.vod) {
    const highlightBtn = createEl({ tag: 'button', className: `font-size-sm btn-highlight`, text: '하이라이트' });
    container.appendChild(highlightBtn);
  } else {
    const textcastBtn = createEl({ tag: 'button', className: `font-size-sm btn-messsage`, text: '문자중계' });
    container.append(textcastBtn);
  }

  return container;
}
