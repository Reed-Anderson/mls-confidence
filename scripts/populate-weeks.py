import importlib.util
from google.cloud import firestore
from datetime import datetime, timedelta
from w01 import week1
from w02 import week2
from w03 import week3
from w04 import week4
from w05 import week5
from w06 import week6
from w07 import week7
from w08 import week8
from w09 import week9
from w10 import week10
from w11 import week11
from w12 import week12
from w13 import week13

##
# run before scripting:
# set GOOGLE_APPLICATION_CREDENTIALS=ServiceAccountKey.json
##

# Instantiate DB Instance
db = firestore.Client()
# Magic number my timezone
tz_offset = 6
# Create batch to commit all changes atomically
batch = db.batch()
# List all weeks to populate
weeks = [ week1, week2, week3, week4, week5, week6, week7, week8,
          week9, week10, week11, week12, week13 ]

# Function to handle a dictionary representing a date
def handleDate( dictDate ):
    date = datetime(
        dictDate.get( 'year' ),
        dictDate.get( 'month' ),
        dictDate.get( 'date' ),
        dictDate.get( 'hour' ),
        dictDate.get( 'minute' )
    )
    return date + timedelta( hours=tz_offset )

# Function to turn a dictionary game into a Firebase document
def handleGame( dictGame ):
    kickoff = handleDate( dictGame )
    return {
        'home': dictGame.get( 'home' ),
        'away': dictGame.get( 'away' ),
        'kickoff': kickoff
    }

# Create a document for each week in the array
for i in range( len( weeks ) ):
    week = weeks[ i ]
    gameList = week.get( 'games' )
    dueDate = handleDate( week.get( 'dueDate' ) )
    weekRef = db.collection( 'weeks' ).document( str( i + 1 ) )
    weekDoc = {
        'dueDate': dueDate,
        'games': list( map( handleGame, gameList ) )
    }
    batch.set( weekRef, weekDoc )

# Commit changes made
batch.commit()