require "spec_helper"

RSpec.describe GoodSuffixRule do
  subject { described_class.new("CTTACTTAC") }

  it "" do
    expect(subject.mismatch("C", 4)).to eq(3)
  end
end
