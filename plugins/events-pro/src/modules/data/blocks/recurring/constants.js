export const DAILY = 'daily';
export const WEEKLY = 'weekly';
export const MONTHLY = 'monthly';
export const YEARLY = 'yearly';
export const SINGLE = 'single';

export const TYPES = [ DAILY, WEEKLY, MONTHLY, YEARLY, SINGLE ];

export const DAILY_BETWEEN = 'days_between';
export const WEEKLY_BETWEEN = 'weeks_between';
export const MONTHLY_BETWEEN = 'months_between';
export const YEARLY_BETWEEN = 'years_between';

export const BETWEEN_TYPES = [
	DAILY_BETWEEN,
	WEEKLY_BETWEEN,
	MONTHLY_BETWEEN,
	YEARLY_BETWEEN,
];

export const BETWEEN_KEY_MAPPING = {
	[ DAILY ]: DAILY_BETWEEN,
	[ WEEKLY ]: WEEKLY_BETWEEN,
	[ MONTHLY ]: MONTHLY_BETWEEN,
	[ YEARLY ]: YEARLY_BETWEEN,
};

export const NUMBER_FIELD = 'number';
export const DAY_FIELD = 'day';

//
// ─── WEEKLY RECURRING ───────────────────────────────────────────────────────────
//

export const WEEKLY_DAYS_FIELD = 'days';

//
// ─── MONTHLY RECURRING ──────────────────────────────────────────────────────────
//

export const DAYS_OF_MONTH_FIELD = NUMBER_FIELD;
export const MONTHLY_WEEK_FIELD = NUMBER_FIELD;
export const MONTHLY_DAY_OF_WEEK_FIELD = DAY_FIELD;
export const MONTHLY_REPEAT_BY_WEEKDAY = 'weekday';
export const MONTHLY_REPEAT_BY_DATE = 'date';

//
// ─── YEARLY RECURRING ───────────────────────────────────────────────────────────
//

export const YEARLY_DATE_FIELD = NUMBER_FIELD;
export const YEARLY_WEEK_FIELD = NUMBER_FIELD;
export const YEARLY_MONTH_OF_YEAR_FIELD = 'month';
export const YEARLY_DAY_OF_WEEK_FIELD = DAY_FIELD;
export const YEARLY_REPEAT_BY_WEEK = 'week';
export const YEARLY_REPEAT_BY_DATE = 'date';

//
// ─── AUTHORITY TYPES ────────────────────────────────────────────────────────────
//

export const ALL = 'all';
export const CURRENT = 'current';
export const CURRENT_THEN_ALL = 'current-then-all';
export const UPCOMING = 'upcoming';
