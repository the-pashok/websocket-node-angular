###### **Task :**
1. Create an Angular application
2. Create a Node.js application
3. Angular application has a text input field with a button and a text field to display
4. If the user presses the button the entered text is sent to the Node.js application
5. the Node.js application echos the received text as an inverted String via websocket back to the frontend
6. the frontend displays the data send via websocket in the second text field
7. Provide whole application backend and frontend as a docker compose setup.

###### **How to setup project**

**Download archive file or clone the repository**
-     git clone https://github.com/the-pashok/websocket-node-angular.git

**Install all the required packages**
-     cd test-task/client && npm install
-     cd test-task/server && npm install

**Build a project**
-     cd test-task/client && ng build

**Run local server**
-     cd test-task/server && nodemon main.js

You can view the result on http://localhost:3000
