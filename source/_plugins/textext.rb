require 'kramdown'

module Jekyll
  class TextExtGenerator < Generator
    safe false
    
    def generate(site)
    end
  end

  class Site
    alias jekyll_process process
    alias jekyll_render render

    def render
      # sort pages by title
      @pages.sort! do |p1, p2|
        p1 = p1.data['title']
        p2 = p2.data['title']
        if p1 == p2
          0
        else
          p1 > p2 ? 1 : -1
        end
      end

      jekyll_render
    end

    def process
      jekyll_process

      from = File.expand_path(config['textext'])
      to   = File.expand_path(config['destination'] + '/textext')
      `ln -s \"#{from}\" \"#{to}\"`
      puts "Created TextExt symlink"
    end
  end
end

