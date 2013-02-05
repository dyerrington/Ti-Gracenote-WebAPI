
var exports = exports || this;

exports.gn_webapi = (function(global) {
	
	Ti.API.info('You bet your ass we loaded the module!');
	
	//var K = function(){}, isAndroid = Ti.Platform.osname === "android", jsOAuth = require('jsOAuth-1.3.1');
  
	var gn_webapi = function(options) {
		
		Ti.API.info("We're also doing stuff to the constructor..");
		
	    var self;
	    
	    if (this instanceof gn_webapi) {
	    	self = this;
	    }
	    
	    if (!options) { options = {}; }
	    
	    self.options	=	{
	    	clientID: 	null,
	    	clientTag:	null,
    		userID:		null,
    		apiURL:		"https://%s.web.cddbp.net/webapi/xml/1.0/",
    		queries:	{
    			
    			register: {
    				QUERIES: {
    					QUERY: {
	    					'@CMD': 'REGISTER',
	    					CLIENT: '%s-%s'
    					}
    				}
    			}
    			
    		}
	    };
	    
	    // set options
	    for(i in options) {
	    	
	    	if(!self.options[i]) {
	    		self.options[i]
	    	}
	    	
	    	self.options[i]	=	options[i];
	    	Ti.API.info(self.options[i]);
	    }
	    
	    // utility method for handling XML string creation
	    self.json2xml = function(o, cmd, tab) {
	    	
			var toXml = function(v, name, ind, cmd) {
				
				var xml = "";
				
				if (v instanceof Array) {
				
					for (var i=0, n=v.length; i<n; i++) {
				    	xml += ind + toXml(v[i], name, ind+"\t") + "\n";
				    }
				    
				} else if (typeof(v) == "object") {
					
					var hasChild =	false;
				    xml 		+= 	ind + "<" + name;
				    
				    for (var m in v) {
				    	
				    	if (m.charAt(0) == "@") {
				      		xml 	+= 	" " + m.substr(1) + "=\"" + v[m].toString() + "\"";
				        } else {
				           	hasChild =	true;
				        }
				    }
				         
				    xml	+= hasChild ? ">" : "/>";
				    
				   	if (hasChild) {
				   		
				    	for (var m in v) {
				    		
				            if (m == "#text") {
				            	xml	+=	v[m];
				            } else if (m == "#cdata") {
				             	xml	+=	"<![CDATA[" + v[m] + "]]>";
				            } else if (m.charAt(0) != "@") {
				              	xml	+=	toXml(v[m], m, ind+"\t");
				            }
				        }
				        
				        xml	+=	(xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
				    }
				    
				} else {
					xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
				}
				
				return xml;
				
			}, xml="";
			
			for (var m in o) {
				xml += toXml(o[m], m, "");
			}
			
			return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
		}
	    
	    self.get_api_url = function() {
	    	
	    	try {
		    	var url	=	String.format(self.options['apiURL'], self.options['clientID'], self.options['clientTag']);
		    	return url;
	    	} catch (err) {
    			Ti.API.error(err);
			}
	    }
	    	
	    self.register		=	function() {
		    
			var xhr 	= 	Ti.Network.createHTTPClient({
				
				validatesSecureCertificate: false,	
			    onload: function(e) {
					// this function is called when data is returned from the server and available for use
			        // this.responseText holds the raw text return of the message (used for text/JSON)
				    // this.responseXML holds any returned XML (including SOAP)
				    // this.responseData holds any returned binary data
			        Ti.API.info('RAW ='+this.responseText);
			      	alert(e.responseText);
			        alert('success');
			    },
			    
			    success: function(response) {
                	var data = response.text;
        			alert(data);
        		},
        		
			    onerror: function(e) {
					// this function is called when an error occurs, including a timeout
			        Ti.API.info(e.error);
			        alert('error');
			    },
			    
			   timeout:5000  /* in milliseconds */
			  
			});
			
			// Update client parameters
			self.options.queries
				.register
					.QUERIES
					.QUERY
					.CLIENT	=	String.format(
									self.options.queries.register.QUERIES.QUERY.CLIENT, 
									self.options['clientID'], self.options['clientTag']
								);
								
			var apiURL	=	self.get_api_url();
			xhr.open("POST", apiURL);
			Ti.API.info(self.json2xml(self.options.queries['register']));
			xhr.send(self.json2xml(self.options.queries['register']));  // request is actually sent with this statement
		}

		
		return self;
	    
 	};
 	
 	return gn_webapi;
 	
})(this);;