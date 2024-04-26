// import
function findAllCollection(collection_name) {
  const records = $app.dao().findCollectionByNameOrId(collection_name);
  return [records];
};

function findSingleCollection(collection_name, record_id) {
  const record = $app.dao().findRecordById(collection_name, record_id);
  return record;
};

function createRecord(collection, data){
    const foundCollection = $app.dao().findCollectionByNameOrId(collection);
    const record = new Record(foundCollection, data);
    $app.dao().saveRecord(record);
};

// register a new "./pocketbase import /path/to/data.json" command
$app.rootCmd.addCommand(new Command({
    use: "import_csv",
    run: (cmd, args) => {
        if (args.length < 2) {
          console.log('Example: pocketbase import_csv myfile.csv pocketbase_collection_name')
          return
        }
        console.log('Running...');
        console.log(`Checking if -  ${args[1]} - Collection Exists...`);
        let collection_name = args[1]
              // check if collection exists
              try {
                  $app.dao().findCollectionByNameOrId(collection_name)
                  console.log(`collection ${collection_name} already exists`)
              } catch (e_ok) {
                  console.log(`collection ${collection_name} doesn't exist -- this is good`)
              }
        let filePath = `${__hooks}/${args[0]}`;
  			const file = String.fromCharCode.apply(null, $os.readFile(filePath));
  			// console.log('file: ', file)
        console.log(`Importing CSV...${filePath}`);
        let CSVToJSON = csv => {
        let lines = csv.replaceAll('ï»¿','').replaceAll('\r','').split('\n');
        let keys = lines[0].split(',');
          return lines.slice(1).map(line => {
              return line.split(',').reduce((acc, cur, i) => {
                  const toAdd = {};
                  toAdd[keys[i]] = cur;
                  return { ...acc, ...toAdd };
              }, {});
          });
        };
        let data = [];
        console.log(`Converting CSV: ${filePath} to JSON...`);
        let cleanJSONdata = CSVToJSON(file).map( (d) => JSON.stringify(d) );
        cleanJSONdata.map( (d) => data.push(JSON.parse(d)) );
        // drop last empty entry in the obj
        data.pop()
        console.log(`Importing ${filePath} to pocketbase...`);
         data.forEach((record, i) => {
           if (i > 0 ) {
           console.log( `${i} of ${data.length}`);
           console.log( JSON.stringify(record) );
           createRecord(collection_name, record )
           }
         });
        console.log('Done.');
    },
}));

$app.rootCmd.addCommand(new Command({
    use: "import_json",
    run: (cmd, args) => {
        if (args.length < 2) {
          console.log('Example: pocketbase import_json myfile.json pocketbase_collection_name')
          return
        }
        console.log('Running...');

        console.log(`Checking if -  ${args[1]} - Collection Exists...`);
        let collection_name = args[1]
              // check if collection exists
              try {
                  $app.dao().findCollectionByNameOrId(collection_name)
                  console.log(`collection ${collection_name} already exists`)
              } catch (e_ok) {
                  console.log(`collection ${collection_name} doesn't exist -- this is good`)
              }
        let filePath = `${__hooks}/${args[0]}`;
  			const file = String.fromCharCode.apply(null, $os.readFile(filePath));
  			// console.log('file: ', file)
        console.log(`Importing ${filePath} to pocketbase...`);
         data.forEach((record, i) => {
           if (i <0 ) {
             // if you need to see what is being sent to be inserted uncomment this
             // console.log( record[i] );
             createRecord(collection_name, record )
           }
         });
        console.log('Done.');
    },
})); 
