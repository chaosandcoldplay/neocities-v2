/* element storage */
const calendar = document.getElementById('calendar');
const weekBorder = document.getElementById('week-border');
const monthLabel = document.getElementById('month-label');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const startOfMonth = new Date(year, month, 1);
const endOfMonth = new Date(year, month + 1, 0);
const startDay = (startOfMonth.getDay() + 6) % 7; // week starts Monday
const daysInMonth = endOfMonth.getDate();

const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/* weekday headers */
dayNames.forEach((day, index) => {
  const label = document.createElement('div');
  label.className = 'day-label';
  if (index === 5) label.classList.add('saturday');
  if (index === 6) label.classList.add('sunday');
  label.textContent = day;
  calendar.appendChild(label);
});

/* create day cells */
const prevMonth = new Date(year, month, 0);
const prevMonthDays = prevMonth.getDate();
const dates = [];

for (let i = startDay; i > 0; i--) {
  dates.push({ day: prevMonthDays - i + 1, current: false });
}

for (let i = 1; i <= daysInMonth; i++) {
  const isToday =
    i === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  dates.push({ day: i, current: true, isToday });
}

dates.forEach((date, index) => {
  const div = document.createElement('div');
  div.textContent = date.day;

  const col = index % 7;
  if (!date.current) div.classList.add('prev');
  if (date.isToday) div.classList.add('today');
  if (col === 5) div.classList.add('saturday');
  if (col === 6) div.classList.add('sunday');

  calendar.appendChild(div);
});

/* week border */
requestAnimationFrame(() => {
  const todayCell = calendar.querySelector('.today');
  if (todayCell) {
    const calendarRect = calendar.getBoundingClientRect();
    const cellSize = todayCell.getBoundingClientRect().height;
    const top = todayCell.offsetTop;

    weekBorder.style.top = `${top}px`;
    weekBorder.style.left = `0`;
    weekBorder.style.width = `100%`;
    weekBorder.style.height = `${cellSize}px`;
  }
});

/* page side boxes */
const todays = new Date();
todays.setHours(0, 0, 0, 0);

const dayOfWeek = todays.getDay();
const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

const monday = new Date(todays);
monday.setDate(todays.getDate() - diffToMonday);
monday.setHours(0, 0, 0, 0);

/* month label */
if (monthLabel) {
  const monthEnglish = monday.toLocaleString('default', { month: 'long' }).toUpperCase();
  const japaneseMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const monthJapanese = japaneseMonths[monday.getMonth()];
  const year = monday.getFullYear();
  monthLabel.textContent = `${monthEnglish} ${monthJapanese} ${year}`;
}

/* page side elements */
const dayElements = document.querySelectorAll('.day');
dayElements.forEach((dayEl, i) => {
  const date = new Date(monday);
  date.setDate(monday.getDate() + i);
  date.setHours(0, 0, 0, 0);

  const dayNum = date.getDate();
  const weekday = date.getDay();

  const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const japaneseWeekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const dateDiv = dayEl.querySelector('.date');
  if (dateDiv) {
    const pTags = dateDiv.querySelectorAll('p');
    if (pTags.length >= 4) {
      pTags[0].textContent = dayNum;
      pTags[1].textContent = weekdayNames[weekday];
      pTags[2].textContent = japaneseWeekdays[weekday];
      pTags[3].textContent = getMoonEmoji(date);
    }

    if (date.getTime() === todays.getTime()) {
      dateDiv.classList.add('today-highlight');
    }
  }
});

/* moon phase */
function getMoonEmoji(date) {
  const lp = 2551443; // length of lunar phase in seconds
  const now = date.getTime() / 1000;
  const newMoon = new Date('2001-01-01T00:00:00Z').getTime() / 1000;
  let phase = ((now - newMoon) % lp) / lp;
  if (phase < 0) phase += 1;

  if (phase < 0.03 || phase > 0.97) return '🌑';
  if (phase < 0.22) return '🌒';
  if (phase < 0.28) return '🌓';
  if (phase < 0.47) return '🌔';
  if (phase < 0.53) return '🌕';
  if (phase < 0.72) return '🌖';
  if (phase < 0.78) return '🌗';
  return '🌘';
}