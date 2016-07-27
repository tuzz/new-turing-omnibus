$LOAD_PATH.unshift("lib")

require "searching_strings"

shakespeare = File.read("shakespeare.text")
pattern = ARGV.first || "the question"
text = Text.new(shakespeare)

puts "Searching for '#{pattern}' in the complete works of Shakespeare..."
matches = BoyerMoore.search(text, pattern)

YELLOW = "\e[33m"
RESET = "\e[0m"

puts
matches.each.with_index do |i, n|
  before = shakespeare[(i - 40)..(i - 1)]
  after = shakespeare[(i + pattern.length)..(i + pattern.length + 40)]
  fragment = "#{before}#{YELLOW}#{pattern}#{RESET}#{after}".gsub(/[\n\r]/, " ")

  puts "#{n + 1}) #{fragment}"
end

puts "No matches found." if matches.empty?
print "\nCompared #{text.number_of_fetches} characters of a possible #{text.length}"
puts " (#{(text.number_of_fetches.to_f / text.length * 100).round(1)}%)"
