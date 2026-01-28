from transformers import pipeline

# Sentiment analysis pipeline for job descriptions
sentiment_analyzer = pipeline('sentiment-analysis')

def analyze_sentiment(text):
    return sentiment_analyzer(text)
