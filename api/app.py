import csv
import os
import pandas as pd
import talib
import yfinance as yf
import pandas_datareader.data as pdr
import time

from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__)

# NOTES
# getattr() Allows us to pass the name of the function as a string (which we get from the url {pattern})
# and gets us the function in a variable that we can use - We can do that cause talib functions are attributes
# or something like that
# more here: https://stackoverflow.com/questions/3061/calling-a-function-of-a-module-by-using-its-name-a-string


@app.route('/api/get-technical-analysis/<pattern>/', methods=['GET'])
def index(pattern):
    # Get the url parameter pattern, default to None
    # pattern = request.args.get('pattern', None)
    stocks = {}
    cryptos = {}

    with open('datasets/companies.csv') as f:
        for row in csv.reader(f):
            stocks[row[0]] = {'symbol': row[0], 'company': row[1]}

    with open('datasets/cryptos.csv') as f:
        for row in csv.reader(f):
            cryptoSymbol = row[0].split(' ')[-1]
            cryptoName = row[0].split(' ')[0]
            cryptos[cryptoSymbol] = {
                'symbol': cryptoSymbol, 'crypto': cryptoName}

    if pattern:
        pattern_function = getattr(talib, pattern)
        datafiles = os.listdir('datasets/daily/companies')
        cryptoDatafiles = os.listdir('datasets/daily/cryptos')

        for filename in datafiles:
            df = pd.read_csv('datasets/daily/companies/{}'.format(filename))
            symbol = filename.split('.')[0]

            try:
                result = pattern_function(
                    df['Open'], df['High'], df['Low'], df['Close'])
                # tail() returns the n rows of a dataframe
                last_candlestick_value = result.tail(1).values[0]
                if last_candlestick_value > 0:  # talib returns 0 if the pattern was not detected
                    stocks[symbol][pattern] = 'bullish'
                    pass
                elif last_candlestick_value < 0:
                    stocks[symbol][pattern] = 'bearish'
                    pass
                else:
                    stocks[symbol][pattern] = None
            except:
                pass

        for cryptoFilename in cryptoDatafiles:
            df = pd.read_csv(
                'datasets/daily/cryptos/{}'.format(cryptoFilename))
            symbol = cryptoFilename.split('.')[0]

            try:
                result = pattern_function(df['Open'], df['High'], df['Low'], df['Close'])
                last_candlestick_value = result.tail(1).values[0]
                if last_candlestick_value > 0:
                    cryptos[symbol][pattern] = 'bullish'
                    pass
                elif last_candlestick_value < 0:
                    cryptos[symbol][pattern] = 'bearish'
                    pass
                else:
                    cryptos[symbol][pattern] = None
            except:
                pass

    return {
        'stocks': stocks,
        'cryptos': cryptos,
        'current_pattern': pattern
    }


# Get the historical data for companies up to a specified date and save them in csv files under the datasets/daily dir
@app.route('/api/snapshot/companies')
def snapshot_companies():
    if not os.path.exists('datasets/daily/companies'):
        os.makedirs('datasets/daily/companies')

    end_date = datetime.today()
    start_date = datetime(end_date.year-1, end_date.month, end_date.day)

    with open('datasets/companies.csv') as f:
        companies = f.read().splitlines()
        for company in companies:
            symbol = company.split(',')[0]
            df = yf.download(symbol, start=start_date, end=end_date)
            df.to_csv('datasets/daily/companies/{}.csv'.format(symbol))

    return {
        'code': 'success'
    }


@app.route('/api/snapshot/cryptos')
def snapshot_cryptos():
    if not os.path.exists('datasets/daily/cryptos'):
        os.makedirs('datasets/daily/cryptos')

    end_date = datetime.today()
    start_date = datetime(end_date.year - 1, end_date.month, end_date.day)

    with open('datasets/cryptos.csv') as f:
        cryptos = f.read().splitlines()
        for crypto in cryptos:
            symbol = crypto.split(' ')[-1]
            try:
                df = pdr.DataReader('{}-USD'.format(symbol),
                                    'yahoo', start_date, end_date)
                df.to_csv('datasets/daily/cryptos/{}.csv'.format(symbol))
            except:
                pass

    return {
        'code': 'success'
    }
