from flask import Flask, jsonify
from flask_cors import CORS
from main import food_expiration, generate_recipe

# Initializing flask app
app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/')
def hello_world():
    return "hello world!"

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