# Web Server File Uploader

I created this project as an easy way for me to transfer files between my Raspberry Pi and other devices, but you can of course do this with any web server.

## Authentication

As implementing an entire authentication system for this project seemed a bit overkill, I simply added an `auth_token` query parameter that is required to access the file upload page.

## How to Use

- Create a `.env` file and fill it out like the example.
- Install the necessary packages with `npm install`
- Run the server with `node .`

Your file upload page will now be reachable at:

`http://localhost:PORT/upload?auth_token=YOUR_AUTH_TOKEN`

Or from your web server's IP address as:

`http://SERVER_IP:PORT/upload?auth_token=YOUR_AUTH_TOKEN`

All uploaded files will be stored in the `received` folder.
