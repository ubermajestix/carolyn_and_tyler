require 'sass/plugin/rack'

class App
  attr_reader :env
  def initialize
    @env = ENV['RACK_ENV']
    banner
  end

  def banner
    puts "="*45
    puts "Starting app in #{env} environment"
    puts "="*45
  end

  def call(env)
    [ 200, 
      {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/index.html')
    ]
  end
end

Sass::Plugin.options.merge!(:css_location => './public/css/')
use Sass::Plugin::Rack

use Rack::Static, 
  :urls => ["/images", "/js", "/css", "/fonts"],
  :root => "public"

run App.new
