# python proxy_server.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = 'YOUR_API_KEY'

@app.route('/api/gemini', methods=['POST'])
def proxy_to_gemini():
    payload = request.get_json()

    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}'

    headers = {
        'Content-Type': 'application/json',
    }

    response = requests.post(url, json=payload, headers=headers)

    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)
