from flask import Flask, render_template, request, jsonify, send_from_directory
from datetime import datetime
import json
import os


app = Flask(__name__, static_folder='static', template_folder='templates')

DATA_FILE = os.path.join(os.path.dirname(__file__), 'contact_messages.json')


def load_messages():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return []


def save_message(msg):
    messages = load_messages()
    messages.append(msg)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(messages, f, ensure_ascii=False, indent=2)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'time': datetime.utcnow().isoformat() + 'Z'})


@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json(force=True)
    except Exception:
        return jsonify({'ok': False, 'error': 'Invalid JSON'}), 400

    # Basic validation
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    subject = (data.get('subject') or '').strip()
    message = (data.get('message') or '').strip()

    if not name or not email or not message:
        return jsonify({'ok': False, 'error': 'Name, email and message are required.'}), 400

    # simple email check
    if '@' not in email or '.' not in email:
        return jsonify({'ok': False, 'error': 'Invalid email address.'}), 400

    entry = {
        'name': name,
        'email': email,
        'subject': subject,
        'message': message,
        'received_at': datetime.utcnow().isoformat() + 'Z'
    }

    try:
        save_message(entry)
    except Exception as e:
        return jsonify({'ok': False, 'error': 'Failed to save message.'}), 500

    return jsonify({'ok': True, 'message': 'Message received.'})


@app.route('/messages')
def messages():
    # Demo/admin endpoint to view saved messages
    msgs = load_messages()
    return jsonify({'ok': True, 'count': len(msgs), 'messages': msgs})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
