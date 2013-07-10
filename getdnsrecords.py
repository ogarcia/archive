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

	template_values = {
            'cfjson': rc.read(),
            }

	path = os.path.join(os.path.dirname(__file__), 'getdnsrecords.html')
	self.response.out.write(template.render(path, template_values))

def main():
	application = webapp.WSGIApplication([('/getdnsrecords/([^/]+)/([^/]+)/([^/]+)', getDNSrecords)], debug=True)
	util.run_wsgi_app(application)

if __name__ == '__main__':
	main ()
