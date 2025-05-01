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
const currentDateObj = new Date();
const currentDate = currentDateObj.getDate();
const currentMonth = monthsArr[currentDateObj.getMonth()];
const currentYear = currentDateObj.getFullYear();
const currentDay = week[currentDateObj.getDay()];

output.getTodayDate = {
  spaceFormat: `${currentDate} ${currentMonth} ${currentYear}`,
  commaFormat: `${currentMonth} ${currentDate}, ${currentYear}`,
  dotFormat: `${currentDate}. ${currentMonth} ${currentYear}`,
  weekDayFormat: `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`,
};
