import tweepy
from getImage import semana
import sys


#use youu own keys here
api_key = ""
api_secret = ""

bearer_token = ""

access_token = ""
access_token_secret = ""

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
#client.create_tweet(text="Ola Twitter, isto eh um teste.")
