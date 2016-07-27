require "spec_helper"

RSpec.describe Text do
  subject { described_class.new("foo") }

  it "wraps a string" do
    expect(subject.fetch(0)).to eq("f")
    expect(subject.fetch(1)).to eq("o")
    expect(subject.fetch(2)).to eq("o")
  end

  it "tracks the number of fetches" do
    expect(subject.number_of_fetches).to eq(0)

    expect(subject.fetch(0)).to eq("f")
    expect(subject.number_of_fetches).to eq(1)

    expect(subject.fetch(1)).to eq("o")
    expect(subject.number_of_fetches).to eq(2)
  end
end
