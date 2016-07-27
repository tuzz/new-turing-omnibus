class GoodSuffixRule
  def initialize(pattern)
    self.lookup_table = {}

    pattern.length.times do |i|
      lookup_table[i] = calculate_shift(pattern, i)
    end
  end

  def mismatch(_char, index)
    lookup_table[index] || 1
  end

  private

  attr_accessor :lookup_table

  def calculate_shift(pattern, index)
    t = pattern[(index + 1)..-1].reverse.chars
    nonterminal = pattern[0..-2].reverse.chars

    return 1 if t.empty?

    nonterminal.length.times do |offset|
      overlap = nonterminal[offset..(offset + t.length - 1)]
      pairs = overlap.zip(t)
      return offset if pairs.any? && pairs.all? { |(l, r)| l == r }
    end

    pattern.length
  end
end
