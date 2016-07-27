class Text
  attr_reader :number_of_fetches

  def initialize(string)
    self.string = string
    self.number_of_fetches = 0
  end

  def fetch(index)
    self.number_of_fetches += 1
    string[index]
  end

  def length
    string.length
  end

  private

  attr_accessor :string
  attr_writer :number_of_fetches
end
