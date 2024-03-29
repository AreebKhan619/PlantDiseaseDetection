
# Using Flask to make an api 
# import necessary libraries and functions 
from flask import Flask, request, jsonify
from waitress import serve
from flask_cors import CORS, cross_origin
import os
import uuid
import importlib
from det import detection
from dbactions import addToHistory
# creating a Flask app 
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS']='Content-Type'
  
# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/', methods = ['GET', 'POST'])
# @cross_origin()
def uploadAndDetect(): 
    if(request.method == 'GET'): 
        return jsonify({'data': 'only POST requests allowed on this endpoint'}) 
    else:
        path = os.getcwd()
        # file Upload
        UPLOAD_FOLDER = os.path.join(path, 'imgs')
        # Make directory if "imgs" folder not exists
        if not os.path.isdir(UPLOAD_FOLDER):
            os.mkdir(UPLOAD_FOLDER)

        import tensorflow as tf
        new_model = tf.keras.models.load_model('my_model.h5')
        plant_dict = {'Apple___Apple_scab': 0, 'Apple___Black_rot': 1, 'Apple___Cedar_apple_rust': 2, 'Apple___healthy': 3, 'Blueberry___healthy': 4, 'Cherry_(including_sour)___Powdery_mildew': 5, 'Cherry_(including_sour)___healthy': 6, 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 7, 'Corn_(maize)___Common_rust_': 8, 'Corn_(maize)___Northern_Leaf_Blight': 9, 'Corn_(maize)___healthy': 10, 'Grape___Black_rot': 11, 'Grape___Esca_(Black_Measles)': 12, 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 13, 'Grape___healthy': 14, 'Orange___Haunglongbing_(Citrus_greening)': 15, 'Peach___Bacterial_spot': 16, 'Peach___healthy': 17, 'Pepper,_bell___Bacterial_spot': 18, 'Pepper,_bell___healthy': 19, 'Potato___Early_blight': 20, 'Potato___Late_blight': 21, 'Potato___healthy': 22, 'Raspberry___healthy': 23, 'Soybean___healthy': 24, 'Squash___Powdery_mildew': 25, 'Strawberry___Leaf_scorch': 26, 'Strawberry___healthy': 27, 'Tomato___Bacterial_spot': 28, 'Tomato___Early_blight': 29, 'Tomato___Late_blight': 30, 'Tomato___Leaf_Mold': 31, 'Tomato___Septoria_leaf_spot': 32, 'Tomato___Spider_mites Two-spotted_spider_mite': 33, 'Tomato___Target_Spot': 34, 'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 35, 'Tomato___Tomato_mosaic_virus': 36, 'Tomato___healthy': 37}
        reversed_plant_dict = {value : key for (key, value) in plant_dict.items()}
        new_model.summary()


        from datetime import datetime
        
        uploaded_files = request.files.getlist("image")
        final = []
        historyArray = []
        for file in uploaded_files:
            file.save(os.path.join(UPLOAD_FOLDER, file.filename))
            jshawn = {
                "name":file.filename,
                "result":detection(file.filename, new_model, reversed_plant_dict)
            }
            mongodoc = {
                "name" : jshawn.get('name'),
                "type" : jshawn.get('result').get('type'),
                "status" : jshawn.get('result').get('status'),
                "percentage" : jshawn.get('result').get('percentage'),
                "date": datetime.today().strftime('%d-%m-%Y')
            }
            historyArray.append(mongodoc)
            final.append(jshawn)
        
        addToHistory(request.form['user_id'],historyArray)
            
        print('File(s) successfully uploaded')
        print(uploaded_files)

        # return "Hello World"
        return jsonify({'res':final})


        # return jsonify({'filename':f_name})

@app.route('/scrape', methods = ['POST'])
def scrappo():
    from search import scrape_search
    plant = request.json['plant']
    disease = request.json['disease']
    return scrape_search(disease + ' in ' + plant + ' treatment')
    
@app.route('/login', methods = ['POST'])
def login():
    from dbactions import find
    username = request.json['username']
    try:
        ret = (find(username))
        if(ret.get('password')==str(request.json['password'])):
            return jsonify({'message':"Login Success","userId":ret.get('_id')}), 200
        else:
            return jsonify({'message':"Wrong Password"}), 401
    except:
        return {'message':"User doesn't exist"}, 401
    
    
@app.route('/getHistory', methods = ['POST'])
def historee():
    from dbactions import getHistory
    import base64
    user_id = request.json['user_id']
    try:
        ret = (getHistory(user_id))
        his = ret.get('history')
        for h in his:
            # print(h.get('name'))
            with open(os.getcwd()+"/imgs/"+h.get('name'), "rb") as image_file:
                # print(h.get('name'))
                encoded_string = base64.b64encode(image_file.read())
                h['imgURL']=str(encoded_string)
        # # print(his)
        # # print((os.path.join(os.path.join(os.getcwd(),'imgs')),h.get('name')))
        # for h in his:
        #     path = (((os.path.join(os.path.join(os.getcwd(),'imgs'),h.get('name')))))
        #     print(path)
        #     with open(path, "rb") as image_file:
        #         encoded_string = base64.b64encode(image_file.read())
        #         # h['imgURL']=str(encoded_string)
        #         h['imgURL']="bruh"

        # print(his)
        
        # print("******",jsonify(his))
        return {'result':his}
    except Exception as e:
        return {'message':e}

    
# A simple function to calculate the square of a number 
# the number to be squared is sent in the URL when we use GET 
# on the terminal type: curl http://127.0.0.1:5000 / home / 10 
# this returns 100 (square of 10) 

# @app.route('/home/<int:num>', methods = ['GET']) 
# def disp(num): 
  
#     return jsonify({'data': num**2}) 
  
  
# driver function 

# serve(app, host='0.0.0.0', port=5000, threads=1) #WAITRESS!


if __name__ == '__main__': 
    app.run(debug = True) 
    