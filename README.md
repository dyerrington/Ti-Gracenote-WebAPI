Gracenote WebAPI for Titanium Mobile
-------------------------------------

So far, this API is in develoment.  Currently implimenting basic functionality but having some very odd issues with the HTTPClient.  You can view more info about the problem here:

http://developer.appcelerator.com/question/147715/unable-to-securely-connect-to-xxxxxx-with-the-latest-tls---using-https


As I get this resolved, I will push more updates.

Thanks!
-Dave

------

Example:

        var gn_webapi   =       require("gn_webapi").gn_webapi;
        var gn_options  =       {
                clientID:       "[get yours from developer.gracenote.com]",
                clientTag:      "[Get yours from developer.gracenote.com]"
        }

        var gn                  =       new gn_webapi(gn_options);
        gn.register();

        ...TBC
