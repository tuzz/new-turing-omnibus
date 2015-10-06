module Question1
  def self.find_k_and_c
    x0 = 25
    m = 100

    1.upto(20) do |k|
      1.upto(20) do |c|
        period = LinearCongruentialMethod.period(k: k, c: c, m: m, x0: x0)

        if period == 50
          puts "k=#{k}, c=#{c}, m=#{m}, x0=#{x0} has a period of #{period}"
        end
      end
    end
  end
end
