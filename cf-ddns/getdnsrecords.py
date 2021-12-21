import os
import urllib2
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

class getDNSrecords(webapp.RequestHandler):
    def get (self, api_key, email, zone):
        cf = 'https://www.cloudflare.com:443/api_json.html'
        request = urllib2.Request(cf + '?a=rec_load_all&tkn=' + api_key + '&email=' + email + '&z=' + zone)
        request.add_header('Accept', 'text/*')

        try:
          rc = urllib2.urlopen(request)

          template_values = {'cfjson': rc.read(),}

          path = os.path.join(os.path.dirname(__file__), 'fancyjson.html')
          self.response.headers['Content-Type'] = 'text/html'
          self.response.out.write(template.render(path, template_values))

        except urllib2.HTTPError, e:
            self.response.headers['Content-Type'] = 'text/html'
            self.response.set_status(403)
            self.response.out.write(e.fp.read().replace("/cdn-cgi","https://www.cloudflare.com/cdn-cgi"))

def main():
    application = webapp.WSGIApplication([('/getdnsrecords/([^/]+)/([^/]+)/([^/]+)', getDNSrecords)], debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main ()
