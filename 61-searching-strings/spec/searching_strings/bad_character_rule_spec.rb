require "spec_helper"

RSpec.describe BadCharacterRule do
  subject { described_class.new("CCTTTTGC") }

  it "returns the correct results for the examples in the video" do
    expect(subject.mismatch("C", 4)).to eq(3)
    expect(subject.mismatch("A", 6)).to eq(7)
  end
end
