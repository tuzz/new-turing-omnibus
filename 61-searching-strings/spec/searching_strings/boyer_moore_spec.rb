require "spec_helper"

RSpec.describe BoyerMoore do
  it "works for the example in the video" do
    text = Text.new("GTTATAGCTGATCGCGGCGTAGCGGCGAA")
    matches = described_class.search(text, "GTAGCGGCG")

    expect(matches).to eq([18])
    expect(text.number_of_fetches).to be < text.length,
      "The number of comparisons was not sub-linear"
  end

  it "works for multiple needles in a haystack" do
    text = Text.new("NEEDELELNNENEEDLEINAHAYNEEEDNEEDLEEHSTACK")
    matches = described_class.search(text, "NEEDLE")

    expect(matches).to eq([11, 28])
    expect(text.number_of_fetches).to be < text.length,
      "The number of comparisons was not sub-linear"
  end

  it "works for text that doesn't contain a match" do
    text = Text.new("PETERPIPERPICKEDAPECKOFPICKLEDPEPPERS")
    matches = described_class.search(text, "PICNIC")

    expect(matches).to eq([])
    expect(text.number_of_fetches).to be < text.length,
      "The number of comparisons was not sub-linear"
  end


  it "finds matches in a regular String" do
    text = "NEEDELELNNENEEDLEINAHAYNEEEDNEEDLEEHSTACK"
    matches = described_class.search(text, "NEEDLE")

    expect(matches).to eq([11, 28])
  end

  it "finds matches in an Array of characters" do
    text = "NEEDELELNNENEEDLEINAHAYNEEEDNEEDLEEHSTACK".chars
    matches = described_class.search(text, "NEEDLE")

    expect(matches).to eq([11, 28])
  end
end
