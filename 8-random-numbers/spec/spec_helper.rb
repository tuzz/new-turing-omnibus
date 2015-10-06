require "rspec"
require "random_numbers"

RSpec.configure do |config|
  config.color = true
  config.formatter = :doc
  config.disable_monkey_patching!
end
