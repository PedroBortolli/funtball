const names = {
	'ARI': 'Arizona Cardinals',
	'ATL': 'Atlanta Falcons',
	'BAL': 'Baltimore Ravens',
	'BUF': 'Buffalo Bills',
	'CAR': 'Carolina Panthers',
	'CHI': 'Chicago Bears',
	'CIN': 'Cincinnati Bengals',
	'CLE': 'Cleveland Browns',
	'DAL': 'Dallas Cowboys',
	'DEN': 'Denver Broncos',
	'DET': 'Detroit Lions',
	'GB': 'Green Bay Packers',
	'HOU': 'Houston Texans',
	'IND': 'Indianapolis Colts',
	'JAX': 'Jacksonville Jaguars',
	'KC': 'Kansas City Chiefs',
	'LA': 'Los Angeles Rams',
	'LAC': 'Los Angeles Chargers',
	'LV': 'Las Vegas Raiders',
	'MIA': 'Miami Dolphins',
	'MIN': 'Minnesota Vikings',
	'NE': 'New England Patriots',
	'NO': 'New Orleans Saints',
	'NYG': 'New York Giants',
	'NYJ': 'New York Jets',
	'PHI': 'Philadelphia Eagles',
	'PIT': 'Pittsburgh Steelers',
	'SEA': 'Seattle Seahawks',
	'SF': 'San Francisco 49ers',
	'TB': 'Tampa Bay Buccaneers',
	'TEN': 'Tennessee Titans',
	'WAS': 'Washington Redskins'
}

function fullName(str) {
	if (str in names) return names[str]
	return str
}

export default fullName