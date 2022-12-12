import tweepy
from getImage import semana
import sys

# client_id_oauth = TLIJO5vegIrOm66XgjrJg18LY5HpZtRBPhLOtFUWhqjSSprjbN
# client_secret_oauth = TLIJO5vegIrOm66XgjrJg18LY5HpZtRBPhLOtFUWhqjSSprjbN

api_key = "Aaqd1CS8swivr0f1Coz4Rm6ap"
api_secret = "Qp7aAINIL7wCvhE9KaOtpvnOMKeRhjHpyjJPPFiLzADo2QF0Zj"

bearer_token = "AAAAAAAAAAAAAAAAAAAAAEn5kAEAAAAAbxkgzlLAW0AX8xQJY%2Fp0mxLf1Eg%3DUKoUEfvDoUT5mzbnd80Ma6UMQT3PqdFh6oCkG3MukIGF7yfQKy"

access_token = "1601122308344762368-1y2jnJGelDT6wCo83GJPUYRhr15mPt"
access_token_secret = "eCt9yzQ0043fyZ35NEypFkynMrc2eEIBWfkdMGvdEAf1b"

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
