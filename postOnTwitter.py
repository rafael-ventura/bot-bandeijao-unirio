import tweepy
from main import semana
import sys
from decouple import config

api_key = config('API_KEY')
api_secret = config('API_SECRET')

bearer_token = config('BEARER_TOKEN')

access_token = config('ACCESS_TOKEN')
access_token_secret = config('ACCESS_TOKEN_SECRET')

auth = tweepy.OAuth1UserHandler(api_key, api_secret, access_token,
                                access_token_secret)
api = tweepy.API(auth)
client = tweepy.Client(bearer_token, api_key, api_secret, access_token,
                       access_token_secret)

cardapio = api.media_upload(
    "C:/dev/autoBandeijao/bot-bandeijao-unirio/cardapiosHist/cardapio_{}.jpg".
    format(semana))
tweet = "Cardapio Bandeijao - Semana {}".format(semana)
post_result = api.update_status(status=tweet,
                                media_ids=[cardapio.media_id_string])
sys.exit()
