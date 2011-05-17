# Pervasive
Pervasive is a simple prototype of a distributed and asynchronous resource dispatcher In order to use it you
need to have node.js installed. 

##Node.js Installation

<pre><code>
Go to http://nodejs.org/ for more information about Node.js and its installation.

If you are on Mac OS X and using homebrew as your package manager, [sudo] brew install node should do. You
should also install npm, the node.js package manager.
</code></pre>

##App Usage
<pre><code>
To use our small app, first start the web server node ad_server

Then start the clients that will eventually receive the resources. As an example we open an nc connection
as follows nc localhost prt_number (see the code for the right port numbers)

Finally open a Web connection as follows:
curl -d "topic=val&topic=val&file_name=myres" localhost:8080 (the web server is running on port 8080)

the resource in the file myres will be sent to the clients you created earlier if they registered for the
right topic
</code></pre>

### Author

José G. Quenum