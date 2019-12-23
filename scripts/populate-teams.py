from google.cloud import firestore

# Instantiate DB Instance
db = firestore.Client()

# Create array of all teams
teams = [
    { 'id': 'ATL', 'name': 'Atlanta United FC' },
    { 'id': 'CHI', 'name': 'Chicago Fire FC' },
    { 'id': 'CIN', 'name': 'FC Cincinnati' },
    { 'id': 'COL', 'name': 'Colorado Rapids' },
    { 'id': 'CLB', 'name': 'Columbus Crew SC' },
    { 'id': 'DC', 'name': 'D.C. United' },
    { 'id': 'DAL', 'name': 'FC Dallas' },
    { 'id': 'HO', 'name': 'Houston Dynamo' },
    { 'id': 'SKC', 'name': 'Sporting Kansas City' },
    { 'id': 'LA', 'name': 'LA Galaxy' },
    { 'id': 'LFC', 'name': 'Los Angeles Football Club' },
    { 'id': 'MIA', 'name': 'Inter Miami CF' },
    { 'id': 'MIN', 'name': 'Minnesota United FC' },
    { 'id': 'MTL', 'name': 'Montreal Impact' },
    { 'id': 'NSC', 'name': 'Nashville SC' },
    { 'id': 'NE', 'name': 'New England Revolution' },
    { 'id': 'NYC', 'name': 'New York City FC' },
    { 'id': 'NY', 'name': 'New York Red Bulls' },
    { 'id': 'ORL', 'name': 'Orlando City SC' },
    { 'id': 'POR', 'name': 'Portland Timbers' },
    { 'id': 'PHI', 'name': 'Philadelphia Union' },
    { 'id': 'RSL', 'name': 'Real Salt Lake' },
    { 'id': 'SJ', 'name': 'San Jose Earthquakes' },
    { 'id': 'SEA', 'name': 'Seattle Sounders FC' },
    { 'id': 'TOR', 'name': 'Toronto FC' },
    { 'id': 'VAN', 'name': 'Vancouver Whitecaps FC' },
]

# Create batch to commit all changes atomically
batch = db.batch()

# Add each team to the 'teams' collection
for team in teams:
    ref = db.collection( 'teams' ).document( team.get( 'id' ) )
    team = { 'name': team.get( 'name' ) }
    batch.set( ref, team )

# Commit changes made
batch.commit()