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

  class DocTag < Liquid::Tag
    def initialize(tag_name, args, tokens)
      super

      parts = args.strip.split(/, /)
      @file = parts[0]
      @selector = parts[1]
      @selector_regex = /@id (#{Regexp.escape(@selector)})/
    end

    def render(context)
      full_path = File.expand_path('../jquery-textext/src' + '/' + @file)
      source = File.read(full_path)
      match = source.match(@selector_regex)

      return "<p>`#{@selector}` not found in `#{full_path}`</p>" unless match

      pos       = match.pre_match.length
      left_pos  = pos - match.pre_match.reverse.index('**/')
      right_pos = pos + match.to_s.length + match.post_match.index('*/')
      comments  = source[left_pos, right_pos - left_pos]

      # clean up indents and `*` at the begining of each line
      lines = comments.lines.entries
      lines.reject! { |line| line == '/**' or line == '*/' }
      lines.map! { |line| line.sub(/^\s*\*\s/, '') }

      comments = ''
      line_index = 0

      # grab all lines up until the first javadoc argument
      lines.each do |line|
        break if line =~ /^@\w+/
        line_index += 1
        line = "\n" if line.strip == ''
        comments << line
      end

      # all remaining lines are javadoc params
      params = lines[line_index, lines.length - line_index]

      doc = Kramdown::Document.new(comments, :auto_ids => false, :footnote_nr => 1)
      doc.to_html
    end
  end

end

Liquid::Template.register_tag('doc', Jekyll::DocTag)

