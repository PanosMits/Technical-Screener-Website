<h2>What is this Repo</h2>
This is a very basic React app that is connected to a Flask backend. <br>
This repo can be used as a template for a React-Flask application.

<h3>Flask</h2>

```
cd api/
mkdir venv
cd venv/
virtualenv . - (If having virtualenv installed in your machine)
cd ..
cp .env.dist .env
source venv/bin/activate
pip3 install -r requirements.txt
flask run
```
<b>Note</b>:
`flask run` (Defaults to port 80), if need to specify a port execute
```
flask run --host=0.0.0.0 --port=80
```


<h3>React</h2>

```
cd to front-end/
yarn start
```

<b>Note</b>:
In `package.json` we need to specify a `proxy` attribute.<br>
The value of that attribute must be the URL that we run the Flask backend at. (flask run command)

![Technical Screener Demo GIF](demo/technical-screener-demo.gif)