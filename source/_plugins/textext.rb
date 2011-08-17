require 'kramdown'

module Jekyll
  class TextExtGenerator < Generator
    safe false
    
    def generate(site)
    end
  end

  class Site
    alias jekyll_process process
    
    def process
      jekyll_process

      from = File.expand_path(config['textext'])
      to   = File.expand_path(config['destination'] + '/textext')
      `ln -s \"#{from}\" \"#{to}\"`
      puts "Created TextExt symlink"
    end
  end
end

