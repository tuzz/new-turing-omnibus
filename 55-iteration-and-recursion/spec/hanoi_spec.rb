require "rspec"
require "hanoi"

describe "hanoi" do
  it "can solve the base case" do
    result, output = hanoi([0], 1)

    expect(result).to eq([1])
    expect(output).to eq(["Moving disk on peg 0 to peg 1"])
  end

  it "can solve the two disk problem" do
    result, output = hanoi([0, 0], 1)

    expect(result).to eq([1, 1])
    expect(output).to eq([
      "Moving disk on peg 0 to peg 2",
      "Moving disk on peg 0 to peg 1",
      "Moving disk on peg 2 to peg 1",
    ])
  end

  it "can solve the three disk problem" do
    result, output = hanoi([0, 0, 0], 1)

    expect(result).to eq([1, 1, 1])
    expect(output).to eq([
      "Moving disk on peg 0 to peg 1",
      "Moving disk on peg 0 to peg 2",
      "Moving disk on peg 1 to peg 2",
      "Moving disk on peg 0 to peg 1",
      "Moving disk on peg 2 to peg 0",
      "Moving disk on peg 2 to peg 1",
      "Moving disk on peg 0 to peg 1",
    ])
  end
end
