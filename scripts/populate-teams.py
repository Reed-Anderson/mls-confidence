from google.cloud import firestore

# Instantiate DB Instance
db = firestore.Client()

# Create dict of teams to add to database
teams = {
    'ATL': { 'name': 'Atlanta United FC' },
    'CHI': { 'name': 'Chicago Fire FC' },
    'CIN': { 'name': 'FC Cincinnati' },
    'COL': { 'name': 'Colorado Rapids' },
    'CLB': { 'name': 'Columbus Crew SC' },
    'DC':  { 'name': 'D.C. United' },
    'DAL': { 'name': 'FC Dallas' },
    'HO':  { 'name': 'Houston Dynamo' },
    'SKC': { 'name': 'Sporting Kansas City' },
    'LA':  { 'name': 'LA Galaxy' },
    'LFC': { 'name': 'Los Angeles Football Club' },
    'MIA': { 'name': 'Inter Miami CF' },
    'MIN': { 'name': 'Minnesota United FC' },
    'MTL': { 'name': 'Montreal Impact' },
    'NSC': { 'name': 'Nashville SC' },
    'NE':  { 'name': 'New England Revolution' },
    'NYC': { 'name': 'New York City FC' },
    'NY':  { 'name': 'New York Red Bulls' },
    'ORL': { 'name': 'Orlando City SC' },
    'POR': { 'name': 'Portland Timbers' },
    'PHI': { 'name': 'Philadelphia Union' },
    'RSL': { 'name': 'Real Salt Lake' },
    'SJ':  { 'name': 'San Jose Earthquakes' },
    'SEA': { 'name': 'Seattle Sounders FC' },
    'TOR': { 'name': 'Toronto FC' },
    'VAN': { 'name': 'Vancouver Whitecaps FC' }
}

# Set teams
db.document( 'maps/teams' ).set( teams )