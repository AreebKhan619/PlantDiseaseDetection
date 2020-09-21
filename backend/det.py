from flask import jsonify
# from  tensorflow.keras.models import Sequential
# from  tensorflow.keras.layers import Convolution2D
# from  tensorflow.keras.layers import MaxPooling2D
# from  tensorflow.keras.layers import Flatten
# from  tensorflow.keras.layers import Dense              
# from  tensorflow.keras.layers import Dropout
import tensorflow as tf

# import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image
import numpy as np

def detection(fname, new_model, reversed_plant_dict):
	print("The file name given to me was")
	print(fname)
	# return jsonify({'filename':fname})

	image_path = './imgs/'+fname
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

	return json
