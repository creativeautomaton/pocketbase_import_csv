# pocketbase_import_csv
A simple file to bulk import csv or json files

in the cli from the directory pocketbase is running from try :

./pocketbase import_csv books.csv books

if the books coleection from the pocketbase admin doesnt have the collection books it should give an error like this,
collection ${collection_name} doesn't exist -- this is good`

if the collection does exite it should say,
collection ${collection_name} already exists`

which is good.


try it only is to grab exports from a admin sql export then quickly import into pocketbase instead of trying to get a json file to work though i have tried to also just add a import_json function to be a bit flexible.
