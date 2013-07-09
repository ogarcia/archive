import os
import urllib2
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

class getDNSrecords(webapp.RequestHandler):
  def get (self, api_key, email, zone):
	cf = 'https://www.cloudflare.com:443/api_json.html'
	request = urllib2.Request(cf + '?a=rec_load_all&tkn=' + api_key + '&email=' + email + '&z=' + zone)
	rc = urllib2.urlopen(request)
	self.response.write("""
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>CloudFlare Dynamic DNS</title>
    <link rel="stylesheet" href="/css/jsoneditor.css"/>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/jquery.jsoneditor.min.js"></script>
</head>
<body>
    <div id="cfjson" class="json-editor"></div>
    <script>
""" + "var cfjson = " + rc.read() + ";" + """
    $('#cfjson').jsonEditor(cfjson);
    </script>
</body>
</html>
""")

def main():
	application = webapp.WSGIApplication([('/getdnsrecords/([^/]+)/([^/]+)/([^/]+)', getDNSrecords)], debug=True)
	util.run_wsgi_app(application)

if __name__ == '__main__':
	main ()
