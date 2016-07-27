class BadCharacterRule
  def initialize(pattern)
    self.lookup_table = Hash.new { |k, v| {} }

    pattern.length.times do |i|
      lookup_table[i] = {}

      pattern.chars.uniq.each do |char|
        lookup_table[i][char] = calculate_shift(pattern, char, i)
      end
    end
  end

  def mismatch(char, index)
    lookup_table[index][char] || index + 1
  end

  private

  attr_accessor :lookup_table

  def calculate_shift(pattern, char, index)
    remainder = pattern[0..(index - 1)].reverse
    match = remainder.index(char)
    match + 1 if match
  end
end
