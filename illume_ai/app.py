from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
import requests
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class ImageGeneration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    count = db.Column(db.Integer, default=0)

class UserSignIn(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    count = db.Column(db.Integer, default=0)

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    # Track sign-in
    today = date.today()
    record = UserSignIn.query.filter_by(email=email, date=today).first()
    if not record:
        record = UserSignIn(email=email, date=today, count=0)
        db.session.add(record)
    record.count += 1
    db.session.commit()

    return jsonify({'message': 'Login successful', 'email': user.email})

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    email = data.get('email')
    prompt = data.get('prompt')

    if not email or not prompt:
        return jsonify({'error': 'Missing email or prompt'}), 400

    today = date.today()
    record = ImageGeneration.query.filter_by(email=email, date=today).first()

    if record and record.count >= 10:
        return jsonify({'error': 'Daily generation limit reached (10/10)'}), 403

    if not record:
        record = ImageGeneration(email=email, date=today, count=0)
        db.session.add(record)

    record.count += 1
    db.session.commit()

    try:
        node_response = requests.post(
            'http://localhost:5000/generate-image',  # Node.js API endpoint
            json={'prompt': prompt},
            timeout=20
        )

        if node_response.status_code != 200:
            return jsonify({'error': 'Image generation failed', 'details': node_response.json()}), 500

        return jsonify(node_response.json())

    except requests.RequestException as e:
        return jsonify({'error': 'Node.js server unavailable', 'details': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('users.db'):
        db.create_all()
    app.run(debug=True)
