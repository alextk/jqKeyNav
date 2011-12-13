require 'rubygems'
gem 'rego-ruby-ext'
require "rego-ruby-ext"
gem 'rego-js-builder'
require "rego-js-builder"
gem 'rake-hooks'
require 'rake/hooks'

project = JsProjectBuilder.new(
  :name => 'jqKeyNav',
  :description => 'jQuery plugin for keyboard navigation events binding',
  :file_name => 'jquery.keynav.js',
  :js_files => %w{keynav.js}
)
JsProjectBuilder::Tasks.new(project)


# for spec testing
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  puts "---\nERROR: Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine\n---\n"
end
