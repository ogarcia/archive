import os
import urllib2
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

class setDNSrecord(webapp.RequestHandler):
    def get (self, api_key, id, email, zone, name):
        content = self.request.remote_addr
        cloudflare = 'https://www.cloudflare.com:443/api_json.html'
        request = urllib2.Request(cloudflare + '?a=rec_edit&tkn=' + api_key + '&id=' + id + '&email=' + email + '&z=' + zone + '&content=' + content + '&type=A&service_mode=0&ttl=1&name=' + name)
        rc = urllib2.urlopen(request)

        template_values = {'cfjson': rc.read(),}

        path = os.path.join(os.path.dirname(__file__), 'fancyjson.html')
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write(template.render(path, template_values))

def main():
    app = webapp.WSGIApplication([('/setdnsrecord/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)',setDNSrecord)], debug=True)
    util.run_wsgi_app(app)

if __name__ == '__main__':
    main ()
