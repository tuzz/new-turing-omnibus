class GoodSuffixRule
  attr_accessor :lookup_table

  def initialize(pattern)
    self.lookup_table = {}

    right_to_left = pattern.reverse.chars
    remaining = right_to_left.dup

    t = [remaining.shift]
    nonterminal = right_to_left[1..-1]
    i = 0

    while i < pattern.length && t.length <= pattern.length do
      overlap = nonterminal[i..(i + t.length - 1)]
      pairs = overlap.zip(t)
      all_match = pairs.any? && pairs.all? { |(l, r)| l == r }

      if all_match
        lookup_table[pattern.length - t.length - 1] = i + 1
        t.push(remaining.shift)
      else
        i += 1
      end
    end

    (pattern.length - 1).times do |j|
      lookup_table[j] ||= pattern.length
    end
  end

  def mismatch(_char, index)
    lookup_table.fetch(index, 1)
  end
end
