# _plugins/pages_link_override.rb
# Jekyll::Hooks.register :pages, :pre_render do |page, payload|
#     basename = File.basename(page.path, File.extname(page.path))
#     page.data['permalink'] = "/#{basename}.html"
#   end

#   Although page links are set in _config.yml, it could be overwritten on the page level
#   Therefore I will be overriding the link using this plugin

#   _config.yml says:
# - scope:
# path: ''
# type: 'pages'
# values:
# permalink: /:basename.html