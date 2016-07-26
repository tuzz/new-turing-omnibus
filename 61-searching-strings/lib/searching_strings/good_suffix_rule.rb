class GoodSuffixRule
  def initialize(pattern)
    @pattern = pattern
  end

  def mismatch(char, index)
    t = pattern[(index + 1)..-1].reverse.chars
    remainder = pattern[0..(index - 1)].reverse.chars

    remainder.length.times do |offset|
      remainder.take(offset)

      # TODO
    end
  end
end
