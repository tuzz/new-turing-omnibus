require "spec_helper"

RSpec.describe LinearCongruentialMethod do
  describe ".generate" do
    it "generates a repeating series of seemingly random number" do
      enumerator = subject.generate(k: 19, c: 51, m: 100, x0: 25)
      expect(enumerator.take(15)).to eq [
        25, 26, 45, 6, 65, 86, 85, 66, 5, 46, 25, 26, 45, 6, 65
      ]

      enumerator = subject.generate(k: 19, c: 51, m: 95, x0: 25)
      expect(enumerator.take(5)).to eq [25, 51, 70, 51, 70]
    end
  end

  describe ".period" do
    it "calculates the period for the given parameters" do
      period = subject.period(k: 19, c: 51, m: 100, x0: 25)
      expect(period).to eq(10)

      period = subject.period(k: 19, c: 51, m: 95, x0: 25)
      expect(period).to eq(2)
    end
  end
end
