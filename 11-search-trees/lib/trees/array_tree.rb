class ArrayTree
  def initialize(size = 1000)
    self.item_array = Array.new(size)
    self.left_array = Array.new(size)
    self.right_array = Array.new(size)
    self.free_index = 0
  end

  def create_node
    Node.new(free_index).tap { self.free_index += 1 }
  end

  def top
    Node.new(top_index) if top_index
  end

  def top=(node)
    self.top_index = node.index
  end

  def item(node)
    item_array[node.index]
  end

  def set_item(node, item)
    item_array[node.index] = item
  end

  def left(node)
    left_index = left_array[node.index]
    Node.new(left_index) if left_index
  end

  def set_left(node, left)
    left_array[node.index] = left.index
  end

  def right(node)
    right_index = right_array[node.index]
    Node.new(right_index) if right_index
  end

  def set_right(node, right)
    right_array[node.index] = right.index
  end

  class Node
    attr_reader :index

    def initialize(index)
      self.index = index
    end

    def ==(other)
      other.is_a?(self.class) && index == other.index
    end

    private
    attr_writer :index
  end

  private
  attr_accessor :item_array, :left_array, :right_array, :free_index, :top_index
end
