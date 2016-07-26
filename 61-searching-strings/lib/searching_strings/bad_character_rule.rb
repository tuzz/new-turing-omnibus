class BadCharacterRule
  def initialize(pattern)
    self.lookup_table = {}

    ("A".."Z").each do |char|
      lookup_table[char] = {}

      pattern.length.times do |i|
        lookup_table[char][i] = calculate_shift(pattern, char, i)
      end
    end
  end

  def mismatch(char, index)
    lookup_table[char][index]
  end

  private

  attr_accessor :lookup_table

  def calculate_shift(pattern, char, index)
    remainder = pattern[0..(index - 1)].reverse
    match = remainder.index(char)

    if match
      match + 1
    else
      remainder.length + 1
    end
  end
end
