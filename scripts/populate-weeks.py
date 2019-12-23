import importlib.util
from google.cloud import firestore
from datetime import datetime, timedelta
from w01 import week1
from w02 import week2
from w03 import week3
from w04 import week4
from w05 import week5

# Instantiate DB Instance
db = firestore.Client()
# Magic number my timezone
tz_offset = 6
# Create batch to commit all changes atomically
batch = db.batch()
# List all weeks to populate
weeks = [ week1, week2, week3, week4, week5 ]

# Function to turn a dictionary game into a Firebase document
def handleGame( dictGame ):
    kickoff = datetime(
        dictGame.get( 'year' ),
        dictGame.get( 'month' ),
        dictGame.get( 'date' ),
        dictGame.get( 'hour' ),
        dictGame.get( 'minute' )
    )
    kickoff = kickoff + timedelta( hours=tz_offset )

    home = db.collection( 'teams' ).document( dictGame.get( 'home' ) )
    away = db.collection( 'teams' ).document( dictGame.get( 'away' ) )

    return {
        'home': home,
        'away': away,
        'kickoff': kickoff
    }

# Create a document for each week in the array
for i in range( len( weeks ) ):
    week = weeks[ i ]
    gameList = week.get( 'games' )
    weekRef = db.collection( 'weeks' ).document( str( i + 1 ) )
    weekDoc = {
        'games': list( map( handleGame, gameList ) )
    }
    batch.set( weekRef, weekDoc )

# Commit changes made
batch.commit()