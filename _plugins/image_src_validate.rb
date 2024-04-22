# _plugins/valid_image_source.rb

module Jekyll
    module ValidImageSourceFilter
      def valid_image_source(input)
        if File.exist?(input)
          input
        else
        #   Replace ".png" with ".jpg" in the file path
          input.gsub(".png", ".jpg")
        end
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::ValidImageSourceFilter)
  