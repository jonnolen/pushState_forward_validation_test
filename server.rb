require 'rubygems'
require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/streaming'
require 'json'
require 'open-uri'

class TestServer < Sinatra::Base
  self.app_file = __FILE__
  
  configure :development do
    use Rack::Logger
    set :logging, true
    puts "configuring development"
    register Sinatra::Reloader    
  end

  configure do
    puts "general config"
    set :logging, true
    set :dump_errors, true    
  end
  
  helpers do    
    def logger
      return request.logger
    end 
  end

  get '/' do    
    puts "index?  what the what?"
    erb :index
  end 

  post '/' do
    puts "got here"
    content_type "text/javascript"   
    @advance = (params[:valid] == "true")
    erb :new
  end
  
  #start the server if ruby file executed directly
  run! if app_file == $0
end


