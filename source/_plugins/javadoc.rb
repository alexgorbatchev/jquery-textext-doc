require 'kramdown'

module Jekyll
  class DocTag < Liquid::Tag
    def initialize(tag_name, args, tokens)
      super

      parts           = args.strip.split(/, /)
      @file           = parts[0]
      @selector       = parts[1]
      @selector_regex = /@id (#{Regexp.escape(@selector)})/
    end

    def kramdown(source)
      Kramdown::Document.new(source, :auto_ids => false, :footnote_nr => 1).to_html
    end

    def extract_comments_from_file(file_path, selector_regex)
      # TODO use config to get the path
      full_path = File.expand_path('../jquery-textext/src' + '/' + file_path)
      source    = File.read(full_path)
      match     = source.match(@selector_regex)

      return "<p>`#{@selector}` not found in `#{full_path}`</p>" unless match

      pos       = match.pre_match.length
      left_pos  = pos - match.pre_match.reverse.index('**/')
      right_pos = pos + match.to_s.length + match.post_match.index('*/')

      source[left_pos, right_pos - left_pos]
    end

    def get_tags(lines)
      line_index = 0

      # find the first line which has a javadoc tag, assume all lines after
      # that are also tags
      lines.each do |line|
        break if line =~ /^@\w+/
        line_index += 1
      end

      # all remaining lines are javadoc tags
      lines = lines[line_index, lines.length - line_index]
      tags = []
      param_regex = /^@(\w+)(\s+(.*))?$/

      lines.each do |line|
        match = line.match(param_regex)

        if match
          tags << {
            :name => match[1],
            :value => (match[3] || '').rstrip
          }
        else
          tags.last[:value] << line.rstrip if tags.length > 0
        end
      end

      hash = {}

      tags.each do |tag|
        name = tag[:name].to_sym

        tag[:value] = kramdown(tag[:value].strip) if name == 'param'

        current = hash[name]
        if current
          hash[name] = [ current ] unless current.is_a?(Array)
          hash[name] << tag[:value]
        else
          hash[name] = tag[:value]
        end
      end

      hash
    end

    def get_description(lines)
      description = ''

      # grab all lines up until the first javadoc argument
      lines.each do |line|
        break if line =~ /^@\w+/
        # make sure we don't miss significant empty lines
        line = "\n" if line.strip == ''
        description << line
      end

      kramdown(description)
    end

    def get_comments_block(file_path, selector_regex)
      comments = extract_comments_from_file(file_path, selector_regex)

      # clean up indents and `*` at the begining of each line
      lines = comments.lines.entries
      lines.reject! { |line| line == '/**' or line == '*/' }
      lines.map! { |line| line.sub(/^\s*\*\s/, '') }

      {
        :description => get_description(lines),
        :tags => get_tags(lines)
      }
    end

    def render(context)
      comments = get_comments_block(@file, @selector_regex)
      comments[:description]
    end
  end

  class DocOptTag < DocTag
    def render(context)
      comments = get_comments_block(@file, @selector_regex)

      "<div class=\"option\">" +
        "<h4>#{comments[:tags][:name]} <span class=\"default\">(#{comments[:tags][:default]})</span></h4>" +
        comments[:description] +
      "</div>"
    end
  end

  class DocEventTag < DocTag
    def render(context)
      comments = get_comments_block(@file, @selector_regex)

      "<div class=\"event\">" +
        "<h4>#{comments[:tags][:name]}</h4>" +
        comments[:description] +
      "</div>"
    end
  end

  class DocMethodTag < DocTag
    def render(context)
      comments = get_comments_block(@file, @selector_regex)

      "<div class=\"method\">" +
        "<h4>#{comments[:tags][:signature]}</h4>" +
        comments[:description] +
      "</div>"
    end
  end
end

Liquid::Template.register_tag('doc'        , Jekyll::DocTag)
Liquid::Template.register_tag('doc_opt'    , Jekyll::DocOptTag)
Liquid::Template.register_tag('doc_event'  , Jekyll::DocEventTag)
Liquid::Template.register_tag('doc_method' , Jekyll::DocMethodTag)

