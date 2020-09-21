
# Using flask to make an api 
# import necessary libraries and functions 
from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import uuid
import importlib
from det import detection
# creating a Flask app 
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS']='Content-Type'
  
# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/', methods = ['GET', 'POST'])
# @cross_origin()
def home(): 
    if(request.method == 'GET'): 
        return jsonify({'data': 'only POST requests allowed on this endpoint'}) 
    else:
        print('**************',request.files)
        file = request.files['image']
        # extension = os.path.splitext(file.filename)[1]
        # f_name = str(uuid.uuid4()) + extension #name of the image file
        # file.save(os.path.join('./imgs/', f_name))
        
        # return detection(f_name)

        print("*********",file,"*********")
        return "Hello World"


        # return jsonify({'filename':f_name})

  
# A simple function to calculate the square of a number 
# the number to be squared is sent in the URL when we use GET 
# on the terminal type: curl http://127.0.0.1:5000 / home / 10 
# this returns 100 (square of 10) 
@app.route('/home/<int:num>', methods = ['GET']) 
def disp(num): 
  
    return jsonify({'data': num**2}) 
  
  
# driver function 
if __name__ == '__main__': 
  
    app.run(debug = True) 