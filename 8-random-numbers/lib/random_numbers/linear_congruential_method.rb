module LinearCongruentialMethod
  def self.generate(k:, c:, m:, x0:)
    Enumerator.new do |y|
      x = x0

      loop do
        y.yield x
        x = (k * x + c) % m
      end
    end
  end

  def self.period(k:, c:, m:, x0:)
    enumerator = generate(k: k, c: c, m: m, x0: x0)
    array = []

    enumerator.each do |n|
      if array.include?(n)
        return array.length - array.index(n)
      else
        array.push(n)
      end
    end
  end
end
