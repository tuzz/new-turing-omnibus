require "spec_helper"

RSpec.describe BadCharacterRule do
  subject { described_class.new("CCTTTTGC") }

  it "returns the correct results for the examples in the video" do
    expect(subject.mismatch("C", 4)).to eq(3)
    expect(subject.mismatch("A", 6)).to eq(7)
  end

  it "moves past the pattern for a character that doesn't appear in the text" do
    expect(subject.mismatch("X", 0)).to eq(1)
    expect(subject.mismatch("X", 1)).to eq(2)
    expect(subject.mismatch("X", 2)).to eq(3)
  end

  it "does not break when there is an exact match" do
    expect(subject.mismatch("X", -1)).to eq(0)
  end
end
