class MemoryTree
  def initialize(size = 1000)
    self.memory = Array.new(size) { Array.new(3) }
    self.free_address = 0
  end

  def create_node
    Node.new(free_address).tap { self.free_address += 1 }
  end

  def top
    Node.new(top_address) if top_address
  end

  def top=(node)
    self.top_address = node.address
  end

  def item(node)
    memory[node.address][0]
  end

  def set_item(node, item)
    memory[node.address][0] = item
  end

  def left(node)
    left_address = memory[node.address][1]
    Node.new(left_address) if left_address
  end

  def set_left(node, left)
    memory[node.address][1] = left.address
  end

  def right(node)
    right_address = memory[node.address][2]
    Node.new(right_address) if right_address
  end

  def set_right(node, right)
    memory[node.address][2] = right.address
  end

  class Node
    attr_reader :address

    def initialize(address)
      self.address = address
    end

    def ==(other)
      other.is_a?(self.class) && address == other.address
    end

    private
    attr_writer :address
  end

  private
  attr_accessor :memory, :free_address, :top_address
end
