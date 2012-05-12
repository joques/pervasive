# Pervasive 

Pervasive is a simple prototype of a distributed and asynchronous resource dispatcher. The typical scenario is as follows. A user submits a
resource to Pervasive indicating the topics that resource is related to as well as the name of the file, where the content of the resource is
stored. Pervasive then identifies the devices, which might be interested in displaying the resource.<br/>

Pervasive is implemented in Node.js (using both javascript and coffeescript)

# Node.js Installation

Go to http://nodejs.org/ for more information about Node.js and its installation.

### Quick tip

If you are on Mac OS X and using homebrew as your package manager, the following command should do.

### Cloning the repository

When cloning the repository, make sure to include the submodules (with the right versions).

<pre><code>
[sudo] brew install node
</code></pre>

You should also install npm, the node.js package manager.

# App Usage
To use our small app, first start the web server 
<pre><code>
	node pervasive_server_ws or
	node pervasive_server_tcp
</code></pre>

At this point, you have two choices:

*	Either use a TCP connection between the devices and Pervasive
*	Or use WebSockets

## Pervasive with TCP connection

The TCP version of Pervasive requires to use the file local_manager_tcp instead of local_manager. In that case you need to start the devices
as TCP connections. You could use Telnet or netcat. Below, is an example with netcat.

<pre><code>
	nc localhost prt_number
</code></pre>

## Pervasive with WebSockets

Here, you don't have to do anything. The devices will be created for you automatically and the connections established as well.

Finally, open a Web connection as follows. Here again you can just do if from the terminal with curl. 

<pre><code>
curl -d "topic=val&topic=energy&file_name=ad1.txt" localhost:8080 (the web server is running on port 8080)
</code></pre>

The resource will be assigned depending on the topics and the content of the file ads/myres will be sent to the devices too.

# Coffee Script

Who can really resist coffeescript these days? There is a coffee-script port of Pervasive coming out soon. The new coffeescript port is available in pervasive_coffee

### Author

José G. Quenum
