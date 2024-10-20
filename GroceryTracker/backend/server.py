from flask import Flask, jsonify, request
from flask_cors import CORS
from main import food_expiration, generate_recipe
import base64
import os

# Initializing flask app
app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/')
def hello_world():
    return "hello world!"

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        print('hi')
        data = request.get_json()
        image_base64 = data['image']
        image_data = base64.b64decode(image_base64)

        filename = 'image.jpg'
        with open(filename, 'wb') as f:
            f.write(image_data)
        
        return jsonify({'message': 'Upload success!'}), 200
    except Exception as e:
        return jsonify({'error', str(e)}), 500


@app.route('/generate_recipe/<s>', methods=['GET'])
def script0(s):
    print("generating recipes...")
    result = generate_recipe(s)
    return result

@app.route('/food_expiration/<s>', methods=['GET'])
def script1(s):
    print("generating food expiration times...")
    result = food_expiration(s)
    return result

    
# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# cors = CORS(app, origins='*')

# @app.route('/')
# def hello_wrld():
#     return jsonify({"output": ["a", "b", "c"]})

# @app.route('/api/data')
# def hello_world():
#     print('asdf')
#     return jsonify({"output": ["a", "b", "c"]})

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)