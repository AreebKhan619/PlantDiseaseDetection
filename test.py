from flask import jsonify

from  tensorflow.keras.models import Sequential
from  tensorflow.keras.layers import Convolution2D
from  tensorflow.keras.layers import MaxPooling2D
from  tensorflow.keras.layers import Flatten
from  tensorflow.keras.layers import Dense              
from  tensorflow.keras.layers import Dropout
import tensorflow as tf

# import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image
import numpy as np

def detection(fname):
	print("The file name given to me was")
	print(fname)
	# return jsonify({'filename':fname})


	new_model = tf.keras.models.load_model('my_model.h5')



	plant_dict = {'Apple___Apple_scab': 0, 'Apple___Black_rot': 1, 'Apple___Cedar_apple_rust': 2, 'Apple___healthy': 3, 'Blueberry___healthy': 4, 'Cherry_(including_sour)___Powdery_mildew': 5, 'Cherry_(including_sour)___healthy': 6, 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 7, 'Corn_(maize)___Common_rust_': 8, 'Corn_(maize)___Northern_Leaf_Blight': 9, 'Corn_(maize)___healthy': 10, 'Grape___Black_rot': 11, 'Grape___Esca_(Black_Measles)': 12, 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 13, 'Grape___healthy': 14, 'Orange___Haunglongbing_(Citrus_greening)': 15, 'Peach___Bacterial_spot': 16, 'Peach___healthy': 17, 'Pepper,_bell___Bacterial_spot': 18, 'Pepper,_bell___healthy': 19, 'Potato___Early_blight': 20, 'Potato___Late_blight': 21, 'Potato___healthy': 22, 'Raspberry___healthy': 23, 'Soybean___healthy': 24, 'Squash___Powdery_mildew': 25, 'Strawberry___Leaf_scorch': 26, 'Strawberry___healthy': 27, 'Tomato___Bacterial_spot': 28, 'Tomato___Early_blight': 29, 'Tomato___Late_blight': 30, 'Tomato___Leaf_Mold': 31, 'Tomato___Septoria_leaf_spot': 32, 'Tomato___Spider_mites Two-spotted_spider_mite': 33, 'Tomato___Target_Spot': 34, 'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 35, 'Tomato___Tomato_mosaic_virus': 36, 'Tomato___healthy': 37}

	reversed_plant_dict = {value : key for (key, value) in plant_dict.items()}


	new_model.summary()


	
	# image_path = "test1.JPG"
	image_path = fname
	new_img = image.load_img(image_path, target_size=(224, 224))
	img = image.img_to_array(new_img)
	img = np.expand_dims(img, axis=0)
	img = img/255

	print("Following is our prediction:")
	prediction = new_model.predict(img)
	img_class = new_model.predict_classes(img)
	img_prob = new_model.predict_proba(img)

	img_prob = img_prob.flatten()
	[type, status] = (reversed_plant_dict[np.asscalar(img_class)].split('___'))
	json = {
		"type": type,
		"status":status,
		"percentage": img_prob[np.asscalar(img_class)]*100
	}

	print(reversed_plant_dict[np.asscalar(img_class)].split('___'))

	# print('baby', reversed_plant_dict[np.asscalar(img_class)] ,img_prob[np.asscalar(img_class)]*100 )

	# plt.figure(figsize = (4,4))
	# plt.imshow(new_img)
	# plt.axis('off')
	# plt.show()
	
	# return "Hello World"
	return json
