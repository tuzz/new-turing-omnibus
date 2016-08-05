module BoyerMoore
  module_function

  def search(text, pattern)
    bad_character_rule = BadCharacterRule.new(pattern)
    good_suffix_rule = GoodSuffixRule.new(pattern)

    text = text.chars if text.respond_to?("chars")
    pattern = pattern.chars

    position = 0
    matches = []

    while position < text.length - pattern.length do
      j = pattern.length - 1
      i = position + j
      char = nil

      while j >= 0 do
        char = text.fetch(i)

        if char == pattern[j]
          matches.push(i) if j.zero?

          i -= 1
          j -= 1
        else
          break
        end
      end

      position += [
        bad_character_rule.mismatch(char, j),
        good_suffix_rule.mismatch(char, j),
      ].max
    end

    matches
  end
end
