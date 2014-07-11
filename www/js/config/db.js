var obj_db = {
	db: null,
	data: null,	//data to insert, update, delete
	data_result : null,
	is_resetDatabase : false,
	information : window.database,
	openDatabase: function(reOpen)
	{
		if (window.is_device){
			if (this.db == null || reOpen)
			{
				this.db = window.openDatabase(this.information.name, this.information.version, this.information.displayname, this.information.size);			
			}	
		}
		
	},
	runCreateTables: function()
	{
		if (window.is_device){
			if (obj_db.db != null)
			{
				obj_db.db.transaction(obj_db.createTables, obj_db.createTablesError, obj_db.createTablesSuccess);	
			}
			else
			{
				alert("Error connect database");
			}
		}
	},
	createTables: function(tx)
	{
		if (obj_db.is_resetDatabase)
		{
			tx.executeSql('DROP TABLE IF EXISTS sponsors');
	    	tx.executeSql('CREATE TABLE IF NOT EXISTS sponsors (id unique, image)');
	    	obj_db.is_resetDatabase = false;
		}
		
	},
	createTablesSuccess: function()
	{
		console.log("Obj_DB: create table success");

	},
	createTablesError: function(err)
	{
		console.log("Obj_DB: create table error");
		console.log("Error processing SQL: "+err.code);
	},
	runQuery: function()
	{
		if (window.is_device){
			if (obj_db.db != null)
			{
				obj_db.db.transaction(obj_db.queryDB, obj_db.queryError);	
			}
			else
			{
				alert("Error connect database");
			}
		}
	},
	queryDB: function(tx) {
        tx.executeSql('SELECT * FROM sponsors', [], obj_db.querySuccess, obj_db.queryError);
    },
    querySuccess: function (tx, results) {
        //console.log("Returned rows = " + results.rows.length);
        obj_db.data_result = results;
        console.log(results);
        // this will be true since it was a select statement and so rowsAffected was 0
        // if (!results.rowsAffected) {
        //     console.log('No rows affected!');
        //     return false;
        // }
        // for an insert statement, this property will return the ID of the last inserted row
        //console.log("Last inserted row ID = " + results.insertId);
    },
    queryError: function (err) {
        console.log("Error processing SQL: "+err.code);
    },
    runInsertDB: function()
    {
    	if (window.is_device){
			if (obj_db.db != null)
			{
				obj_db.db.transaction(obj_db.insertDB, obj_db.insertError, obj_db.insertSuccess);	
			}
			else
			{
				alert("Error connect database");
			}
		}
    },
    insertDB : function(tx){
    	for (var i= 0; i < obj_db.data.length ; i++)
    	{
    		tx.executeSql('INSERT INTO sponsors (id, image) VALUES ("'+obj_db.data[i].id+'", "'+obj_db.data[i].image+'")');	
    	}
    },
    insertSuccess: function()
	{
		console.log("Obj_DB: insert success");

	},
	insertError: function(err)
	{
		console.log("Obj_DB: insert error");
		console.log("Error processing SQL: "+err.code);
	},







}