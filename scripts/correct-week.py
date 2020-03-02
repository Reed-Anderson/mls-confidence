import importlib.util
from google.cloud import firestore

## DEFINE FUNCTIONS ##

# Assigns the given home and away goals to the game at the given index
def handle_game( game_index, home_goals, away_goals ):
    game = games[ game_index ]
    game[ 'homeGoals' ] = home_goals
    game[ 'awayGoals' ] = away_goals

## BEGIN SCRIPT ##

# Step Zero: Collect week number from user
week_number = int( input( 'Corrections for week: ' ) )

# Step One: Instantiate database and collect needed data
db = firestore.Client()
week_path = 'weeks/{}'.format( week_number )
week_document = db.document( week_path ).get()
picks_documents = db.collection( week_path + '/picks' ).list_documents()
weekly_standings_document = db.document( 'standings/{}'.format( week_number ) )
games = week_document.get( 'games' )
user_totals = db.document( 'standings/overall' ).get().get( 'users' )

# Step Two: Collect scores of completed games
for index, game in enumerate( games ):
    temp_string = 'How many goals did {} score? '
    print( '\n\n***Game {}***'.format( index ) )
    try:
        home_goals = int( input( temp_string.format( game.get( 'home' ) ) ) )
        away_goals = int( input( temp_string.format( game.get( 'away' ) ) ) )
        handle_game( index, home_goals, away_goals )
    except:
        break

# Step Three: Correct Picks
week_results_array = []
highest_score = -1
highest_score_user_ids = []
for picks in picks_documents:
    picks_document = picks.get()
    user_id = picks_document.id
    picked_games = picks_document.get( 'picks' )
    score = 0
    games_correct = 0
    scores_correct = 0
    points_doubled = 0
    for index, picked_game in enumerate( picked_games ):
        try:
            game = games[ index ]
            picked_home_goals = picked_game.get( 'homeGoals' )
            picked_away_goals = picked_game.get( 'awayGoals' )
            real_home_goals = game[ 'homeGoals' ]
            real_away_goals = game[ 'awayGoals' ]
            
            if picked_away_goals == real_away_goals and picked_home_goals == real_home_goals:
                score += ( picked_game[ 'confidence' ] * 2 )
                games_correct += 1
                scores_correct += 1
                points_doubled += picked_game[ 'confidence' ]
                continue

            else:
                picked_winner = 'tie'
                if picked_home_goals > picked_away_goals:
                    picked_winner = 'home'
                elif picked_away_goals > picked_home_goals:
                    picked_winner = 'away'

                real_winner = 'tie'
                if real_home_goals > real_away_goals:
                    real_winner = 'home'
                elif real_away_goals > real_home_goals:
                    real_winner = 'away'

                if picked_winner == real_winner:
                    score += picked_game[ 'confidence' ]
                    games_correct += 1

        except:
            break

    user = db.document( 'users/{}'.format( user_id ) ).get()
    result = {
        'firstName': user.get( 'firstName' ),
        'lastName': user.get( 'lastName' ),
        'uid': user_id,
        'totalPoints': score,
        'gamesCorrect': games_correct,
        'scoresCorrect': scores_correct,
        'pointsDoubled': points_doubled
    }
    week_results_array.append( result )

    for user in user_totals:
        if user[ 'uid' ] == user_id:
            user[ 'totalPoints' ] = user.get( 'score', 0 ) + score
            user[ 'gamesCorrect' ] = user.get( 'gamesCorrect', 0 ) + games_correct
            user[ 'scoresCorrect' ] = user.get( 'scoresCorrect', 0 ) + scores_correct
            user[ 'pointsDoubled' ] = user.get( 'pointsDoubled', 0 ) + points_doubled
            break

    if score > highest_score:
        highest_score = score
        highest_score_user_ids = [ user_id ]
    elif score == highest_score:
        highest_score_user_ids.append( user_id )

for user in user_totals:
    user_id = user[ 'uid' ]
    if user_id in highest_score_user_ids:
        user[ 'weeklyWins' ] = user.get( 'weeklyWins', 0 ) + 1

weekly_result = { 'users': week_results_array }
total_result = { 'users': user_totals }

print( weekly_result )
print( '\n\n' )
print( total_result )

continue_response = input( 'Should I set these values in the database? (y) ' )
if continue_response == 'y':
    try:
        db.document( 'standings/{}'.format( week_number ) ).set( weekly_result )
        db.document( 'standings/overall' ).set( total_result )
        print( 'Done.\n\n' )
    except Exception as e:
        print( e )
    
