import os
import urllib2
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

class DNSupdater(webapp.RequestHandler):
  def get (self, cloudflare_email, cloudflare_api, cloudflare_hostname):
	ip = self.request.remote_addr
	cloudflare = 'https://www.cloudflare.com:443/api_json.html'
	request = urllib2.Request(cloudflare + '?a=DIUP&hosts=' + cloudflare_hostname + '&u=' + cloudflare_email + '&tkn=' + cloudflare_api + '&ip=' + ip)
	rc = urllib2.urlopen(request)

def main():
	application = webapp.WSGIApplication([('/update/([^/]+)/([^/]+)/([^/]+)', DNSupdater)], debug=True)
	util.run_wsgi_app(application)

if __name__ == '__main__':
	main ()
