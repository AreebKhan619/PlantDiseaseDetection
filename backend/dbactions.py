import pymongo
from bson import ObjectId

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
diseaseDet = myclient["disease_detection_project"]
userTable = diseaseDet["user"]
historyTable = diseaseDet["history"]



def insertion(table, json_doc):
	# mydict = { "name": "John", "address": "Highway 37" }
	x = table.insert_one(json_doc)
	return x


def find(username):
	x = userTable.find_one({'username':username})
	x['_id'] = str(x.get('_id'))
	# x.get
	return x

def getHistory(user_id_string):
	x = historyTable.find_one({'_id':user_id_string})
	return x

def addToHistory(user_id_string, history_array):
	x = historyTable.find_one({'_id':user_id_string})
	if(x):
		temp = x.get('history')
		temp = temp + history_array
		# temp.append(new_json_entry)
		newvalues = { "$set": { "history": temp } }
		return historyTable.update_one({'_id':user_id_string}, newvalues)
	else:
		history_doc = { "_id": user_id_string, "history": history_array }
		return insertion(historyTable,history_doc)
		
	

def saveImageInMongo(path):
	return "hello world"

def getImageFromMongo(image_id):
	outputdata =fs.get(image_id).read() 