const fs = require("fs");

// npm package 'uuid' for primary key
const { v4: uuidv4 } = require('uuid');

// ROUTING
module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (request, response) => {
        
        // Read db.json  
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        
        
        response.json(data);
    });


    // API POST Request
    app.post("/api/notes", (request, response) => {

        // Extracted new note from request body.  
        const newNote = request.body;
    
        // use uuid to create a primary key
        newNote.id = uuidv4();

        // Read data db.json
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        // pushing new note
        data.push(newNote);

        // Write notes to db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        

        
        response.json(data);
    });


    // API DELETE request
    app.delete("/api/notes/:id", (request, response) => {

        // use id to delete
        let noteId = request.params.id.toString();
        

      
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // filter data to get notes except the one to delete
        const newData = data.filter( note => note.id.toString() !== noteId );

        // Write new data
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        

        // Send response
        response.json(newData);
    });
};
