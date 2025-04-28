const monthsArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const week = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
]
const tomorrowDateObj = new Date();
tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
const tomorrowDate = tomorrowDateObj.getDate();
const currentMonth = monthsArr[tomorrowDateObj.getMonth()];
const currentYear = tomorrowDateObj.getFullYear();
const tomorrowDay = week[tomorrowDateObj.getDay()];

output.getTomorrowDate = {
  spaceFormat: `${tomorrowDate} ${currentMonth} ${currentYear}`,
  commaFormat: `${currentMonth} ${tomorrowDate}, ${currentYear}`,
  dotFormat: `${tomorrowDate}. ${currentMonth} ${currentYear}`,
  weekDayFormat: `${tomorrowDay}, ${tomorrowDate} ${currentMonth} ${currentYear}`,
};
